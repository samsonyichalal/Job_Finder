import json
from fastapi import APIRouter, Depends, HTTPException, status
from app.database import get_db_connection
from app.middleware.auth_middleware import get_current_user_id
from app.routes.profile import serialize_row
from app.models.course import SavedCourseRequest

router = APIRouter()

@router.get("/recommend")
def get_course_recommendations(user_id: int = Depends(get_current_user_id)):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # 1. Fetch user profile
    cursor.execute("SELECT * FROM profiles WHERE user_id = ?", (user_id,))
    profile_row = cursor.fetchone()
    if not profile_row:
        conn.close()
        return []
        
    profile = serialize_row(profile_row)
    user_skills = profile.get("skills", [])
    user_skills_lower = [s.lower() for s in user_skills]
    
    # 2. Extract skill gaps from all jobs
    # Get required skills of top matched jobs
    cursor.execute("SELECT required_skills_json FROM jobs")
    job_rows = cursor.fetchall()
    
    required_gaps = []
    for r in job_rows:
        try:
            reqs = json.loads(r["required_skills_json"])
            for rskill in reqs:
                if rskill.lower() not in user_skills_lower and rskill not in required_gaps:
                    required_gaps.append(rskill)
        except Exception:
            pass
            
    # Cap gaps to top 5
    required_gaps = required_gaps[:5]
    if not required_gaps:
        # Fallback default gaps if user has everything
        required_gaps = ["AWS", "Docker", "Figma", "Kubernetes"]
        
    # 3. Retrieve courses from the database for each gap
    # Fetch all courses
    cursor.execute("SELECT * FROM courses")
    all_courses_rows = cursor.fetchall()
    
    all_courses = []
    for row in all_courses_rows:
        c_dict = dict(row)
        try:
            c_dict["skill_tags"] = json.loads(c_dict.pop("skill_tags_json", "[]"))
        except Exception:
            c_dict["skill_tags"] = []
        all_courses.append(c_dict)
        
    recommendations = []
    for gap in required_gaps:
        matched_courses = []
        gap_lower = gap.lower()
        
        # Search in database
        for c in all_courses:
            if any(gap_lower in tag.lower() or tag.lower() in gap_lower for tag in c["skill_tags"]):
                matched_courses.append({
                    "id": c["id"],
                    "title": c["title"],
                    "platform": c["platform"],
                    "url": c["url"],
                    "duration_hours": c["duration_hours"],
                    "cost_type": c["cost_type"],
                    "cost_amount": c["cost_amount"],
                    "rating": c["rating"],
                    "level": c["level"]
                })
                
        # If database didn't have specific match, create high-quality dynamic fallbacks
        if not matched_courses:
            matched_courses = [
                {
                    "id": 9991,
                    "title": f"Mastering {gap} for Beginners",
                    "platform": "Coursera",
                    "url": "https://www.coursera.org",
                    "duration_hours": 15.0,
                    "cost_type": "free",
                    "cost_amount": 0.0,
                    "rating": 4.8,
                    "level": "beginner"
                },
                {
                    "id": 9992,
                    "title": f"Ultimate {gap} Bootcamp: Core Concepts",
                    "platform": "Udemy",
                    "url": "https://www.udemy.com",
                    "duration_hours": 28.0,
                    "cost_type": "paid",
                    "cost_amount": 14.99,
                    "rating": 4.6,
                    "level": "intermediate"
                }
            ]
            
        recommendations.append({
            "skill_gap": gap,
            "courses": matched_courses[:3] # Cap to top 3
        })
        
    conn.close()
    return recommendations

@router.get("/saved")
def get_saved_courses(user_id: int = Depends(get_current_user_id)):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Query with JOIN to fetch course info alongside saved info
    cursor.execute(
        """
        SELECT sc.id as saved_course_id, sc.status, sc.saved_at, 
               c.id as course_id, c.title, c.platform, c.url, c.skill_tags_json, 
               c.duration_hours, c.cost_type, c.cost_amount, c.level, c.rating
        FROM saved_courses sc
        JOIN courses c ON sc.course_id = c.id
        WHERE sc.user_id = ?
        """,
        (user_id,)
    )
    rows = cursor.fetchall()
    conn.close()
    
    saved_list = []
    for r in rows:
        c_dict = dict(r)
        try:
            c_dict["skill_tags"] = json.loads(c_dict.pop("skill_tags_json", "[]"))
        except Exception:
            c_dict["skill_tags"] = []
        saved_list.append(c_dict)
        
    return saved_list

@router.post("/save")
def save_course(request: SavedCourseRequest, user_id: int = Depends(get_current_user_id)):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        # Check if course exists in courses table
        cursor.execute("SELECT id FROM courses WHERE id = ?", (request.course_id,))
        if not cursor.fetchone():
            conn.close()
            raise HTTPException(status_code=404, detail="Course not found.")
            
        # Check if already saved
        cursor.execute("SELECT id FROM saved_courses WHERE user_id = ? AND course_id = ?", (user_id, request.course_id))
        exists = cursor.fetchone()
        if exists:
            # Update status
            cursor.execute(
                "UPDATE saved_courses SET status = ? WHERE id = ?",
                (request.status, exists["id"])
            )
            conn.commit()
            return {"success": True, "message": "Saved course status updated."}
            
        # Insert new
        cursor.execute(
            "INSERT INTO saved_courses (user_id, course_id, status) VALUES (?, ?, ?)",
            (user_id, request.course_id, request.status)
        )
        conn.commit()
        return {"success": True, "saved_course_id": cursor.lastrowid}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

@router.put("/saved/{saved_course_id}")
def update_saved_course_status(saved_course_id: int, status_update: dict, user_id: int = Depends(get_current_user_id)):
    new_status = status_update.get("status", "saved")
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT id FROM saved_courses WHERE id = ? AND user_id = ?", (saved_course_id, user_id))
    if not cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=404, detail="Saved course record not found.")
        
    try:
        cursor.execute(
            "UPDATE saved_courses SET status = ? WHERE id = ?",
            (new_status, saved_course_id)
        )
        conn.commit()
        return {"success": True}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()
        
@router.delete("/saved/{saved_course_id}")
def delete_saved_course(saved_course_id: int, user_id: int = Depends(get_current_user_id)):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT id FROM saved_courses WHERE id = ? AND user_id = ?", (saved_course_id, user_id))
    if not cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=404, detail="Saved course record not found.")
        
    try:
        cursor.execute("DELETE FROM saved_courses WHERE id = ?", (saved_course_id,))
        conn.commit()
        return {"success": True}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

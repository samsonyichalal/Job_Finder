import json
from fastapi import APIRouter, Depends, HTTPException, status
from app.database import get_db_connection
from app.services.matching_engine import calculate_match_score
from app.services.ai_service import generate_job_explanation
from app.middleware.auth_middleware import get_current_user_id
from app.routes.profile import serialize_row

router = APIRouter()

@router.get("/match")
def get_job_matches(user_id: int = Depends(get_current_user_id)):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # 1. Fetch user profile
    cursor.execute("SELECT * FROM profiles WHERE user_id = ?", (user_id,))
    profile_row = cursor.fetchone()
    if not profile_row:
        conn.close()
        # Empty state returns empty list or default matches
        return []
        
    profile = serialize_row(profile_row)
    
    # 2. Fetch all jobs
    cursor.execute("SELECT * FROM jobs")
    job_rows = cursor.fetchall()
    conn.close()
    
    matched_jobs = []
    for row in job_rows:
        job_dict = dict(row)
        
        # Parse job lists
        try:
            job_dict["required_skills"] = json.loads(job_dict.pop("required_skills_json", "[]"))
        except Exception:
            job_dict["required_skills"] = []
            
        try:
            job_dict["nice_skills"] = json.loads(job_dict.pop("nice_skills_json", "[]"))
        except Exception:
            job_dict["nice_skills"] = []
            
        # Calculate scoring using matching engine
        match_info = calculate_match_score(job_dict, profile)
        
        # Prepare pure job schema representation
        job_schema = {
            "id": job_dict["id"],
            "title": job_dict["title"],
            "industry": job_dict["industry"],
            "description": job_dict["description"],
            "required_skills_json": job_dict["required_skills"],
            "nice_skills_json": job_dict["nice_skills"],
            "salary_min": job_dict["salary_min"],
            "salary_max": job_dict["salary_max"],
            "currency": job_dict["currency"],
            "location": job_dict["location"],
            "work_type": job_dict["work_type"],
            "seniority_level": job_dict["seniority_level"]
        }
        
        # Generate personalized explanation (uses AI/fallback under the hood)
        explanation = generate_job_explanation(job_dict, profile)
        
        matched_jobs.append({
            "job": job_schema,
            "match_score": match_info["match_score"],
            "match_label": match_info["match_label"],
            "matched_skills": match_info["matched_skills"],
            "missing_skills": match_info["missing_skills"],
            "explanation": explanation
        })
        
    # Sort by match score descending
    matched_jobs.sort(key=lambda x: x["match_score"], reverse=True)
    
    # Return top 10 matches
    return matched_jobs[:10]

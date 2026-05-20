import json
from fastapi import APIRouter, Depends, HTTPException, status
from app.database import get_db_connection
from app.middleware.auth_middleware import get_current_user_id
from app.routes.profile import serialize_row

router = APIRouter()

@router.get("/gap")
def get_skills_gap(job_id: int = None, user_id: int = Depends(get_current_user_id)):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # 1. Fetch user profile
    cursor.execute("SELECT * FROM profiles WHERE user_id = ?", (user_id,))
    profile_row = cursor.fetchone()
    if not profile_row:
        conn.close()
        return {"has": [], "missing": [], "partial": []}
        
    profile = serialize_row(profile_row)
    user_skills = profile.get("skills", [])
    user_skills_lower = [s.lower() for s in user_skills]
    
    target_skills = []
    nice_skills = []
    
    if job_id:
        # 2a. Fetch specific job
        cursor.execute("SELECT required_skills_json, nice_skills_json FROM jobs WHERE id = ?", (job_id,))
        job_row = cursor.fetchone()
        if job_row:
            try:
                target_skills = json.loads(job_row["required_skills_json"])
            except Exception:
                target_skills = []
            try:
                nice_skills = json.loads(job_row["nice_skills_json"])
            except Exception:
                nice_skills = []
    else:
        # 2b. Compile aggregated gap from top 3 seeded jobs (to give user generic recommendations)
        cursor.execute("SELECT required_skills_json FROM jobs LIMIT 3")
        rows = cursor.fetchall()
        for r in rows:
            try:
                skills = json.loads(r["required_skills_json"])
                for s in skills:
                    if s not in target_skills:
                        target_skills.append(s)
            except Exception:
                pass
                
    conn.close()
    
    has_skills = []
    missing_skills = []
    partial_skills = []
    
    # Process core required skills
    for skill in target_skills:
        if skill.lower() in user_skills_lower:
            has_skills.append(skill)
        else:
            # Check for partial case-insensitive contains matches (e.g. "React.js" vs "React")
            partial_match = False
            for us in user_skills:
                if us.lower() in skill.lower() or skill.lower() in us.lower():
                    partial_match = True
                    partial_skills.append({"skill": skill, "overlap_with": us})
                    break
            
            if not partial_match:
                # Estimate learn time based on skill complexity
                learn_time = "25 hours"
                skill_lower = skill.lower()
                if any(w in skill_lower for w in ["python", "javascript", "sql", "java"]):
                    learn_time = "40 hours"
                elif any(w in skill_lower for w in ["docker", "kubernetes", "aws", "security"]):
                    learn_time = "30 hours"
                elif any(w in skill_lower for w in ["figma", "photoshop", "illustrator", "excel"]):
                    learn_time = "15 hours"
                elif any(w in skill_lower for w in ["scrum", "agile", "communication"]):
                    learn_time = "10 hours"
                    
                missing_skills.append({
                    "skill": skill,
                    "priority": "High",
                    "learn_time": learn_time
                })
                
    # Process nice-to-have skills
    for skill in nice_skills:
        if skill.lower() not in user_skills_lower and skill not in [m["skill"] for m in missing_skills]:
            missing_skills.append({
                "skill": skill,
                "priority": "Medium",
                "learn_time": "15 hours"
            })
            
    return {
        "has": has_skills,
        "missing": missing_skills,
        "partial": partial_skills
    }

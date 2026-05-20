from typing import List, Dict, Any

def calculate_match_score(job: Dict[str, Any], profile: Dict[str, Any]) -> Dict[str, Any]:
    # Extract required skills
    required_skills = job.get("required_skills", [])
    if not required_skills:
        required_skills = []
        
    user_skills = profile.get("skills", [])
    if not user_skills:
        user_skills = []
        
    # Match skills case-insensitively
    user_skills_lower = [s.lower() for s in user_skills]
    matched_skills = [s for s in required_skills if s.lower() in user_skills_lower]
    missing_skills = [s for s in required_skills if s.lower() not in user_skills_lower]
    
    # Calculate base score (up to 70 points)
    if len(required_skills) > 0:
        base_score = (len(matched_skills) / len(required_skills)) * 70
    else:
        base_score = 70.0
        
    # Calculate level bonus (15 points)
    # Estimate user level based on work experiences or years in profile if present
    # We can infer years of experience by looking at experience list
    experience_list = profile.get("experience", [])
    total_years = 0
    for exp in experience_list:
        try:
            start = int(exp.get("start_year", 0))
            end = int(exp.get("end_year", 0))
            if start > 0 and end >= start:
                total_years += (end - start)
        except Exception:
            pass
            
    # Seniority estimation
    if total_years < 2:
        user_level = "entry"
    elif total_years < 5:
        user_level = "mid"
    elif total_years < 8:
        user_level = "senior"
    else:
        user_level = "lead"
        
    job_level = job.get("seniority_level", "mid").lower()
    level_bonus = 15.0 if user_level == job_level else 0.0
    
    # Calculate education bonus (15 points)
    # Check if user's education field of study is relevant to job
    education_list = profile.get("education", [])
    job_title_lower = job.get("title", "").lower()
    job_industry_lower = job.get("industry", "").lower()
    
    edu_relevant = False
    for edu in education_list:
        field = edu.get("field_of_study", "").lower()
        if not field:
            continue
            
        # Tech Relevance
        if any(kw in job_title_lower or kw in job_industry_lower for kw in ["software", "developer", "data", "tech", "web", "computer", "qa", "cybersecurity"]):
            if any(kw in field for kw in ["computer science", "software", "information technology", "it", "cs", "data science", "engineering", "math", "statistics"]):
                edu_relevant = True
                break
        # Finance Relevance
        elif any(kw in job_title_lower or kw in job_industry_lower for kw in ["finance", "accountant", "banker", "investment", "business"]):
            if any(kw in field for kw in ["finance", "accounting", "business", "economics", "management", "mba"]):
                edu_relevant = True
                break
        # Healthcare Relevance
        elif any(kw in job_title_lower or kw in job_industry_lower for kw in ["nurse", "pediatrician", "healthcare", "clinical"]):
            if any(kw in field for kw in ["nursing", "medicine", "biology", "healthcare", "chemistry", "pre-med"]):
                edu_relevant = True
                break
        # Creative Relevance
        elif any(kw in job_title_lower or kw in job_industry_lower for kw in ["graphic", "design", "video", "content", "writer", "copywriter"]):
            if any(kw in field for kw in ["design", "art", "fine arts", "creative writing", "journalism", "english", "media"]):
                edu_relevant = True
                break
        # Engineering Relevance
        elif any(kw in job_title_lower or kw in job_industry_lower for kw in ["engineer", "civil", "mechanical", "electrical"]):
            if any(kw in field for kw in ["engineering", "physics", "mechanical", "civil", "electrical", "matlab"]):
                edu_relevant = True
                break
                
    edu_bonus = 15.0 if edu_relevant else 0.0
    
    # Calculate total match score
    total_score = min(100, int(round(base_score + level_bonus + edu_bonus)))
    
    # Matching label
    if total_score >= 75:
        match_label = "High"
    elif total_score >= 50:
        match_label = "Medium"
    else:
        match_label = "Low"
        
    return {
        "match_score": total_score,
        "match_label": match_label,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills
    }

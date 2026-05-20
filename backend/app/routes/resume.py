import json
from fastapi import APIRouter, Depends, HTTPException, status
from app.models.resume import ResumeAnalyzeRequest, ResumeAnalyzeResponse
from app.database import get_db_connection
from app.services.ai_service import analyze_resume
from app.services.resume_parser import parse_resume_text
from app.middleware.auth_middleware import get_current_user_id
from app.routes.profile import serialize_row

router = APIRouter()

@router.post("/analyze", response_model=ResumeAnalyzeResponse)
def post_resume_analyze(request: ResumeAnalyzeRequest, user_id: int = Depends(get_current_user_id)):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # 1. Fetch profile to compare against
    cursor.execute("SELECT * FROM profiles WHERE user_id = ?", (user_id,))
    profile_row = cursor.fetchone()
    if not profile_row:
        conn.close()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please complete your onboarding profile before analyzing your resume."
        )
        
    profile = serialize_row(profile_row)
    
    # 2. Normalize resume text
    sanitized_text = parse_resume_text(request.resume_text)
    if not sanitized_text:
        conn.close()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Resume text cannot be blank."
        )
        
    # 3. Analyze resume with AI Service
    analysis = analyze_resume(sanitized_text, profile)
    
    # 4. Save analysis to SQLite
    try:
        cursor.execute(
            """
            INSERT INTO resumes 
            (user_id, raw_text, score, feedback_json, improved_bullets_json, ats_keywords_json)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (
                user_id,
                sanitized_text,
                analysis["score"],
                json.dumps({
                    "strengths": analysis["strengths"],
                    "weaknesses": analysis["weaknesses"],
                    "missing_sections": analysis["missing_sections"]
                }),
                json.dumps(analysis["improved_bullets"]),
                json.dumps(analysis["ats_keywords"])
            )
        )
        conn.commit()
    except Exception as e:
        conn.rollback()
        # Log error but don't crash, we want to return the analysis successfully
        print(f"Failed to save resume analysis to DB: {e}")
    finally:
        conn.close()
        
    return analysis

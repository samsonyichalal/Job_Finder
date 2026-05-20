from fastapi import APIRouter, Depends, HTTPException, status
from app.services.ai_service import estimate_salary
from app.middleware.auth_middleware import get_current_user_id

router = APIRouter()

@router.get("/estimate")
def get_salary_estimate(role: str = "", location: str = "", level: str = "mid", user_id: int = Depends(get_current_user_id)):
    if not role:
        raise HTTPException(
            status_code=400,
            detail="Role parameter is required."
        )
        
    result = estimate_salary(role, location, level)
    return result

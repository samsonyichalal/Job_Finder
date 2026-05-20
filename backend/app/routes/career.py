from fastapi import APIRouter, Depends, HTTPException, status
from app.database import get_db_connection
from app.services.ai_service import generate_career_paths
from app.middleware.auth_middleware import get_current_user_id
from app.routes.profile import serialize_row

router = APIRouter()

@router.get("/paths")
def get_career_paths(user_id: int = Depends(get_current_user_id)):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Fetch user profile
    cursor.execute("SELECT * FROM profiles WHERE user_id = ?", (user_id,))
    row = cursor.fetchone()
    conn.close()
    
    if not row:
        return []
        
    profile = serialize_row(row)
    
    # Generate recommendations from AI Service
    paths = generate_career_paths(profile)
    return paths

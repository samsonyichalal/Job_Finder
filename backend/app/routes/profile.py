import json
from fastapi import APIRouter, Depends, HTTPException, status
from app.models.profile import ProfileSchema
from app.database import get_db_connection
from app.middleware.auth_middleware import get_current_user_id

router = APIRouter()

def serialize_row(row):
    if row is None:
        return None
    d = dict(row)
    
    # Parse JSON strings to lists/dicts
    try:
        d["skills"] = json.loads(d.pop("skills_json", "[]"))
    except Exception:
        d["skills"] = []
        
    try:
        d["education"] = json.loads(d.pop("education_json", "[]"))
    except Exception:
        d["education"] = []
        
    try:
        d["experience"] = json.loads(d.pop("experience_json", "[]"))
    except Exception:
        d["experience"] = []
        
    try:
        d["interests"] = json.loads(d.pop("interests_json", "[]"))
    except Exception:
        d["interests"] = []
        
    return d

@router.get("")
def get_profile(user_id: int = Depends(get_current_user_id)):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM profiles WHERE user_id = ?", (user_id,))
    row = cursor.fetchone()
    conn.close()
    
    if not row:
        return None
        
    return serialize_row(row)

@router.post("")
def create_or_replace_profile(profile_data: ProfileSchema, user_id: int = Depends(get_current_user_id)):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Check if profile already exists
    cursor.execute("SELECT id FROM profiles WHERE user_id = ?", (user_id,))
    exists = cursor.fetchone()
    
    try:
        if exists:
            # Overwrite existing
            cursor.execute(
                """
                UPDATE profiles 
                SET full_name = ?, location = ?, work_preference = ?, skills_json = ?, 
                    education_json = ?, experience_json = ?, interests_json = ?, 
                    short_term_goal = ?, long_term_goal = ?, current_salary = ?, 
                    desired_salary = ?, currency = ?
                WHERE user_id = ?
                """,
                (
                    profile_data.full_name,
                    profile_data.location,
                    profile_data.work_preference,
                    json.dumps([s.strip() for s in profile_data.skills_json if s.strip()]),
                    json.dumps([dict(edu) for edu in profile_data.education_json]),
                    json.dumps([dict(exp) for exp in profile_data.experience_json]),
                    json.dumps([i.strip() for i in profile_data.interests_json if i.strip()]),
                    profile_data.short_term_goal,
                    profile_data.long_term_goal,
                    profile_data.current_salary,
                    profile_data.desired_salary,
                    profile_data.currency,
                    user_id
                )
            )
            profile_id = exists["id"]
        else:
            # Insert new
            cursor.execute(
                """
                INSERT INTO profiles 
                (user_id, full_name, location, work_preference, skills_json, education_json, 
                 experience_json, interests_json, short_term_goal, long_term_goal, 
                 current_salary, desired_salary, currency)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    user_id,
                    profile_data.full_name,
                    profile_data.location,
                    profile_data.work_preference,
                    json.dumps([s.strip() for s in profile_data.skills_json if s.strip()]),
                    json.dumps([dict(edu) for edu in profile_data.education_json]),
                    json.dumps([dict(exp) for exp in profile_data.experience_json]),
                    json.dumps([i.strip() for i in profile_data.interests_json if i.strip()]),
                    profile_data.short_term_goal,
                    profile_data.long_term_goal,
                    profile_data.current_salary,
                    profile_data.desired_salary,
                    profile_data.currency,
                    user_id
                )
            )
            profile_id = cursor.lastrowid
            
        conn.commit()
        return {"success": True, "profile_id": profile_id}
    except Exception as e:
        conn.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Profile operation failed: {str(e)}"
        )
    finally:
        conn.close()

@router.put("")
def update_profile(fields_to_update: dict, user_id: int = Depends(get_current_user_id)):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Check if profile exists
    cursor.execute("SELECT id FROM profiles WHERE user_id = ?", (user_id,))
    exists = cursor.fetchone()
    if not exists:
        conn.close()
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found."
        )
        
    # Build dynamic UPDATE statement
    update_parts = []
    params = []
    
    # Map from model list names to database json columns
    field_mappings = {
        "skills": "skills_json",
        "education": "education_json",
        "experience": "experience_json",
        "interests": "interests_json"
    }
    
    for key, value in fields_to_update.items():
        if key in field_mappings:
            db_column = field_mappings[key]
            update_parts.append(f"{db_column} = ?")
            params.append(json.dumps(value))
        elif key in ["full_name", "location", "work_preference", "short_term_goal", "long_term_goal", "current_salary", "desired_salary", "currency"]:
            update_parts.append(f"{key} = ?")
            params.append(value)
            
    if not update_parts:
        conn.close()
        return {"success": True, "message": "No valid fields updated"}
        
    params.append(user_id)
    sql = f"UPDATE profiles SET {', '.join(update_parts)} WHERE user_id = ?"
    
    try:
        cursor.execute(sql, tuple(params))
        conn.commit()
        return {"success": True}
    except Exception as e:
        conn.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Profile update failed: {str(e)}"
        )
    finally:
        conn.close()

import json
from fastapi import APIRouter, HTTPException, status
from app.models.user import UserRegister, UserLogin, TokenResponse
from app.database import get_db_connection
from app.utils.password_hasher import hash_password, verify_password
from app.utils.jwt_handler import create_token

router = APIRouter()

@router.post("/register", response_model=TokenResponse)
def register(user_data: UserRegister):
    conn = get_db_connection()
    cursor = conn.cursor()
    if user_data.role not in {"job_finder", "job_poster"}:
        conn.close()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid role. Allowed roles are job_finder and job_poster.",
        )
    role = user_data.role
    
    # Check if user already exists
    cursor.execute("SELECT id FROM users WHERE email = ?", (user_data.email,))
    if cursor.fetchone():
        conn.close()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email already exists."
        )
        
    hashed = hash_password(user_data.password)
    
    try:
        # Insert user
        cursor.execute(
            "INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)",
            (user_data.email, hashed, role)
        )
        user_id = cursor.lastrowid
        
        # Create an initial empty profile record for the user to simplify front-end queries
        cursor.execute(
            """
            INSERT INTO profiles (user_id, full_name, location, work_preference, skills_json, education_json, experience_json, interests_json, short_term_goal, long_term_goal, current_salary, desired_salary, currency)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                user_id,
                user_data.full_name,
                "Remote",
                "remote",
                json.dumps([]),
                json.dumps([]),
                json.dumps([]),
                json.dumps([]),
                "",
                "",
                0.0,
                0.0,
                "USD"
            )
        )
        
        conn.commit()
        token = create_token(user_id)
        return {"token": token, "user_id": user_id, "role": role}
    except Exception as e:
        conn.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Registration failed: {str(e)}"
        )
    finally:
        conn.close()

@router.post("/login", response_model=TokenResponse)
def login(credentials: UserLogin):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT id, password_hash, role FROM users WHERE email = ?", (credentials.email,))
    user = cursor.fetchone()
    conn.close()
    
    if not user or not verify_password(credentials.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password."
        )
        
    token = create_token(user["id"])
    return {"token": token, "user_id": user["id"], "role": user["role"] or "job_finder"}

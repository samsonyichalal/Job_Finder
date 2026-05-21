from pydantic import BaseModel

class UserRegister(BaseModel):
    email: str
    password: str
    full_name: str
    role: str = "job_finder"

class UserLogin(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    token: str
    user_id: int
    role: str = "job_finder"

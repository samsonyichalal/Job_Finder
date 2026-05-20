from pydantic import BaseModel
from typing import List, Optional

class EducationItem(BaseModel):
    school: str
    degree: str
    field_of_study: str
    start_year: str
    end_year: str

class ExperienceItem(BaseModel):
    company: str
    role: str
    start_year: str
    end_year: str
    description: str

class ProfileSchema(BaseModel):
    full_name: str
    location: Optional[str] = None
    work_preference: Optional[str] = "remote"
    skills_json: Optional[List[str]] = []
    education_json: Optional[List[EducationItem]] = []
    experience_json: Optional[List[ExperienceItem]] = []
    interests_json: Optional[List[str]] = []
    short_term_goal: Optional[str] = None
    long_term_goal: Optional[str] = None
    current_salary: Optional[float] = 0.0
    desired_salary: Optional[float] = 0.0
    currency: Optional[str] = "USD"

from pydantic import BaseModel
from typing import List, Optional

class JobSchema(BaseModel):
    id: Optional[int] = None
    title: str
    industry: str
    description: str
    required_skills_json: List[str]
    nice_skills_json: Optional[List[str]] = []
    salary_min: float
    salary_max: float
    currency: Optional[str] = "USD"
    location: str
    work_type: str
    seniority_level: str
    company_name: Optional[str] = None
    posted_by_user_id: Optional[int] = None


class JobCreateRequest(BaseModel):
    title: str
    industry: str
    description: str
    required_skills_json: List[str]
    nice_skills_json: Optional[List[str]] = []
    salary_min: float
    salary_max: float
    currency: Optional[str] = "USD"
    location: str
    work_type: str
    seniority_level: str
    company_name: Optional[str] = None


class JobUpdateRequest(BaseModel):
    title: Optional[str] = None
    industry: Optional[str] = None
    description: Optional[str] = None
    required_skills_json: Optional[List[str]] = None
    nice_skills_json: Optional[List[str]] = None
    salary_min: Optional[float] = None
    salary_max: Optional[float] = None
    currency: Optional[str] = None
    location: Optional[str] = None
    work_type: Optional[str] = None
    seniority_level: Optional[str] = None
    company_name: Optional[str] = None

class JobMatchResponse(BaseModel):
    job: JobSchema
    match_score: int
    match_label: str
    matched_skills: List[str]
    missing_skills: List[str]
    explanation: str

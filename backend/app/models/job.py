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

class JobMatchResponse(BaseModel):
    job: JobSchema
    match_score: int
    match_label: str
    matched_skills: List[str]
    missing_skills: List[str]
    explanation: str

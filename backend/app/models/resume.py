from pydantic import BaseModel
from typing import List, Optional

class ResumeAnalyzeRequest(BaseModel):
    resume_text: str

class BulletPointImprovement(BaseModel):
    original: str
    improved: str

class ResumeAnalyzeResponse(BaseModel):
    score: int
    strengths: List[str]
    weaknesses: List[str]
    ats_keywords: List[str]
    improved_bullets: List[BulletPointImprovement]
    missing_sections: List[str]

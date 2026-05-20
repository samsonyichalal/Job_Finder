from pydantic import BaseModel
from typing import List, Optional

class CourseSchema(BaseModel):
    id: Optional[int] = None
    title: str
    platform: str
    url: str
    skill_tags_json: List[str]
    duration_hours: float
    cost_type: str
    cost_amount: float
    level: str
    rating: float

class SavedCourseRequest(BaseModel):
    course_id: int
    status: Optional[str] = "saved"

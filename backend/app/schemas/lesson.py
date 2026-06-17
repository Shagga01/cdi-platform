from pydantic import BaseModel

class LessonCreate(BaseModel):
    title: str
    content: str
    course_id: int

class LessonResponse(BaseModel):
    id: int
    title: str
    content: str
    course_id: int

    class Config:
        from_attributes = True
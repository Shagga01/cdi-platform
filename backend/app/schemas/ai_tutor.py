from pydantic import BaseModel


class TutorRequest(BaseModel):
    question: str


class TutorResponse(BaseModel):
    answer: str
    difficulty: str
    recommended_next_step: str
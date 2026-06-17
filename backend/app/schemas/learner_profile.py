from pydantic import BaseModel


class LearnerProfileResponse(
    BaseModel
):

    id: int

    user_id: int

    level: str

    progress_score: int

    recommended_course: str

    class Config:

        from_attributes = True
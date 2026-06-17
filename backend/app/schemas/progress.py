from pydantic import BaseModel


class ProgressCreate(BaseModel):

    lesson_id: int


class ProgressResponse(BaseModel):

    id: int
    user_id: int
    lesson_id: int

    class Config:

        from_attributes = True
from sqlalchemy import Column, Integer, ForeignKey

from app.database.database import Base


class LessonProgress(Base):

    __tablename__ = "lesson_progress"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    lesson_id = Column(
        Integer,
        ForeignKey("lessons.id")
    )
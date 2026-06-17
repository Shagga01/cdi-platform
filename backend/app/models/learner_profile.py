from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey
)

from app.database.database import Base


class LearnerProfile(Base):

    __tablename__ = "learner_profiles"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        unique=True
    )

    level = Column(
        String,
        default="Beginner"
    )

    progress_score = Column(
        Integer,
        default=0
    )

    recommended_course = Column(
        String,
        default="AI Foundations"
    )
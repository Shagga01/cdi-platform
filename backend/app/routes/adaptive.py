from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import SessionLocal

from app.core.dependencies import (
    get_current_user
)

from app.models.user import User

from app.models.progress import (
    LessonProgress
)

from app.models.learner_profile import (
    LearnerProfile
)

from app.schemas.learner_profile import (
    LearnerProfileResponse
)

from app.services.recommendation_engine import (
    build_learning_profile
)

router = APIRouter(
    prefix="/adaptive",
    tags=["Adaptive Learning"]
)


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.get(
    "/profile",
    response_model=LearnerProfileResponse
)
def get_learning_profile(
    current_user: User = Depends(
        get_current_user
    ),
    db: Session = Depends(get_db)
):

    progress_records = db.query(
        LessonProgress
    ).filter(
        LessonProgress.user_id == current_user.id
    ).all()

    adaptive_data = build_learning_profile(
        progress_records
    )

    profile = db.query(
        LearnerProfile
    ).filter(
        LearnerProfile.user_id == current_user.id
    ).first()

    if not profile:

        profile = LearnerProfile(
            user_id=current_user.id,
            level=adaptive_data["level"],
            progress_score=adaptive_data[
                "progress_score"
            ],
            recommended_course=adaptive_data[
                "recommended_course"
            ]
        )

        db.add(profile)

    else:

        profile.level = adaptive_data["level"]

        profile.progress_score = adaptive_data[
            "progress_score"
        ]

        profile.recommended_course = adaptive_data[
            "recommended_course"
        ]

    db.commit()

    db.refresh(profile)

    return profile
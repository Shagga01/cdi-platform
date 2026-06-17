from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.database.database import SessionLocal

from app.models.progress import LessonProgress

from app.models.lesson import Lesson

from app.schemas.progress import (
    ProgressCreate,
    ProgressResponse
)

from app.core.dependencies import get_current_user


router = APIRouter(
    prefix="/progress",
    tags=["Progress"]
)


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.post(
    "/",
    response_model=ProgressResponse
)
def complete_lesson(
    progress: ProgressCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    existing = db.query(
        LessonProgress
    ).filter(
        LessonProgress.user_id == current_user.id,
        LessonProgress.lesson_id == progress.lesson_id
    ).first()

    if existing:

        return existing

    new_progress = LessonProgress(
        user_id=current_user.id,
        lesson_id=progress.lesson_id
    )

    db.add(new_progress)

    db.commit()

    db.refresh(new_progress)

    return new_progress


@router.get("/{course_id}")
def get_course_progress(
    course_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    total_lessons = db.query(Lesson).filter(
        Lesson.course_id == course_id
    ).count()

    completed_lessons = db.query(
        LessonProgress
    ).join(
        Lesson,
        Lesson.id == LessonProgress.lesson_id
    ).filter(
        Lesson.course_id == course_id,
        LessonProgress.user_id == current_user.id
    ).count()

    if total_lessons == 0:

        return {
            "progress": 0
        }

    percentage = int(
        (completed_lessons / total_lessons) * 100
    )

    return {
        "progress": percentage
    }
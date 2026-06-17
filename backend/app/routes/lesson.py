from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import SessionLocal

from app.models.lesson import Lesson

from app.schemas.lesson import (
    LessonCreate,
    LessonResponse
)

router = APIRouter(
    prefix="/lessons",
    tags=["Lessons"]
)

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()

@router.post(
    "/",
    response_model=LessonResponse
)
def create_lesson(
    lesson: LessonCreate,
    db: Session = Depends(get_db)
):
    new_lesson = Lesson(
        title=lesson.title,
        content=lesson.content,
        course_id=lesson.course_id
    )

    db.add(new_lesson)

    db.commit()

    db.refresh(new_lesson)

    return new_lesson

@router.get(
    "/",
    response_model=list[LessonResponse]
)
def get_lessons(
    db: Session = Depends(get_db)
):
    return db.query(Lesson).all()

@router.get(
    "/course/{course_id}",
    response_model=list[LessonResponse]
)
def get_lessons_by_course(
    course_id: int,
    db: Session = Depends(get_db)
):
    lessons = db.query(Lesson).filter(
        Lesson.course_id == course_id
    ).all()

    return lessons
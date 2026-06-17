from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import SessionLocal

from app.models.enrollment import Enrollment

from app.schemas.enrollment import (
    EnrollmentCreate,
    EnrollmentResponse
)

router = APIRouter(
    prefix="/enrollments",
    tags=["Enrollments"]
)

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()

@router.post(
    "/",
    response_model=EnrollmentResponse
)
def create_enrollment(
    enrollment: EnrollmentCreate,
    db: Session = Depends(get_db)
):
    new_enrollment = Enrollment(
        user_id=enrollment.user_id,
        course_id=enrollment.course_id
    )

    db.add(new_enrollment)

    db.commit()

    db.refresh(new_enrollment)

    return new_enrollment

@router.get(
    "/",
    response_model=list[EnrollmentResponse]
)
def get_enrollments(
    db: Session = Depends(get_db)
):
    return db.query(Enrollment).all()
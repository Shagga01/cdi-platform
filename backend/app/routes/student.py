from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.schemas.student import StudentCreate, StudentResponse
from app.crud.student import create_student, get_students

router = APIRouter()


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.post("/students", response_model=StudentResponse)
def create_new_student(
    student: StudentCreate,
    db: Session = Depends(get_db)
):
    return create_student(db, student)


@router.get("/students", response_model=list[StudentResponse])
def read_students(db: Session = Depends(get_db)):
    return get_students(db)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import Base, engine

from app.routes.student import router as student_router
from app.routes.auth import router as auth_router
from app.routes.course import router as course_router
from app.routes.lesson import router as lesson_router
from app.routes.enrollment import router as enrollment_router
from app.routes.progress import router as progress_router
from app.routes.ai_tutor import (
    router as ai_tutor_router
)
from app.routes.adaptive import (
    router as adaptive_router
)

from app.models.course import Course
from app.models.enrollment import Enrollment
from app.models.lesson import Lesson
from app.models.progress import LessonProgress
from app.models.learner_profile import LearnerProfile

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "CDI Backend Running Successfully"
    }

@app.get("/test")
def test():
    return {
        "message": "TEST ROUTE WORKING"
    }
    
app.include_router(student_router)
app.include_router(auth_router)
app.include_router(course_router)
app.include_router(lesson_router)
app.include_router(enrollment_router)
app.include_router(progress_router)
app.include_router(adaptive_router)
app.include_router(ai_tutor_router)
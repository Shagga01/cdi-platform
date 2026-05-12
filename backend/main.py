from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import Base, engine

from app.routes.student import router as student_router
from app.routes.auth import router as auth_router

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
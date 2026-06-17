from fastapi import APIRouter, Depends

from app.schemas.ai_tutor import (
    TutorRequest,
    TutorResponse
)

from app.core.dependencies import (
    get_current_user
)

from app.models.user import User

router = APIRouter(
    prefix="/ai",
    tags=["AI Tutor"]
)


@router.post(
    "/tutor",
    response_model=TutorResponse
)
def ai_tutor(
    request: TutorRequest,
    current_user: User = Depends(
        get_current_user
    )
):

    question = request.question.lower()

    if "artificial intelligence" in question:

        return {
            "answer":
            "Artificial Intelligence is the simulation of human intelligence using machines and algorithms.",

            "difficulty":
            "Beginner",

            "recommended_next_step":
            "Learn about Machine Learning"
        }

    elif "machine learning" in question:

        return {
            "answer":
            "Machine Learning is a branch of AI where systems learn patterns from data.",

            "difficulty":
            "Intermediate",

            "recommended_next_step":
            "Learn about Neural Networks"
        }

    else:

        return {
            "answer":
            "I do not yet understand that topic.",

            "difficulty":
            "Unknown",

            "recommended_next_step":
            "Try another AI topic"
        }
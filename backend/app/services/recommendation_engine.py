from app.models.progress import LessonProgress


def calculate_progress_score(progress_records):

    if not progress_records:
        return 0

    completed = len(progress_records)

    return completed * 10


def determine_level(progress_score):

    if progress_score < 30:
        return "Beginner"

    elif progress_score < 70:
        return "Intermediate"

    return "Advanced"


def recommend_course(level):

    if level == "Beginner":
        return "AI Foundations"

    elif level == "Intermediate":
        return "Systems Thinking"

    return "AI Architecture"


def build_learning_profile(progress_records):

    progress_score = calculate_progress_score(
        progress_records
    )

    level = determine_level(
        progress_score
    )

    recommended_course = recommend_course(
        level
    )

    return {
        "progress_score": progress_score,
        "level": level,
        "recommended_course": recommended_course
    }
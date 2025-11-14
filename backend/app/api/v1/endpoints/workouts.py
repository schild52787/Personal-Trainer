from fastapi import APIRouter, Depends
from app.core.security import get_current_user

router = APIRouter()


@router.get("/")
async def get_workouts(user_id: str = Depends(get_current_user)):
    """
    Get all workouts for the current user
    """
    return {
        "message": "Get workouts endpoint",
        "user_id": user_id,
        "workouts": []
    }


@router.post("/")
async def create_workout(user_id: str = Depends(get_current_user)):
    """
    Create a new workout
    """
    return {
        "message": "Create workout endpoint",
        "user_id": user_id
    }

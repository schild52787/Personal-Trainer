from fastapi import APIRouter
from app.api.v1.endpoints import workouts

api_router = APIRouter()

# Include endpoint routers
api_router.include_router(
    workouts.router,
    prefix="/workouts",
    tags=["workouts"]
)

# Add more routers as you create them:
# api_router.include_router(exercises.router, prefix="/exercises", tags=["exercises"])
# api_router.include_router(injuries.router, prefix="/injuries", tags=["injuries"])

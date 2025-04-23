from fastapi import APIRouter, HTTPException
from services.activity_service import get_all_activities
from models.activity_model import activityModel, activityResponse

router = APIRouter()

@router.get("/")
def get_activites():
    try:
        return get_all_activities()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error retrieving user activites: {str(e)}")
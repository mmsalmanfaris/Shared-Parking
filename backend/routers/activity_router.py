from fastapi import APIRouter, HTTPException, Depends
from services.activity_service import get_all_activities, get_user_activities
from models.activity_model import activityModel, activityResponse
from services.auth_service import get_current_user


router = APIRouter()

@router.get("/")
def get_activites():
    try:
        return get_all_activities()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error retrieving user activites: {str(e)}")


# User Reouter
@router.get("/user")
def get_user_bookings(current_user: dict = Depends(get_current_user)):
    try:
        user_id = current_user.get("id")
        return get_user_activities(user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch booking: {str(e)}")
    
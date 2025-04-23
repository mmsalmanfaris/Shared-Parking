from fastapi import APIRouter, HTTPException
from services.alert_service import get_all_alerts
from models.alerts_model import alertModal, alertResponse

router = APIRouter()

@router.get("/")
def get_alerts():
    try:
        return get_all_alerts()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error retrieving user alerts: {str(e)}")
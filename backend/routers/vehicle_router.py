from fastapi import HTTPException, APIRouter
from services.vehicle_service import get_all_vehicles
from models.vehicle_model import vehicleResponse

router = APIRouter()

@router.get("/", response_model=list[vehicleResponse])
def get_vehicles():
    try:
        return get_all_vehicles()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch vehicles: {str(e)}")

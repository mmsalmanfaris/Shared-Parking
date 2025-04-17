from fastapi import Depends, HTTPException, APIRouter
from services.vehicle_service import get_all_vehicles, get_vehicle_by_user, delete_vehicle, add_vehicle
from models.vehicle_model import vehicleResponse, vehicle_Response, vehicleModal
from services.auth_service import get_current_user

router = APIRouter()

# Admin Reouter
@router.get("/", response_model=list[vehicleResponse])
def get_admin_vehicles():
    try:
        return get_all_vehicles()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch vehicles: {str(e)}")
    


# User Reouter
@router.get("/user", response_model=list[vehicle_Response])
def get_user_vehicles(current_user: dict = Depends(get_current_user)):
    try:
        user_id = current_user.get("id")
        return get_vehicle_by_user(user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch vehicles: {str(e)}")


@router.delete("/user/{vehicle_id}")
def delete_user_vehicle(vehicle_id: str):
    try:
        delete_vehicle(vehicle_id)
        return {"message": "Vehicle deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete vehicle: {str(e)}")



@router.post("/user/create")
def add_user_vehicle(
    vehicle: vehicleModal,  # 👈 This gets the vehicle data from the request body
    current_user: dict = Depends(get_current_user)
):
    try:
        user_id = current_user.get("id")
        return add_vehicle(vehicle, user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create vehicle: {str(e)}")

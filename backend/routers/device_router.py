from fastapi import HTTPException, APIRouter
from services.device_service import get_device_type, add_device, get_all_devices, delete_device_by_id, update_device_by_id
from models.device_model import deviceTypeResponse, deviceModal, deviceResponse

router = APIRouter()

@router.get("/type", response_model=list[deviceTypeResponse])
def get_device_types():
    try:
        return get_device_type()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch device types: {str(e)}")


@router.post("/create")
async def create_device(device_data: deviceModal):
    try:
        return add_device(device_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create device: {str(e)}")


@router.get("/", response_model=list[deviceResponse])
def get_all_device():
    try:
        return get_all_devices()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch devices: {str(e)}")


@router.delete("/{device_id}")
async def delete_device(
    device_id: str):
    try:
        delete_device_by_id(device_id)
        return {"message": "Device deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete device: {str(e)}")
    

@router.put("/{device_id}")
def update_device(device_id: str, device_data: deviceModal):

    updated_device = update_device_by_id(device_id, device_data.dict(exclude_unset=True))
    if not updated_device:
        raise HTTPException(status_code=404, detail="Device not found")
    return {"message": "Device updated successfully"}
from services.slot_service import get_all_slots, add_slot, delete_slot_by_id, get_active_slots
from models.slot_model import sloteModal, slotResponse
from fastapi import HTTPException, APIRouter

router = APIRouter()

@router.get("/", response_model=list[slotResponse])
def get_all_slot():
    try:
        return get_all_slots()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch slots: {str(e)}")


@router.get("/active", response_model=list[slotResponse])
def get_active_slot():
    try:
        return get_active_slots()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch slots: {str(e)}")


@router.post("/create")
async def create_slot(slos_data: sloteModal):
    try:
        return add_slot(slos_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create slots: {str(e)}")


@router.delete("/{slot_id}")
async def delete_slot(
    slot_id: str):
    try:
        delete_slot_by_id(slot_id)
        return {"message": "Slot deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete Slot: {str(e)}")


def update_device_by_id(device_id: str, updated_data: dict):
    try:
        device_ref = _db.collection("Device").document(device_id)
        device_doc = device_ref.get()

        if not device_doc.exists:
            raise ValueError("Device not found")

        # Merge existing and new data
        existing_device_data = device_doc.to_dict()
        merged_data = {**existing_device_data, **updated_data}

        # Update the document
        device_ref.set(merged_data)

        return {"message": "Device updated successfully"}

    except Exception as e:
        print(f"Error updating device: {e}")
        raise ValueError("Failed to update device")

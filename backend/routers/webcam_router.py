from fastapi import APIRouter
from pydantic import BaseModel
from config.firebase_config import _db
from firebase_admin import firestore
import requests

router = APIRouter()

class PlateData(BaseModel):
    plate: str

ESP32_IP = "http://192.168.60.111"  # Nrework IP Address to communicate

@router.post("/")
async def process_plate(data: PlateData):
    plate = data.plate.upper().replace(" ", "")  # Normalize input
    status = ""
    slot_name = "Unknown"
    esp_data = ""
    vehicle_id = ""
    booking_id = ""

    # Check if vehicle exists
    vehicle_ref = _db.collection("Vehicle").where("plate_number", "==", plate).limit(1).stream()
    vehicle = next(vehicle_ref, None)

    if not vehicle:
        status = "notregistered"
    else:
        vehicle_id = vehicle.id

        # Check active booking
        booking_ref = _db.collection("Booking") \
            .where("vehicle_id", "==", vehicle_id) \
            .where("is_active", "==", True) \
            .limit(1).stream()
        
        booking = next(booking_ref, None)

        if not booking:
            status = "notactive"
        else:
            status = "active"
            booking_data = booking.to_dict()
            booking_id = booking.id
            slot_id = booking_data.get("slot_id")

            # Get slot name
            if slot_id:
                slot_doc = _db.collection("Slot").document(slot_id).get()
                if slot_doc.exists:
                    slot_name = slot_doc.to_dict().get("slotNo", "Unknown")

    # 🔁 Send command to ESP32
    try:
        esp_response = requests.post(
            f"{ESP32_IP}/command",
            json={
                "action": "open",
                "slot": slot_name,
                "plate": plate,
                "booking_id": booking_id,
                "status": status
            },
            timeout=3
        )
        esp_data = esp_response.text
    except Exception as e:
        esp_data = f"Failed to send to ESP32: {e}"

    # Log entry time if active
    if status == "active":
        try:
            _db.collection("UserActivities").add({
                "booking_id": booking_id,
                "entry_time": firestore.SERVER_TIMESTAMP
            })
        except Exception as e:
            print(f"Failed to log user activity: {e}")

    return {
        "status": status,
        "slot": slot_name,
        "vehicle_id": vehicle_id,
        "booking_id": booking_id,
        "esp_response": esp_data
    }

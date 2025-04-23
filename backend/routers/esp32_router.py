from fastapi import APIRouter, Request
from pydantic import BaseModel
from config.firebase_config import _db
from firebase_admin import firestore

router = APIRouter()

class ParkingData(BaseModel):
    bookingId: str
    detectedSlot: str
    status: str

@router.post("/status")
async def parked(data: ParkingData):
    print(f"[PARKED] Booking ID: {data.bookingId}, Slot: {data.detectedSlot}, Status: {data.status}")
    return {"message": "Parked status received"}


@router.post("/mismatch")
async def mismatch_status(data: ParkingData):


    _db.collection("Alert").add({
        "booking_id": data.bookingId,
        "detected_slot": data.detectedSlot,
        "status": data.status,
        "time": firestore.SERVER_TIMESTAMP
    })

    print(f"[MISMATCH] Booking ID: {data.bookingId}, Sent Slot: {data.detectedSlot}, Status: {data.status}")
    return {"message": "Mismatch status received"}


@router.post("/exit")
async def mark_exit(data: dict):
    booking_id = data.get("bookingId")
    if not booking_id:
        return {"status": "error", "message": "Missing bookingId"}
    
    try:
        # Get the first matching document
        bookings = _db.collection("UserActivities").where("booking_id", "==", booking_id).limit(1).stream()
        record = next(bookings, None)
        print("Updating booking ID:", record.id)


        if record and record.exists:
            record.reference.update({
                "exit_time": firestore.SERVER_TIMESTAMP
            })
            return {"status": "exit_recorded"}
        else:
            return {"status": "not_found", "message": "Booking not found"}
    except Exception as e:
        return {"status": "error", "message": str(e)}


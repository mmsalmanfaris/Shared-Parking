from fastapi import APIRouter, HTTPException
from services.booking_service import get_all_bookings
from models.booking_model import BookingResponse

router = APIRouter()

@router.get("/", response_model=list[BookingResponse])
def get_all_booking():
    try:
        bookings = get_all_bookings()
        return bookings
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch booking: {str(e)}")
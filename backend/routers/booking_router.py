from fastapi import APIRouter, HTTPException, Depends
from services.booking_service import get_all_bookings, get_bookings_by_user, booking_user
from models.booking_model import BookingResponse
from services.auth_service import get_current_user

router = APIRouter()

@router.get("/", response_model=list[BookingResponse])
def get_all_booking():
    try:
        bookings = get_all_bookings()
        return bookings
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch booking: {str(e)}")
    


# User Reouter
@router.get("/user", response_model=list[BookingResponse])
def get_user_bookings(current_user: dict = Depends(get_current_user)):
    try:
        user_id = current_user.get("id")
        return get_bookings_by_user(user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch booking: {str(e)}")
    

@router.post("/create")
def user_creation(user_data: BookingResponse):
    try:
        return booking_user(user_data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error during user creation: {str(e)}")
    
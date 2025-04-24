from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class BookingResponse(BaseModel):
    id: str
    booking_code: Optional[str]
    is_active: Optional[str]
    payment_status: Optional[str]
    vehicle: Optional[str]
    package: Optional[str]
    slot: Optional[str]   
    from_date: Optional[str]
    to_date: Optional[str]
    created_at: Optional[datetime]

    class Config:
        from_attributes = True
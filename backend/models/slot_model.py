from datetime import datetime
from pydantic import BaseModel
from typing import Optional


class sloteModal(BaseModel):
    device_id: str
    slotNo: str
    status: str

class slotResponse(sloteModal):
    id: str
    created_at: Optional[datetime] = None  # Add created_at if you're returning it

    class Config:
        orm_mode = True

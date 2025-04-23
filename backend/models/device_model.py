from datetime import datetime
from pydantic import BaseModel
from typing import Optional

# Device Type
class deviceTypeModal(BaseModel):
    name: str

class deviceTypeResponse(deviceTypeModal):
    id: str

    class Config:
        from_attributes = True

# Device
class deviceModal(BaseModel):
    name: str
    type_id: str

class deviceResponse(deviceModal):
    id: str
    created_at: Optional[datetime] = None  # Add created_at if you're returning it

    class Config:
        from_attributes = True

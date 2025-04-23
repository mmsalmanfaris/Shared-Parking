from datetime import datetime
from pydantic import BaseModel
from typing import Optional


#Admin Modal
class packageModal(BaseModel):
    name: str
    description: str
    duration: int
    amount: int
    created_at: Optional[datetime] = None

class packageResponse(packageModal):
    id: str

    class Config:
        from_attributes = True
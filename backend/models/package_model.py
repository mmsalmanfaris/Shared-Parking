from datetime import datetime
from pydantic import BaseModel
from typing import Optional


#Admin Modal
class packageModal(BaseModel):
    name: str
    description: str
    duration: int
    feature: str
    amount: int
    created_at: Optional[datetime] = None

class packageResponse(packageModal):
    id: str

    class Config:
        orm_mode = True
from pydantic import BaseModel
from typing import Optional

class adminModel(BaseModel):
    name: str
    address: str
    nic: str
    gender: str
    email: str
    password: Optional[str] = None

class adminUpdate(adminModel):
    name: Optional[str] = None
    address: Optional[str] = None
    nic: Optional[str] = None
    gender: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None

class adminResponse(adminModel):
    id: str

    class Config:
        from_attributes = True  # Use this instead of orm_mode
from pydantic import BaseModel
from typing import Optional

class adminModel(BaseModel):
    name: str
    address: str
    nic: str
    gender: str
    email: str
    password: Optional[str] = None

class adminUpdate(BaseModel):
    name: Optional[str]
    address: Optional[str]
    nic: Optional[str]
    gender: Optional[str]
    email: Optional[str]
    password: Optional[str]

class adminResponse(adminModel):
    id: str

    class Config:
        from_attributes = True  # Use this instead of from_attributes
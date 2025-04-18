from pydantic import BaseModel
from typing import Optional


# User Modal
class userModel(BaseModel):
    name: str
    nic: str
    address: str
    contact: str
    email: str
    password: str
    vehicle_brand: str 
    vehicle_model: str
    car_color: str
    plate_number: str
    package_id: str
    from_date: str
    to_date: str


class userUpdate(BaseModel):
    name: Optional[str]
    nic: Optional[str]
    address: Optional[str]
    contact: Optional[str]
    email: Optional[str]
    password: Optional[str]
    vehicle_brand: Optional [str]
    vehicle_model:Optional [str]
    car_color: Optional [str]
    plate_number: Optional [str]
    package_id: Optional [str]
    from_date: Optional [str]
    to_date: Optional [str]


# Admin Modal
class user_Model(BaseModel):
    name: str
    nic: str
    address: str
    contact: str
    email: str
    password: str

class user_Update(BaseModel):
    name: Optional[str]
    nic: Optional[str]
    address: Optional[str]
    contact: Optional[str]
    email: Optional[str]
    password: Optional[str]


class userResponse(userModel):
    id: str

    class Config:
        orm_mode = True
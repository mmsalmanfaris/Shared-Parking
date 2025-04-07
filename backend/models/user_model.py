from pydantic import BaseModel

class userModel(BaseModel):
    full_name: str
    nic: str
    address: str
    contact: str
    email: str
    password: str
    vehicle_brand: str
    vehicle_model: str
    car_color: str
    plate_number: str

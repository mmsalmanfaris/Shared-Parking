from pydantic import BaseModel

class LoginModel(BaseModel):
    email: str
    password: str
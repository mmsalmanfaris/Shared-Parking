from pydantic import BaseModel

class LoginModel(BaseModel):
    idToken: str
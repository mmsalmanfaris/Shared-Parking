from fastapi import APIRouter
from models.auth_model import LoginModel
from services.auth_service import authenticate_user


router = APIRouter()

@router.post('/login/')
def login(credentials: LoginModel):
    try:
        response = authenticate_user(credentials.email, credentials.password)
        return response
    except Exception as e:
        raise e
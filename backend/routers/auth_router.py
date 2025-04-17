from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from models.auth_model import LoginModel
from services.auth_service import authenticate_user, create_access_token

router = APIRouter()

@router.post("/login/")
def login(credentials: LoginModel):
    try:
        # Authenticate the user using the ID token
        user = authenticate_user(credentials.idToken)

        # Generate a JWT token
        token_data = {"sub": user["email"], "role": user["role"], "id": user["user_id"]}
        token = create_access_token(token_data)

        # Return the token and user details
        return {
            "access_token": token,
            "token_type": "bearer"
        }

    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))
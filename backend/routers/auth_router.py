from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel
from models.auth_model import LoginModel
from services.auth_service import authenticate_user, create_access_token

router = APIRouter()


@router.post("/login/")
async def login(request: Request):
    try:
        # 🔐 Extract token from header
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Missing or invalid Authorization header")

        id_token = auth_header.split(" ")[1]

        # Authenticate and generate access token
        user = authenticate_user(id_token)
        token_data = {"sub": user["email"], "role": user["role"], "id": user["user_id"]}
        token = create_access_token(token_data)

        return {
            "access_token": token,
            "token_type": "bearer"
        }

    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Login error: {str(e)}")

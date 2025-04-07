from fastapi import APIRouter, HTTPException
from models.user_model  import userModel
from services.user_service import create_user, get_users

router = APIRouter()

@router.post("/register/")
def register_user(user_data: userModel):
    try:
        return create_user(user_data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error during registration router: {str(e)}")
    
@router.get("/")
def list_users():
    try:
        return get_users()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error retrieving users router: {str(e)}")
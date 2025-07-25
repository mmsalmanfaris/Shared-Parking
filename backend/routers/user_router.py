from fastapi import APIRouter, HTTPException
from models.user_model  import userModel, user_Model, userUpdate, user_Update
from services.user_service import register_user, create_user, get_all_users, get_user_by_id, update_user, delete_user

router = APIRouter()

# User registration Form
@router.post("/register/")
def user_registration(user_data: userModel):
    try:
        return register_user(user_data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error during registration router: {str(e)}")
    
# Admin Dadshboard User Page
@router.post("/create")
def user_creation(user_data: user_Model):
    try:
        return create_user(user_data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error during user creation: {str(e)}")
    
    
@router.get("/")
def get_all_user_list():
    try:
        return get_all_users()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error retrieving users router: {str(e)}")
    


@router.get("/{user_id}")
def get_single_admin(user_id: str):

    user = get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="user not found")
    return user

@router.put("/{user_id}")
def update_existing_admin(user_id: str, user_data: user_Update):

    updated_user = update_user(user_id, user_data.dict(exclude_unset=True))
    if not updated_user:
        raise HTTPException(status_code=404, detail="user not found")
    return {"message": "Admin updated successfully"}

@router.delete("/{user_id}")
def delete_existing_user(user_id: str):

    success = delete_user(user_id)
    if not success:
        raise HTTPException(status_code=404, detail="user not found")
    return {"message": "user deleted successfully"}
from fastapi import APIRouter, HTTPException
from models.admin_model import adminModel, adminUpdate
from services.admin_service import (
    create_admin,
    get_all_admins,
    get_admin_by_id,
    update_admin,
    delete_admin,
)

# Define the router with a prefix and tags for better organization
router = APIRouter()

@router.post("/register")
def register_admin(admin_data: adminModel):
    try:
        return create_admin(admin_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create admin: {str(e)}")

@router.get("/")
def get_all_admins_list():
    """
    Retrieve a list of all admins.
    - Calls the `get_all_admins` service to fetch all admins from the database.
    """
    try:
        return get_all_admins()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch admins: {str(e)}")


@router.get("/{admin_id}")
def get_single_admin(admin_id: str):
    """
    Retrieve a single admin by ID.
    - Calls the `get_admin_by_id` service to fetch the admin.
    - Raises a 404 error if the admin is not found.
    """
    admin = get_admin_by_id(admin_id)
    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")
    return admin

@router.put("/{admin_id}")
def update_existing_admin(admin_id: str, admin_data: adminUpdate):
    """
    Update an existing admin.
    - Validates the input data using `AdminUpdate`.
    - Calls the `update_admin` service to update the admin in the database.
    - Raises a 404 error if the admin is not found.
    """
    updated_admin = update_admin(admin_id, admin_data.dict(exclude_unset=True))
    if not updated_admin:
        raise HTTPException(status_code=404, detail="Admin not found")
    return {"message": "Admin updated successfully"}

@router.delete("/{admin_id}")
def delete_existing_admin(admin_id: str):
    """
    Delete an existing admin.
    - Calls the `delete_admin` service to remove the admin from the database.
    - Raises a 404 error if the admin is not found.
    """
    success = delete_admin(admin_id)
    if not success:
        raise HTTPException(status_code=404, detail="Admin not found")
    return {"message": "Admin deleted successfully"}
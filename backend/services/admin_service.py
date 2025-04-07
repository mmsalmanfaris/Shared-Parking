from typing import Optional
from models.admin_model import adminModel, adminResponse, adminUpdate
from config.firebase_config import _db
from firebase_admin import auth, firestore


def create_admin(admin_data: adminModel):
    try:
        # Create a new admin user in Firebase Authentication
        admin = auth.create_user(
            email=admin_data.email,  # Access email as an attribute of the Pydantic model
            password=admin_data.password  # Access password as an attribute of the Pydantic model
        )

        # Set custom claims for admin role
        auth.set_custom_user_claims(admin.uid, {
            "role": "admin"
        })

        print(f"Admin Created with UID: {admin.uid}")

        # Store admin details in Firestore
        admin_ref = _db.collection("Admin").document(admin.uid)
        admin_ref.set({
            "fullname": admin_data.name,  # Access name as an attribute of the Pydantic model
            "address": admin_data.address,
            "nic": admin_data.nic,
            "gender": admin_data.gender,
            "created_at": firestore.SERVER_TIMESTAMP
        })

        return {"message": "Admin Created Successfully", "Admin_Id": admin.uid}

    except Exception as e:
        raise ValueError(f"Error during admin registration service: {str(e)}")


def get_all_admins():

    try:
        admins_ref = _db.collection("Admin").stream()
        admins = [doc.to_dict() for doc in admins_ref]
        return admins

    except Exception as e:
        raise ValueError(f"Error fetching admins: {str(e)}")


def get_admin_by_id(admin_id: str) -> Optional[adminResponse]:

    admin_ref = _db.collection("admins").document(admin_id).get()
    if admin_ref.exists:
        return adminResponse(**admin_ref.to_dict())  # Convert Firestore doc to Pydantic model
    return None


def update_admin(admin_id: str, admin_data: adminUpdate) -> Optional[adminResponse]:

    admin_ref = _db.collection("admins").document(admin_id)
    if admin_ref.get().exists:
        update_data = admin_data.dict(exclude_unset=True)  # Only include fields that are set
        admin_ref.update(update_data)
        updated_admin = admin_ref.get().to_dict()
        updated_admin["id"] = admin_id
        return adminResponse(**updated_admin)  # Convert Firestore doc to Pydantic model
    return None


def delete_admin(admin_id: str) -> bool:

    admin_ref = _db.collection("admins").document(admin_id)
    if admin_ref.get().exists:
        admin_ref.delete()
        return True
    return False
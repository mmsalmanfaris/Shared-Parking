from firebase_admin import firestore, auth
from config.firebase_config import _db
from models.user_model import userModel, userResponse


# Registration form
def register_user(user_data: userModel):
    try:
        # Create a new user in Firebase Authentication
        user = auth.create_user(
            email=user_data.email,
            password=user_data.password
        )

        #custome claims
        auth.set_custom_user_claims(user.uid, {
            "role": "user"
        })

        print(user.uid)
        
        # Store user details in Firestore
        user_ref = _db.collection("User").document(user.uid)
        user_ref.set({
            "name": user_data.name,
            "nic": user_data.nic,
            "address": user_data.address,
            "contact": user_data.contact,
            "created_at": firestore.SERVER_TIMESTAMP
        })

        # Store vehicle details in Firestore with a reference to the user ID
        vehicle_ref = _db.collection("Vehicle")  # Fixed typo: "Vechicle" -> "Vehicle"
        vehicle_ref.add({
            "user_id": user.uid,  # Reference to the user's UID
            "brand": user_data.vehicle_brand,
            "model": user_data.vehicle_model,
            "color": user_data.car_color,
            "plate_number": user_data.plate_number,
            "created_at": firestore.SERVER_TIMESTAMP
        })

        return {"message": "User created successfully", "user_id": user.uid}  # Return user.uid

    except Exception as e:
        raise ValueError(f"Error during registration service: {str(e)}")

# Admin Dashboard User Page
def create_user(user_data: userModel):
    try:
        # Create a new user in Firebase Authentication
        user = auth.create_user(
            email=user_data.email,
            password=user_data.password
        )

        #custome claims
        auth.set_custom_user_claims(user.uid, {
            "role": "user"
        })

        print(user.uid)
        
        # Store user details in Firestore
        user_ref = _db.collection("User").document(user.uid)
        user_ref.set({
            "name": user_data.name,
            "nic": user_data.nic,
            "address": user_data.address,
            "contact": user_data.contact,
            "created_at": firestore.SERVER_TIMESTAMP
        })

        return {"message": "User created successfully", "user_id": user.uid}  # Return user.uid

    except Exception as e:
        raise ValueError(f"Error during registration service: {str(e)}")
 


def get_all_users():
    try:
        users_ref = _db.collection("User").stream()
        firestore_users = {doc.id: doc.to_dict() for doc in users_ref}

        firebase_users = auth.list_users().users

        combined_users = []
        for user in firebase_users:
            uid = user.uid
            if uid in firestore_users:
                firestore_data = firestore_users[uid]

                fetch_vehicle = _db.collection("Vehicle").where("user_id", "==", uid).stream()
                vehicle_list = []

                for v in fetch_vehicle:
                    v_data = v.to_dict()
                    vehicle_list.append({
                        "brand": v_data.get("brand"),
                        "model": v_data.get("model"),
                        "color": v_data.get("color"),
                        "plate_number": v_data.get("plate_number"),
                        "created_at": v_data.get("created_at"),
                    })

                # User
                combined_users.append({
                    "id": uid,
                    "name": firestore_data.get("name"),
                    "email": user.email,  # Email from Firebase Auth
                    "address": firestore_data.get("address"),
                    "contact": firestore_data.get("contact"),
                    "nic": firestore_data.get("nic"),
                    "vehicles": vehicle_list,
                    "created_at": firestore_data.get("created_at")
                })
        return combined_users
    except Exception as e:
        raise ValueError(f"Error fetchin Users: {str(e)}")


def get_user_by_id(user_id: str):
    try:
        # Fetch authentication details from Firebase
        auth_details = auth.get_user(user_id)
        if not auth_details:
            raise ValueError("Authentication details not found")

        # Fetch Firestore details
        admin_ref = _db.collection("User").document(user_id).get()
        if not admin_ref.exists:
            raise ValueError("Firestore details not found")

        firestore_data = admin_ref.to_dict()

        # Combine data (exclude password since it's not available)
        combined_data = {
            "id": user_id,
            "name": firestore_data.get("name"),
            "address": firestore_data.get("address"),
            "nic": firestore_data.get("nic"),
            "gender": firestore_data.get("gender"),
            "email": auth_details.email,  # Email comes from Firebase Auth
        }

        # Validate and return the combined data
        return userResponse(**combined_data)

    except Exception as e:
        print(f"Error fetching admin details: {e}")
        return None


def update_user(user_id: str, updated_data: dict):
    try:
        user_ref = _db.collection("User").document(user_id)
        user_doc = user_ref.get()

        if not user_doc.exists:
            raise ValueError("User not found")

        existing_user_data = user_doc.to_dict()

        # Update user data (excluding email and password)
        firestore_update = {key: value for key, value in updated_data.items() if key not in ["email", "password"]}
        updated_user_data = {**existing_user_data, **firestore_update}
        user_ref.set(updated_user_data)

        # Update Firebase Authentication if needed
        if "email" in updated_data or "password" in updated_data:
            update_args = {}
            if "email" in updated_data:
                update_args["email"] = updated_data["email"]
            if "password" in updated_data:
                update_args["password"] = updated_data["password"]
            auth.update_user(user_id, **update_args)

        return True

    except Exception as e:
        print(f"Error updating user: {e}")
        return {"error": "Failed to update user"}



def delete_user(user_id: str) -> bool:

    try:
        auth.delete_user(user_id)
        print(f"User Deleted: {user_id}")
    except Exception as e:
        print(f"Error delete user_id: {e}")

    admin_ref = _db.collection("user").document(user_id)
    if admin_ref.get().exists:
        admin_ref.delete()
        return {"message": "Admin Deleted Successfully", "Admin_Id": user_id}
    return False
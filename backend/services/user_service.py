from firebase_admin import firestore, auth
from config.firebase_config import _db
from models.user_model import userModel

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

        print(user)
        
        # Store user details in Firestore
        user_ref = _db.collection("user").document(user.uid)
        user_ref.set({
            "full_name": user_data.full_name,
            "nic": user_data.nic,
            "address": user_data.address,
            "contact": user_data.contact,
            "email": user_data.email,
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

        return {"message": "user created successfully", "user_id": user.uid}  # Return user.uid

    except Exception as e:
        raise ValueError(f"Error during registration service: {str(e)}")
    

def get_users():
    users_ref = _db.collection("user").stream()
    users = [doc.to_dict() for doc in users_ref]
    return users

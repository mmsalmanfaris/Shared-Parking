from firebase_admin import firestore
from models.vehicle_model import vehicleModal, vehicleResponse
from config.firebase_config import _db


def get_all_vehicles():
    try:
        vehicle_ref = _db.collection("Vehicle").stream()
        firestore_vehicles = {doc.id: doc.to_dict() for doc in vehicle_ref}

        vehicles = []
        for doc_id, data in firestore_vehicles.items():
            vehicle_data = {
                "vehicle_brand": data.get("brand", "Unknown"),
                "vehicle_model": data.get("model", "Unknown"),
                "car_color": data.get("color", "Unknown"),
                "plate_number": data.get("plate_number", "Unknown"),
                "created_at": data.get("created_at", "Unknown"),
                "user_id": data.get("user_id", "Unknown"),
                "id": doc_id,  # ✅ This is important
            }

            # Get user name
            user_id = data.get("user_id")
            if user_id:
                user_ref = _db.collection("user").document(user_id)
                user_doc = user_ref.get()
                if user_doc.exists:
                    user_data = user_doc.to_dict()
                    vehicle_data["user"] = {
                        "name": user_data.get("name", "Unknown")
                    }
                else:
                    vehicle_data["user"] = {"name": "Unknown"}
            else:
                vehicle_data["user"] = {"name": "Unknown"}

            vehicles.append(vehicleResponse(**vehicle_data))

        print(f"✅ Fetched {len(vehicles)} vehicles from Firestore.")
        return vehicles

    except Exception as e:
        raise ValueError(f"Error fetching vehicles: {str(e)}")

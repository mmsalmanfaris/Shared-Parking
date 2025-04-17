from firebase_admin import firestore
from models.vehicle_model import vehicleModal, vehicleResponse, vehicle_Response
from config.firebase_config import _db


# Admin Service
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




# User Service

def get_vehicle_by_user(user_id: str) -> list[vehicle_Response]:
    try:
        # Filter where 'user_id' field matches
        vehicles_ref = _db.collection("Vehicle").where("user_id", "==", user_id).stream()

        vehicles = []
        for doc in vehicles_ref:
            data = doc.to_dict()
            vehicle_data = {
                "vehicle_brand": data.get("brand", "Unknown"),
                "vehicle_model": data.get("model", "Unknown"),
                "car_color": data.get("color", "Unknown"),
                "plate_number": data.get("plate_number", "Unknown"),
                "created_at": data.get("created_at"),
                "user_id": data.get("user_id"),
                "id": doc.id,
            }

            vehicles.append(vehicle_Response(**vehicle_data))

        return vehicles

    except Exception as e:
        raise ValueError(f"Error fetching vehicles for user: {str(e)}")
    

def delete_vehicle(vehicle_id: str):
    vehicle_ref = _db.collection("Vehicle").document(vehicle_id)
    if not vehicle_ref.get().exists:
        raise ValueError("Vehicle not found")
    vehicle_ref.delete()


def add_vehicle(user_data: vehicleModal, user_id: str):
    try:
        vehicle_ref = _db.collection("Vehicle")
        new_vehicle = {
            "user_id": user_id,
            "brand": user_data.vehicle_brand,
            "model": user_data.vehicle_model,
            "color": user_data.car_color,
            "plate_number": user_data.plate_number,
            "created_at": firestore.SERVER_TIMESTAMP
        }
        vehicle_ref.add(new_vehicle)

        return {"message": "Vehicle added successfully", "user_id": user_id}

    except Exception as e:
        raise ValueError(f"Error during vehicle creation: {str(e)}")

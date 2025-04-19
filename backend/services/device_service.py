from models.device_model import deviceTypeModal, deviceTypeResponse, deviceModal, deviceResponse
from config.firebase_config import _db
from firebase_admin import firestore

# Admin Service
def get_device_type():
    try:
        package_ref = _db.collection("DeviceType").stream()
        firestore_package = {doc.id: doc.to_dict()
                             for doc in package_ref}
        
        deviceTypes = []

        for doc_id, data in firestore_package.items():
            type_data = {
                "name": data.get("name", "Unknown"),
                "id": doc_id
            }
            deviceTypes.append(deviceTypeResponse(**type_data))
        return deviceTypes

    except Exception as e:
        raise ValueError(f"Error fetching Device types: {str(e)}")
    

def add_device(device: deviceModal):
    try:
        device_ref = _db.collection("Device")
        doc_ref = device_ref.add({
            "name": device.name,
            "type_id": device.type_id,
            "created_at": firestore.SERVER_TIMESTAMP,
        })

        return {
            "message": "Device created successfully",
            "id": doc_ref[1].id  # Returns the new document ID
        }
    except Exception as e:
        raise ValueError(f"Error creating device: {str(e)}")


def get_all_devices():
    try:
        device_ref = _db.collection("Device").stream()
        firestore_device = {doc.id: doc.to_dict()
                             for doc in device_ref}
        
        devices = []

        for doc_id, data in firestore_device.items():
            device_data = {
                "name": data.get("name", "Unknown"),
                "type_id": data.get("type_id", "Unknown"),
                "created_at": data.get("created_at", "Unknown"),
                "id": doc_id
            }
            devices.append(deviceResponse(**device_data))
        return devices
    except Exception as e:
        raise ValueError(f"Error fetching devices: {str(e)}")


def delete_device_by_id(device_id: str):
    device_ref = _db.collection("Device").document(device_id)
    if not device_ref.get().exists:
        raise ValueError("Device not found")
    device_ref.delete()


def update_device_by_id(device_id: str, updated_data: dict):
    try:
        device_ref = _db.collection("Device").document(device_id)
        device_doc = device_ref.get()

        if not device_doc.exists:
            raise ValueError("Device not found")

        # Merge existing and new data
        existing_device_data = device_doc.to_dict()
        merged_data = {**existing_device_data, **updated_data}

        # Update the document
        device_ref.set(merged_data)

        return {"message": "Device updated successfully"}

    except Exception as e:
        print(f"Error updating device: {e}")
        raise ValueError("Failed to update device")

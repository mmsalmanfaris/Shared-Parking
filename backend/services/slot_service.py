from config.firebase_config import _db
from models.slot_model import slotResponse, sloteModal
from firebase_admin import firestore

def get_all_slots():
    try:
        slot_ref = _db.collection("Slot").stream()
        firestore_slot = {doc.id: doc.to_dict()
                             for doc in slot_ref}
        slots = []

        for doc_id, data in firestore_slot.items():
            slor_data = {
                "device_id": data.get("device_id", "Unknown"),
                "slotNo": data.get("slotNo", "Unknown"),
                "status": data.get("status", "Unknown"),
                "created_at": data.get("created_at", "Unknown"),
                "id": doc_id
            }
            slots.append(slotResponse(**slor_data))
        return slots
    except Exception as e:
        raise ValueError(f"Error fetching devices: {str(e)}")


def add_slot(slot: sloteModal):
    try:
        slot_ref = _db.collection("Slot")
        doc_ref = slot_ref.add({
            "device_id": slot.device_id,
            "slotNo": slot.slotNo,
            "status": slot.status,
            "created_at": firestore.SERVER_TIMESTAMP,
        })

        return {
            "message": "Device created successfully",
            "id": doc_ref[1].id  # Returns the new document ID
        }
    except Exception as e:
        raise ValueError(f"Error creating device: {str(e)}")


def delete_slot_by_id(slot_id: str):
    slot_ref = _db.collection("Slot").document(slot_id)
    if not slot_ref.get().exists:
        raise ValueError("Slot not found")
    slot_ref.delete()


def get_active_slots():
    try:
        slot_ref = _db.collection("Slot").stream()
        firestore_slot = {doc.id: doc.to_dict() for doc in slot_ref}
        slots = []

        for doc_id, data in firestore_slot.items():
            if data.get("status") != "active":
                continue  # Skip inactive slots

            # Check if the slot is currently booked (active booking)
            bookings = _db.collection("Booking")\
                          .where("slot_id", "==", doc_id)\
                          .where("is_active", "==", True)\
                          .stream()

            is_booked = any(True for _ in bookings)  # True if any active booking exists

            if not is_booked:
                slot_data = {
                    "device_id": data.get("device_id", "Unknown"),
                    "slotNo": data.get("slotNo", "Unknown"),
                    "status": data.get("status", "Unknown"),
                    "created_at": data.get("created_at", "Unknown"),
                    "id": doc_id
                }
                slots.append(slotResponse(**slot_data))

        return slots

    except Exception as e:
        raise ValueError(f"Error fetching active slots: {str(e)}")

from config.firebase_config import _db
from firebase_admin import auth

def get_all_bookings():
    try:
        bookings_ref = _db.collection("Booking").stream()
        bookings = []

        for booking_doc in bookings_ref:
            booking_data = booking_doc.to_dict()

            # Extract IDs
            vehicle_id = booking_data.get("vehicle_id")
            package_id = booking_data.get("package_id")
            slot_id = booking_data.get("slot_id")

            # Fetch vehicle plate number
            vehicle_plate = None
            vehicle_doc = _db.collection("Vehicle").document(vehicle_id).get()
            if vehicle_doc.exists:
                vehicle_data = vehicle_doc.to_dict()
                vehicle_plate = vehicle_data.get("plate_number")

            # Fetch package name
            package_name = None
            package_doc = _db.collection("Package").document(package_id).get()
            if package_doc.exists:
                package_data = package_doc.to_dict()
                package_name = package_data.get("name")

            # Fetch slot name
            slot_name = None
            slot_doc = _db.collection("Slot").document(slot_id).get()
            if slot_doc.exists:
                slot_data = slot_doc.to_dict()
                slot_name = slot_data.get("slotNo")

            # Append processed booking data
            bookings.append({
                "id": booking_doc.id,
                "booking_code": booking_data.get("booking_code"),
                "is_active": str(booking_data.get("is_active", "")),
                "payment_status": booking_data.get("payment_status"),
                "vehicle": vehicle_plate,
                "package": package_name,
                "slot": slot_name, 
                "from_date": booking_data.get("from_date"),
                "to_date": booking_data.get("to_date"),
                "created_at": booking_data.get("created_at"),
            })

        return bookings

    except Exception as e:
        raise ValueError(f"Error fetching Booking details: {str(e)}")
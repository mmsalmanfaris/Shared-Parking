from config.firebase_config import _db
from firebase_admin import firestore
from models.user_model import userModel
from models.booking_model import BookingResponse
import random
from datetime import datetime
from common.sms import send_sms
import string

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
    


def get_bookings_by_user(user_id: str):
    try:
        # Step 1: Fetch all vehicle IDs associated with the user
        vehicles_ref = _db.collection("Vehicle").where("user_id", "==", user_id).stream()
        vehicle_ids = [vehicle_doc.id for vehicle_doc in vehicles_ref]

        if not vehicle_ids:
            # If no vehicles are found for the user, return an empty list
            return []

        # Step 2: Fetch bookings for each vehicle ID
        bookings = []
        for vehicle_id in vehicle_ids:
            bookings_ref = _db.collection("Booking").where("vehicle_id", "==", vehicle_id).stream()

            for booking_doc in bookings_ref:
                booking_data = booking_doc.to_dict()

                # Extract IDs
                package_id = booking_data.get("package_id")
                slot_id = booking_data.get("slot_id")

                # Fetch vehicle plate number (already fetched via vehicle_id)
                vehicle_plate = None
                vehicle_doc = _db.collection("Vehicle").document(vehicle_id).get()
                if vehicle_doc.exists:
                    vehicle_data = vehicle_doc.to_dict()
                    vehicle_plate = vehicle_data.get("plate_number")

                # Fetch package name
                package_name = None
                if package_id:  # Ensure package_id is not None
                    package_doc = _db.collection("Package").document(package_id).get()
                    if package_doc.exists:
                        package_data = package_doc.to_dict()
                        package_name = package_data.get("name")

                # Fetch slot name
                slot_name = None
                if slot_id:  # Ensure slot_id is not None
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
    




def booking_user(user_data: BookingResponse):
    try:
        # Generate a unique booking code
        date_str = datetime.now().strftime("%Y%m%d")
        random_str = ''.join(random.choices(string.ascii_uppercase + string.digits, k=5))
        booking_code = f"BK{date_str}-{random_str}"

        # Extract vehicle ID from user_data (assuming it's provided)
        vehicle_ref_id = user_data.vehicle_id  # Ensure this field exists in user_data

        # Store booking details in Firestore
        booking_ref = _db.collection("Booking")
        booking_doc = booking_ref.add({
            "booking_code": booking_code,
            "vehicle_id": vehicle_ref_id,
            "package_id": user_data.package_id,
            "from_date": user_data.from_date,
            "to_date": user_data.to_date,
            "slot_id": user_data.slot_id,
            "payment_status": "pending",
            "is_active": True,
            "created_at": firestore.SERVER_TIMESTAMP,
        })

        print(f"Booking Created with ID: {booking_doc[1].id}")

        # Send SMS notification
        try:
            sms_message = (
                f"Welcome to Shared Parking.\n"
                f"Your Booking No: {booking_code}.\n"
                f"Slot booked from {user_data.from_date} to {user_data.to_date}.\n"
                f"Thank You."
            )
            send_sms(
                recipient=user_data.contact,
                message=sms_message
            )
            print("SMS sent successfully.")
        except Exception as e:
            print(f"Error sending SMS: {str(e)}")
            # Log the error but do not raise an exception here, as SMS failure should not block the booking process

        # Return success response
        return {
            "message": "Booking created successfully",
            "booking_id": booking_doc[1].id,  # Include the Firestore document ID for reference
            "booking_code": booking_code
        }

    except Exception as e:
        raise ValueError(f"Error during booking creation: {str(e)}")
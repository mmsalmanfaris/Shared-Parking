from fastapi import APIRouter, HTTPException
from firebase_admin import auth
from config.firebase_config import _db  # Ensure this imports your Firebase app instance
from datetime import datetime
from collections import defaultdict

router = APIRouter()

@router.get("/system-usage")
def get_system_usage():
    """
    Fetch system usage metrics such as total slots, booked slots, active users, etc.
    """
    try:
        # Fetch total slots
        total_slots = _db.collection("Slot").stream()
        total_slot_count = sum(1 for _ in total_slots)

        # Fetch booked slots (slots with active bookings)
        booked_slots = _db.collection("Booking").where("is_active", "==", "true").stream()
        booked_slot_count = sum(1 for _ in booked_slots)

        # Fetch active slots (slots marked as active)
        active_slots = _db.collection("Slot").where("status", "==", "active").stream()
        active_slot_count = sum(1 for _ in active_slots)

        # Fetch inactive slots (slots marked as maintenance)
        inactive_slots = _db.collection("Slot").where("status", "==", "maintenance").stream()
        inactive_slot_count = sum(1 for _ in inactive_slots)

        # Fetch total users
        total_users = _db.collection("User").stream()
        total_user_count = sum(1 for _ in total_users)

        # Fetch total bookings
        total_bookings = _db.collection("Booking").stream()
        total_booking_count = sum(1 for _ in total_bookings)

        # Calculate booking usage percentage
        booking_usage_percent = (
            round((booked_slot_count / total_slot_count) * 100, 2) if total_slot_count else 0
        )

        # Fetch devices online/offline (assuming a "Device" collection with a "status" field)
        devices_online = _db.collection("Device").where("status", "==", "online").stream()
        devices_offline = _db.collection("Device").where("status", "==", "offline").stream()

        devices_online_count = sum(1 for _ in devices_online)
        devices_offline_count = sum(1 for _ in devices_offline)

        # Return the calculated metrics as JSON
        return {
            "total_slots": total_slot_count,
            "booked_slots": booked_slot_count,
            "active_slots": active_slot_count,
            "inactive_slots": inactive_slot_count,
            "total_users": total_user_count,
            "total_bookings": total_booking_count,
            "booking_usage_percent": booking_usage_percent,
            "devices_online": devices_online_count,
            "devices_offline": devices_offline_count,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@router.get("/users")
def get_users():
    """
    Fetch user details including their vehicles, active booking status, and last login time.
    """
    try:
        users_ref = _db.collection("User").stream()  # Fetch all users from Firestore
        vehicles_ref = _db.collection("Vehicle")  # Reference to the Vehicle collection
        bookings_ref = _db.collection("Booking")  # Reference to the Booking collection

        users = []
        for user in users_ref:
            user_data = user.to_dict()
            user_id = user.id

            # Step 1: Get vehicle IDs associated with the user
            vehicles_query = vehicles_ref.where("user_id", "==", user_id).stream()
            vehicle_ids = [vehicle.id for vehicle in vehicles_query]

            # Step 2: Check if any of the user's vehicles have active bookings
            is_active = False
            for vehicle_id in vehicle_ids:
                active_bookings_query = (
                    bookings_ref.where("vehicle_id", "==", vehicle_id)
                    .where("is_active", "==", "true")
                )
                active_bookings = list(active_bookings_query.stream())  # Convert generator to list
                if len(active_bookings) > 0:
                    is_active = True
                    print(f"Active booking found for user {user_id}, vehicle {vehicle_id}")
                    break  # Stop checking if we find at least one active booking

            # Step 3: Get the last login time from Firebase Auth
            try:
                firebase_user = auth.get_user(user_id)  # Fetch the user record from Firebase Auth
                last_login_timestamp = firebase_user.user_metadata.last_sign_in_timestamp
                if last_login_timestamp:
                    last_login = datetime.utcfromtimestamp(last_login_timestamp / 1000).strftime(
                        "%Y-%m-%d %H:%M:%S"
                    )  # Convert to human-readable format
                else:
                    last_login = None
            except Exception as e:
                print(f"Error fetching Firebase Auth data for user {user_id}: {e}")
                last_login = None

            # Append user details to the list
            users.append(
                {
                    "id": user_id,
                    "name": user_data.get("name"),
                    "nic": user_data.get("nic"),
                    "address": user_data.get("address"),
                    "contact": user_data.get("contact"),
                    "created_at": user_data.get("created_at"),
                    "last_login": last_login,
                    "is_active": is_active,
                }
            )

        return users

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    



@router.get("/vehicles")
def get_vehicles():
    """
    Fetch all vehicles along with their details, including the associated user's name.
    """
    try:
        # Reference to the Vehicle collection in Firestore
        vehicles_ref = _db.collection("Vehicle").stream()

        # Extract vehicle data
        vehicles = []
        for vehicle in vehicles_ref:
            vehicle_data = vehicle.to_dict()
            vehicle_id = vehicle.id

            # Get the user_id from the vehicle data
            user_id = vehicle_data.get("user_id")

            # Fetch the associated user's name from the User collection
            user_doc = _db.collection("User").document(user_id).get()
            user_name = user_doc.to_dict().get("name") if user_doc.exists else "Unknown"

            # Append vehicle details to the list
            vehicles.append(
                {
                    "id": vehicle_id,
                    "brand": vehicle_data.get("brand"),
                    "model": vehicle_data.get("model"),
                    "color": vehicle_data.get("color"),
                    "plate_number": vehicle_data.get("plate_number"),
                    "created_at": vehicle_data.get("created_at"),
                    "user_name": user_name,  # Add the user's name to the response
                }
            )

        return vehicles

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    



@router.get("/bookings")
def get_bookings():
    """
    Fetch all bookings along with their details.
    Includes aggregated data for payment status distribution and bookings per day.
    """
    try:
        # Reference to the Booking collection in Firestore
        bookings_ref = _db.collection("Booking").stream()

        # Extract booking data
        bookings = []
        payment_status_count = defaultdict(int)
        bookings_per_day = defaultdict(int)

        for booking in bookings_ref:
            booking_data = booking.to_dict()
            booking_id = booking.id

            # Aggregate payment status data
            payment_status = booking_data.get("payment_status", "unknown")
            payment_status_count[payment_status] += 1

            # Aggregate bookings per day data
            from_date = booking_data.get("from_date", "unknown")
            bookings_per_day[from_date] += 1

            # Append booking details to the list
            bookings.append(
                {
                    "id": booking_id,
                    "booking_code": booking_data.get("booking_code"),
                    "from_date": booking_data.get("from_date"),
                    "to_date": booking_data.get("to_date"),
                    "payment_status": payment_status,
                    "created_at": booking_data.get("created_at"),
                    "is_active": booking_data.get("is_active"),
                    "package_id": booking_data.get("package_id"),
                    "slot_id": booking_data.get("slot_id"),
                    "vehicle_id": booking_data.get("vehicle_id"),
                }
            )

        # Convert aggregated data to lists for charts
        payment_status_data = [
            {"name": status, "value": count} for status, count in payment_status_count.items()
        ]

        bookings_per_day_data = [
            {"from_date": date, "count": count} for date, count in bookings_per_day.items()
        ]

        return {
            "bookings": bookings,
            "payment_status_distribution": payment_status_data,
            "bookings_per_day": bookings_per_day_data,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@router.get("/api-usage")
def get_api_usage(start_date: str = None, end_date: str = None):
    """
    Fetch API usage data within a date range.
    """
    try:
        # Reference to the ApiUsage collection in Firestore
        api_usage_ref = _db.collection("ApiUsage")

        # Apply filters if start_date and end_date are provided
        query = api_usage_ref
        if start_date and end_date:
            start_datetime = datetime.fromisoformat(start_date)
            end_datetime = datetime.fromisoformat(end_date)
            query = query.where("timestamp", ">=", start_datetime.isoformat()).where(
                "timestamp", "<=", end_datetime.isoformat()
            )

        # Fetch data
        api_usage_data = [doc.to_dict() for doc in query.stream()]

        return api_usage_data

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
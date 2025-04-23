from config.firebase_config import _db

def get_all_activities():
    try:
        # Fetch all activities from the UserActivities collection
        activities_ref = _db.collection("UserActivities").stream()
        activities = []

        for activity_doc in activities_ref:
            activity_data = activity_doc.to_dict()

            # Extract booking_id from the activity
            booking_id = activity_data.get("booking_id")

            # Fetch the corresponding booking document from the Booking collection
            booking_doc = _db.collection("Booking").document(booking_id).get()

            if booking_doc.exists:
                booking_data = booking_doc.to_dict()
                booking_code = booking_data.get("booking_code", "N/A")  # Default to "N/A" if booking_code is missing
            else:
                booking_code = "N/A"  # Handle case where booking document does not exist

            # Append the activity data along with the booking_code
            activities.append({
                "booking_id": booking_id,
                "booking_code": booking_code,
                "entry_time": activity_data.get("entry_time"),
                "exit_time": activity_data.get("exit_time")
            })

        return activities

    except Exception as e:
        raise ValueError(f"Error fetching user activities: {str(e)}")
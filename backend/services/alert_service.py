from config.firebase_config import _db

def get_all_alerts():
    try:
        alerts_ref = _db.collection("Alert").stream()
        alerts = []

        print( f"FIRST" ,alerts)

        for alert_doc in alerts_ref:
            alert_data = alert_doc.to_dict()
            print(F"SECOND", alert_data)

            booking_id = alert_data.get("booking_id")

            # Fetch the corresponding booking document from the Booking collection
            booking_doc = _db.collection("Booking").document(booking_id).get()

            if booking_doc.exists:
                booking_data = booking_doc.to_dict()
                booking_code = booking_data.get("booking_code", "N/A")
            else:
                booking_code = "N/A"  # Handle case where booking document does not exist

            print(F"THIRD", booking_code)

            # Append the activity data along with the booking_code
            alerts.append({
                "booking_id": booking_id,
                "booking_code": booking_code,
                "detected_slot": alert_data.get("detected_slot"),
                "status": alert_data.get("status"),
                "time": alert_data.get("time")

            })

        return alerts

    except Exception as e:
        raise ValueError(f"Error fetching user activities: {str(e)}")
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
import pytz
from config.firebase_config import _db

def deactivate_expired_bookings():
    now = datetime.now(pytz.UTC)
    bookings = _db.collection("Booking").where("is_active", "==", True).stream()

    for booking in bookings:
        data = booking.to_dict()
        to_date = data.get("to_date")
        if to_date and isinstance(to_date, datetime) and to_date < now:
            booking.reference.update({"is_active": False})
            print(f"Booking {booking.id} expired and deactivated.")

def start_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(deactivate_expired_bookings, "interval", minutes=1)
    scheduler.start()

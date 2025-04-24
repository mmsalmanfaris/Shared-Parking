from fastapi import FastAPI, Request
from datetime import datetime
from config.firebase_config import _db  # Assuming Firebase is used for logging

app = FastAPI()

@app.middleware("http")
async def log_api_usage(request: Request, call_next):
    """
    Logs API usage details to Firestore.
    """
    start_time = datetime.utcnow()
    response = await call_next(request)
    end_time = datetime.utcnow()

    # Extract relevant details from the request
    api_endpoint = request.url.path
    method = request.method
    status_code = response.status_code
    duration = (end_time - start_time).total_seconds()

    # Log the API usage data to Firestore
    try:
        api_log_ref = _db.collection("ApiUsage").document()
        api_log_ref.set({
            "endpoint": api_endpoint,
            "method": method,
            "status_code": status_code,
            "duration_seconds": duration,
            "timestamp": datetime.utcnow().isoformat(),
        })
    except Exception as e:
        print(f"Failed to log API usage: {e}")

    return response
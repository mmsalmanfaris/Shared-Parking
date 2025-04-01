from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

# Enable CORS for communication with React frontend
origins = [
    "http://localhost:3000",  # React frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Sample API endpoint: Fetch parking slots
@app.get("/parking-slots/")
def get_parking_slots():
    # Simulate parking slot data
    parking_slots = {
        "slot_1": {"status": "available"},
        "slot_2": {"status": "occupied"},
        "slot_3": {"status": "available"},
    }
    return parking_slots

# Sample API endpoint: User login
@app.post("/login/")
def login(username: str, password: str):
    # Simulate user authentication
    if username == "admin" and password == "password":
        return {"message": "Login successful", "role": "admin"}
    elif username == "user" and password == "password":
        return {"message": "Login successful", "role": "user"}
    else:
        return {"message": "Invalid credentials"}

# Sample API endpoint: Admin dashboard data
@app.get("/admin-dashboard/")
def admin_dashboard():
    # Simulate admin-specific data
    return {
        "total_users": 100,
        "total_parking_spaces": 50,
        "occupied_spaces": 20,
    }

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
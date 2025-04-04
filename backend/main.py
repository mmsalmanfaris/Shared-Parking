from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import firebase_admin
from firebase_admin import credentials, auth, firestore
from pydantic import BaseModel

app = FastAPI()

# Define allowed origins
origins = [
    "http://localhost:5173",  # React Vite app
    "http://127.0.0.1:5173",  # Alternative localhost
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow requests from the React frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Initialize Firebase Admin SDK
cred = credentials.Certificate("final-project-5c102-firebase-adminsdk-fbsvc-db3f030fd6.json")  # Path to your JSON file
firebase_admin.initialize_app(cred)

# Get Firestore client
db = firestore.client()

# Define a Pydantic model for the request body
class RegisterRequest(BaseModel):
    full_name: str
    nic: str
    address: str
    contact: str
    email: str
    password: str
    vehicle_brand: str
    vehicle_model: str
    car_color: str
    plate_number: str

@app.post("/register/")
def register(request_body: RegisterRequest):
    try:
        # Extract data from the request body
        full_name = request_body.full_name
        nic = request_body.nic
        address = request_body.address
        contact = request_body.contact
        email = request_body.email
        password = request_body.password
        vehicle_brand = request_body.vehicle_brand
        vehicle_model = request_body.vehicle_model
        car_color = request_body.car_color
        plate_number = request_body.plate_number

        # Create a new user in Firebase Authentication
        user = auth.create_user(
            email=email,
            password=password
        )

        # Store customer details in Firestore
        customer_data = {
            "full_name": full_name,
            "nic": nic,
            "address": address,
            "contact": contact,
            "email": email,
            "created_at": firestore.SERVER_TIMESTAMP
        }

        # Add the customer data to the 'Customer' collection
        db.collection("Customer").document(user.uid).set(customer_data)

        # Store vehicle details in Firestore with a reference to the customer ID
        vehicle_data = {
            "customer_id": user.uid,  # Reference to the customer
            "brand": vehicle_brand,
            "model": vehicle_model,
            "color": car_color,
            "plate_number": plate_number,
            "created_at": firestore.SERVER_TIMESTAMP
        }

        # Add the vehicle data to the 'Vehicle' collection
        db.collection("Vehicle").add(vehicle_data)  # Use .add() to generate a unique document ID

        return {"message": "Registration successful", "user_id": user.uid}

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error during registration: {str(e)}")
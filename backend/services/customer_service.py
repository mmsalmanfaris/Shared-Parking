from firebase_admin import firestore, auth
from config.firebase_config import db
from models.customer_model import CustomerModel

def create_customer(customer_data: CustomerModel):
    try:
        # Create a new user in Firebase Authentication
        user = auth.create_user(
            email=customer_data.email,
            password=customer_data.password
        )

        #custome claims
        auth.set_custom_user_claims(user.uid, {
            "role": "user"
        })

        print(user)
        
        # Store customer details in Firestore
        customer_ref = db.collection("Customer").document(user.uid)
        customer_ref.set({
            "full_name": customer_data.full_name,
            "nic": customer_data.nic,
            "address": customer_data.address,
            "contact": customer_data.contact,
            "email": customer_data.email,
            "created_at": firestore.SERVER_TIMESTAMP
        })

        # Store vehicle details in Firestore with a reference to the customer ID
        vehicle_ref = db.collection("Vehicle")  # Fixed typo: "Vechicle" -> "Vehicle"
        vehicle_ref.add({
            "customer_id": user.uid,  # Reference to the customer's UID
            "brand": customer_data.vehicle_brand,
            "model": customer_data.vehicle_model,
            "color": customer_data.car_color,
            "plate_number": customer_data.plate_number,
            "created_at": firestore.SERVER_TIMESTAMP
        })

        return {"message": "Customer created successfully", "customer_id": user.uid}  # Return user.uid

    except Exception as e:
        raise ValueError(f"Error during registration service: {str(e)}")
    

def get_customers():
    customers_ref = db.collection("Customer").stream()
    customers = [doc.to_dict() for doc in customers_ref]
    return customers

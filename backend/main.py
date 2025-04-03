from fastapi import FastAPI, HTTPException
import firebase_admin
from firebase_admin import credentials, firestore

app = FastAPI()

# Initialize Firebase Admin SDK
cred = credentials.Certificate("final-project-5c102-firebase-adminsdk-fbsvc-db3f030fd6.json")  # Path to your JSON file
firebase_admin.initialize_app(cred)

# Get a reference to Firestore
db = firestore.client()

# Test Endpoint
@app.get("/")
def read_root():
    return {"message": "FastAPI connected to Firestore!"}

# Example: Fetch all admins from Firestore
@app.get("/admins/")
def get_admins():
    try:
        # Query the 'Admin' collection
        docs = db.collection("Admin").stream()
        admins = []
        for doc in docs:
            admin_data = doc.to_dict()
            admin_data["id"] = doc.id  # Include the document ID
            admins.append(admin_data)
        return {"admins": admins}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching admins: {str(e)}")

# Example: Fetch a specific admin by ID
@app.get("/admin/{admin_id}")
def get_admin(admin_id: str):
    try:
        # Get a specific document from the 'Admin' collection
        doc_ref = db.collection("Admin").document(admin_id)
        doc = doc_ref.get()
        if doc.exists:
            admin_data = doc.to_dict()
            admin_data["id"] = doc.id
            return {"admin": admin_data}
        else:
            raise HTTPException(status_code=404, detail="Admin not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching admin: {str(e)}")

# Example: Add a new admin to Firestore
@app.post("/admin/")
def add_admin(name: str, email: str, password: str):
    try:
        # Add a new document to the 'Admin' collection
        doc_ref = db.collection("Admin").document()
        doc_ref.set({
            "name": name,
            "email": email,
            "password": password,
            "created_at": firestore.SERVER_TIMESTAMP
        })
        return {"message": f"Admin added successfully with ID: {doc_ref.id}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error adding admin: {str(e)}")

# Example: Update an existing admin
@app.put("/admin/{admin_id}")
def update_admin(admin_id: str, name: str, email: str, password: str):
    try:
        # Update an existing document in the 'Admin' collection
        doc_ref = db.collection("Admin").document(admin_id)
        doc = doc_ref.get()
        if doc.exists:
            doc_ref.update({
                "name": name,
                "email": email,
                "password": password
            })
            return {"message": f"Admin updated successfully: {admin_id}"}
        else:
            raise HTTPException(status_code=404, detail="Admin not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating admin: {str(e)}")

# Example: Delete an admin
@app.delete("/admin/{admin_id}")
def delete_admin(admin_id: str):
    try:
        # Delete a document from the 'Admin' collection
        doc_ref = db.collection("Admin").document(admin_id)
        doc = doc_ref.get()
        if doc.exists:
            doc_ref.delete()
            return {"message": f"Admin deleted successfully: {admin_id}"}
        else:
            raise HTTPException(status_code=404, detail="Admin not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting admin: {str(e)}")
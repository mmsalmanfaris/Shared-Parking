from models.package_model import packageModal, packageResponse
from config.firebase_config import _db
from firebase_admin import firestore


# Admin Service
def get_all_packages():
    try:
        package_ref = _db.collection("Package").stream()
        firestore_package = {doc.id: doc.to_dict()
                             for doc in package_ref}
        
        packages = []

        for doc_id, data in firestore_package.items():
            package_data = {
                "name": data.get("name", "Unknown"),
                "description": data.get("description", "Unknown"),
                "duration": data.get("duration", 0),
                "feature": data.get("feature", "Unknown"),
                "amount": data.get("amount", 0),
                "created_at": data.get("created_at", "Unknown"),
                "id": doc_id
            }
            packages.append(packageResponse(**package_data))
        return packages
    except Exception as e:
        raise ValueError(f"Error fetching packages: {str(e)}")

def add_package(package: packageModal):
    try:
        package_ref = _db.collection("Package")
        doc_ref = package_ref.add({
            "name": package.name,
            "description": package.description,
            "duration": package.duration,
            "feature": package.feature,
            "amount": package.amount,
            "created_at": firestore.SERVER_TIMESTAMP,
        })
        return {
            "message": "Package created successfully",
            "id": doc_ref[1].id  # Returns the new document ID
        }
    except Exception as e:
        raise ValueError(f"Error creating package: {str(e)}")
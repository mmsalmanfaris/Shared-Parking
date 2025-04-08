from firebase_admin import auth
from datetime import datetime, timedelta
import jwt
from fastapi import HTTPException

SECRET_KEY = "your-secret-key-here"

def authenticate_user(id_token: str):
    try:
        # Verify the Firebase ID token
        decoded_token = auth.verify_id_token(id_token)
        user_uid = decoded_token["uid"]

        # Fetch user details
        user_record = auth.get_user(user_uid)
        custom_claims = user_record.custom_claims
        role = custom_claims.get("role", "user")

        return {"email": user_record.email, "role": role}

    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Authentication failed: {str(e)}")

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=1)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")
    return encoded_jwt
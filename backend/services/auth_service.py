from firebase_admin import auth
from datetime import datetime, timedelta
from jose import jwt, JWTError
from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from config.config import settings

SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM


security = HTTPBearer()

def authenticate_user(id_token: str):
    try:
        # Verify the Firebase ID token
        decoded_token = auth.verify_id_token(id_token)
        user_uid = decoded_token["uid"]

        # Fetch user details
        user_record = auth.get_user(user_uid)
        custom_claims = user_record.custom_claims
        role = custom_claims.get("role", "user")

        return {"email": user_record.email, "role": role, "user_id": user_uid}

    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Authentication failed: {str(e)}")


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=1)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")
    return encoded_jwt



def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload  # ✅ This should be a dict
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

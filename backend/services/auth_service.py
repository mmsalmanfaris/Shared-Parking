import jwt
from datetime import datetime, timedelta
from firebase_admin import auth
from fastapi import HTTPException

SECRET_KEY = "your-secret-eky"

def authenticate_user(email: str, password: str):
    try:
        user = auth.get_user_by_email(email)

        custom_claims = auth.get_user(user.uid).custom_claims
        role = custom_claims.get("role", "user")

        # JWT Token
        token = jwt.encode(
            {
                "sub": user.uid,
                "email": user.email,
                "role": role,
                "exp": datetime.utc.now() + timedelta(hour=1)
            },
            SECRET_KEY,
            algorithm="HS256",
        )

        #password not checked

        return {"message": "Login successful", "token": token, "role": role}
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Authentication failed: {str(e)}")

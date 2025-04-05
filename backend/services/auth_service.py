from firebase_admin import auth
from fastapi import HTTPException

def authenticate_user(email: str, password: str):
    try:
        user = auth.get_user_by_email(email)

        custom_claims = auth.get_user(user.uid).custom_claims
        role = custom_claims.get("role", "user")

        #password not checked

        return {"message": "Login successful", "role": role}
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Authentication failed: {str(e)}")

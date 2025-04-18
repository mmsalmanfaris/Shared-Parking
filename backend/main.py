from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.user_router import router as user_router
from routers.auth_router import router as auth_router
from routers.admin_router import router as admin_router
from routers.vehicle_router import router as vehicle_router
from routers.package_router import router as package_router
from dotenv import load_dotenv
from pydantic_settings import BaseSettings
import os

load_dotenv()

class Settings(BaseSettings):
    SECRET_KEY: str = os.getenv("SECRET_KEY")

settings = Settings()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*",]
)

app.include_router(user_router, prefix="/api/user", tags=["users"])
app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
app.include_router(admin_router, prefix="/api/admin", tags=["Admin"])
app.include_router(vehicle_router, prefix="/api/vehicle", tags=["Vehicle"])
app.include_router(package_router, prefix="/api/package", tags=["Package"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Smart Parking System API", "SECRET_KEY": settings.SECRET_KEY}



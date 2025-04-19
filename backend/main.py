from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from scheduler.bookin_scheduler import start_scheduler
from contextlib import asynccontextmanager

from routers.user_router import router as user_router
from routers.auth_router import router as auth_router
from routers.admin_router import router as admin_router
from routers.vehicle_router import router as vehicle_router
from routers.package_router import router as package_router
from routers.device_router import router as deviceType_router
from routers.slot_router import router as slot_router

from dotenv import load_dotenv
from pydantic_settings import BaseSettings
import os

load_dotenv()

class Settings(BaseSettings):
    SECRET_KEY: str = os.getenv("SECRET_KEY")

settings = Settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Code to run at startup
    start_scheduler()
    yield



app = FastAPI(lifespan=lifespan)

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
app.include_router(deviceType_router, prefix="/api/device", tags=["DeviceType"])
app.include_router(slot_router, prefix="/api/slot", tags=["Slot"])


@app.get("/")
def read_root():
    return {"message": "Welcome to the Smart Parking System API", "SECRET_KEY": settings.SECRET_KEY}




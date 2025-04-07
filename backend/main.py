from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import user_router
from routers.auth_router import router as auth_router
from routers.admin_router import router as admin_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*",]
)

app.include_router(user_router.router, prefix="/api/user", tags=["users"])
app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
app.include_router(admin_router, prefix="/api/admin", tags=["Admin"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Smart Parking System API"}



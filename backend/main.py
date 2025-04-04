from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import customer_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*",]
)

app.include_router(customer_router.router, prefix="/customer", tags=["Customers"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Smart Parking System API"}
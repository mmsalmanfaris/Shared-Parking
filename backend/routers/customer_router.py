from fastapi import APIRouter, HTTPException
from models.customer_model  import CustomerModel
from services.customer_service import create_customer, get_customers

router = APIRouter()

@router.post("/register/")
def register_customer(customer_data: CustomerModel):
    try:
        return create_customer(customer_data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error during registration router: {str(e)}")
    
@router.get("/")
def list_customers():
    try:
        return get_customers()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error retrieving customers router: {str(e)}")
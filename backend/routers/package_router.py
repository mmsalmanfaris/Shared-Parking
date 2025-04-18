from fastapi import HTTPException, APIRouter
from services.package_service import get_all_packages, add_package
from models.package_model import packageResponse, packageModal

router = APIRouter()

# Admin Router

@router.get("/", response_model=list[packageResponse])
def get_admin_packages():
    try:
        return get_all_packages()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch Packages {str(e)}")
    

@router.post("/create")
async def create_admin_package(
    package_data: packageModal):
    try:
        return add_package(package_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create package: {str(e)}")
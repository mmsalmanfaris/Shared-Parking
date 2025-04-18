from fastapi import HTTPException, APIRouter
from services.package_service import get_all_packages, add_package, delete_package
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


@router.delete("/{package_id}")
async def delete_admin_package(
    package_id: str):
    try:
        delete_package(package_id)
        return {"message": "Package deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete package: {str(e)}")
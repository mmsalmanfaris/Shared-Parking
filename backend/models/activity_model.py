from pydantic import BaseModel

class activityModel(BaseModel):
    booking_id: int
    entry_time: str
    exit_time: str

class activityResponse(activityModel):
    id: str

    class Config:
        from_attributes = True 
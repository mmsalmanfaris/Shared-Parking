from pydantic import BaseModel

class alertModal(BaseModel):
    booking_id: str
    detected_slot:str
    status:str

class alertResponse(alertModal):
    id: str

    class config:
        form_attributes = True
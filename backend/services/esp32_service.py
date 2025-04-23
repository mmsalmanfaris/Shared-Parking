from fastapi import FastAPI, Request
from pydantic import BaseModel

app = FastAPI()

class IRData(BaseModel):
    ir0: int
    ir1: int
    ir2: int
    ir3: int

@app.post("/api/update")
async def receive_data(data: IRData):
    print(f"Received data: {data}")
    # Decide servo angle based on data here if needed
    return {"servo_angle": 90}  # example response

from pydantic import BaseModel
class CarbonRequest(BaseModel):
    distance: float
    vehicleCategory: str



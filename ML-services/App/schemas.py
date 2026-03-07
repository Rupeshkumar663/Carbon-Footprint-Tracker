from pydantic import BaseModel

class CarbonRequest(BaseModel):

    distance: float
    mileage: float
    fuel_type: int
    speed: float
    traffic_level: float
    temperature: float
    road_type: int
    vehicle_age: int
    vehicle_load: float
    elevation_gain: float
    engine_cc: int
from pydantic import BaseModel
class CarbonInput(BaseModel):
    distance:float
    mileage:float
    fuel_type:int
    speed:float
    traffic_level:int
    temperature:float
    road_type:int
    vehicle_age:int
    vehicle_load:int
    elevation_gain:float
    engine_cc:int
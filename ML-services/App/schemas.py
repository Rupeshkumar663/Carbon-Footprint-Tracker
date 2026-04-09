from pydantic import BaseModel, Field
class CarbonInput(BaseModel):
    distance: float = Field(..., gt=0, description="Distance in km")
    mileage: float = Field(..., gt=0, description="Vehicle mileage km/l")
    fuel_type:int=Field(...,ge=0,le=3, description="0=petrol,1=diesel,2=electric,3=cng")
    speed:float=Field(...,gt=0,description="Speed in km/h")
    traffic_level:int=Field(...,ge=1,le=3, description="1=low,2=medium,3=high")
    temperature: float = Field(..., description="Temperature in Celsius")
    road_type: int = Field(..., ge=0, le=1, description="0=city,1=highway")
    vehicle_age: int = Field(..., ge=0, le=30)
    vehicle_load: int = Field(..., ge=1, le=10)
    elevation_gain: float = Field(..., ge=0)
    engine_cc: int= Field(..., ge=50,le=5000)
from fastapi import FastAPI
from App.schemas import CarbonInput
from App.predictor import predict_carbon
app=FastAPI()
@app.post("/predict")
def predict(data:CarbonInput):
    carbon=predict_carbon(
        data.distance,
        data.mileage,
        data.fuel_type,
        data.speed,
        data.traffic_level,
        data.temperature,
        data.road_type,
        data.vehicle_age,
        data.vehicle_load,
        data.elevation_gain,
        data.engine_cc
    )
    return {"carbon_emission": carbon}
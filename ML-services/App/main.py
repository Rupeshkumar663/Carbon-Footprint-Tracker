from fastapi import FastAPI
from schemas import CarbonRequest
from predictor import predict_carbon

app = FastAPI()

@app.get("/")
def home():
    return {"message": "ML Service Running"}

@app.post("/predict")
def predict(data: CarbonRequest):

    result = predict_carbon(
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

    return {
        "carbon_emission": result
    }
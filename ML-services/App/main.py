from fastapi import FastAPI
from App.schemas import CarbonInput
from App.predictor import predict_carbon
from fastapi.middleware.cors import CORSMiddleware
import time
app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health():
    return {"status":"ML service running"}

@app.post("/predict")
def predict(data: CarbonInput):
    start_time = time.time()
    carbon = predict_carbon(
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
    response_time = round((time.time() - start_time) * 1000, 2)
    return {
        "carbon_emission": carbon,
        "response_time_ms": response_time
    }
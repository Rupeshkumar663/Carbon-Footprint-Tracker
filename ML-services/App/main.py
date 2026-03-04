from fastapi import FastAPI
from .schemas import CarbonRequest
from .predictor import predict_carbon

app = FastAPI()

@app.post("/predict")
def predict(data: CarbonRequest):

    result = predict_carbon(
        data.distance,
        data.vehicleCategory
    )

    return result
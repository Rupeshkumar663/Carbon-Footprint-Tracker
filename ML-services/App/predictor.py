import joblib
import os

# model ka correct path
MODEL_PATH = os.path.join(os.path.dirname(__file__), "carbon_model.pkl")

# load trained model
model = joblib.load(MODEL_PATH)

def predict_carbon(
distance,
mileage,
fuel_type,
speed,
traffic,
temp,
road_type,
vehicle_age,
vehicle_load,
elevation,
engine_cc
):

    data = [[
        distance,
        mileage,
        fuel_type,
        speed,
        traffic,
        temp,
        road_type,
        vehicle_age,
        vehicle_load,
        elevation,
        engine_cc
    ]]

    prediction = model.predict(data)

    return float(prediction[0])
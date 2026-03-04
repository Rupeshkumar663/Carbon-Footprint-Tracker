from .model_loader import model

def predict_carbon(distance, vehicleCategory):

    category_map = {
        "road": 1,
        "rail": 2,
        "air": 3
    }

    transport = category_map.get(vehicleCategory, 1)

    prediction = model.predict([[distance, transport]])

    carbon = round(float(prediction[0]), 2)

    confidence = 0.90

    return {
        "carbonEmission": carbon,
        "confidence": confidence
    }
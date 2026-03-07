from predictor import predict_carbon

result = predict_carbon(

distance=12,
mileage=15,
fuel_type=1,
speed=35,
traffic=1.2,
temp=30,
road_type=1,
vehicle_age=5,
vehicle_load=200,
elevation=40,
engine_cc=1500

)

print("Carbon Emission:",result,"kg CO2")
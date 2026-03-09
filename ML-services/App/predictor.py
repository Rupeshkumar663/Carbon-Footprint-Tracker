def predict_carbon(
    distance,
    mileage,
    fuel_type,
    speed,
    traffic_level,
    temperature,
    road_type,
    vehicle_age,
    vehicle_load,
    elevation_gain,
    engine_cc
):
    fuel_factor={
        1:2.31,
        2:2.68,
        3:2.75,
        4:0
    }
    base_carbon=(distance/mileage)*fuel_factor.get(fuel_type,2.31)
    adjustment=1
    if speed>70:
        adjustment+=0.10
    elif speed>50:
        adjustment +=0.05
    if traffic_level==3:
        adjustment +=0.15
    elif traffic_level==2:
        adjustment +=0.05
    if vehicle_age>8:
        adjustment +=0.10
    elif vehicle_age >4:
        adjustment +=0.05
    if engine_cc >2000:
        adjustment +=0.12
    elif engine_cc >1500:
        adjustment +=0.07
    if road_type==0:
        adjustment +=0.05
    if elevation_gain>200:
        adjustment +=0.08
    elif elevation_gain>100:
        adjustment +=0.04
    if vehicle_load>4:
        adjustment +=0.06
    if temperature>35 or temperature<10:
        adjustment +=0.03
    final_carbon=base_carbon*adjustment
    return float(final_carbon)
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
        0: 2.31,  
        1: 2.68,   
        2: 0.08,   
        3: 1.8     
    }

    mileage = mileage if mileage > 0 else 15

    # 🔋 ELECTRIC FIX (IMPORTANT)
    if fuel_type == 2:
        return round(distance * fuel_factor[2], 2)

    # 🧠 NORMAL VEHICLES
    base_carbon = (distance / mileage) * fuel_factor.get(fuel_type, 2.31)

    adjustment = 1.0

    # 🚗 speed impact
    if speed > 80:
        adjustment += 0.12
    elif speed > 60:
        adjustment += 0.07
    elif speed < 20:
        adjustment += 0.10

    # 🚦 traffic impact
    if traffic_level == 3:
        adjustment += 0.20
    elif traffic_level == 2:
        adjustment += 0.10

    # 🚙 vehicle age
    if vehicle_age > 10:
        adjustment += 0.12
    elif vehicle_age > 5:
        adjustment += 0.06

    # ⚙ engine size
    if engine_cc > 2000:
        adjustment += 0.15
    elif engine_cc > 1500:
        adjustment += 0.08

    # 🛣 road type
    if road_type == 0:
        adjustment += 0.08

    # ⛰ elevation
    if elevation_gain > 300:
        adjustment += 0.10
    elif elevation_gain > 100:
        adjustment += 0.05

    # 👥 load
    if vehicle_load > 4:
        adjustment += 0.08

    # 🌡 temperature
    if temperature > 35 or temperature < 10:
        adjustment += 0.05
 # 🔥 cap adjustment (IMPORTANT)
    adjustment = min(adjustment, 1.8)
    final_carbon = base_carbon * adjustment

    return round(float(final_carbon), 2)
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import joblib

df = pd.read_csv("carbon_dataset.csv")

X = df[
[
"distance",
"mileage",
"fuel_type",
"speed",
"traffic_level",
"temperature",
"road_type",
"vehicle_age",
"vehicle_load",
"elevation_gain",
"engine_cc"
]]

y = df["carbon"]

X_train,X_test,y_train,y_test = train_test_split(
X,y,test_size=0.2,random_state=42
)

model = LinearRegression()

model.fit(X_train,y_train)

joblib.dump(model,"carbon_model.pkl")

print("Model trained successfully")
import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

data = {
    "distance":[2,5,10,15,20,25,30],
    "category":[1,1,2,2,3,1,2],
    "carbon":[0.4,1.1,2.5,3.8,5.2,6.1,7.3]
}

df = pd.DataFrame(data)

X = df[["distance","category"]]
y = df["carbon"]

model = LinearRegression()

model.fit(X,y)

joblib.dump(model,"model/carbon_model.pkl")

print("Model trained successfully")
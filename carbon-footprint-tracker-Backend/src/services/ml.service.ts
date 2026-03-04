import axios from "axios";

export const getMLPrediction = async (
  distance: number,
  vehicleCategory: string
) => {

  const res = await axios.post(
    "http://localhost:8000/predict",
    {
      distance,
      vehicleCategory
    }
  );

  return res.data;
};
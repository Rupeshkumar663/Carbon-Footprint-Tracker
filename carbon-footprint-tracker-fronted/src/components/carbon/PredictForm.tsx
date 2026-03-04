import { useState } from "react";
import api from "../../api/axios";


interface CarbonResult {
  carbonEmission: number;
  greenScore: number;
  isEcoFriendly: boolean;
}

export default function PredictionForm() {

  const [vehicleName,setVehicleName]=useState("");
  const [fuelType,setFuelType]=useState("petrol");

  const [mileage,setMileage]=useState<number>(0);
  const [energyConsumption,setEnergyConsumption]=useState<number>(0);

  const [distance,setDistance]=useState<number>(0);

  const [startLocation,setStartLocation]=useState("");
  const [endLocation,setEndLocation]=useState("");

  const [loading,setLoading]=useState(false);
  const [result,setResult]=useState<CarbonResult | null>(null);
  const [error,setError]=useState("");

  const handleSubmit=async()=>{

    if(!vehicleName){
      setError("Vehicle name required");
      return;
    }

    if(distance<=0){
      setError("Distance must be greater than 0");
      return;
    }

    setError("");

    try{

      setLoading(true);

      const response=await api.post(
       "/carbon/predict",
        {
          vehicleName,
          fuelType,
          mileage,
          energyConsumption,
          distance,
          startLocation,
          endLocation
        }
      )

      setResult(response.data.data)

    }catch(err:any){
      setError("Prediction failed")
    }finally{
      setLoading(false)
    }

  }

  return (

    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl space-y-6">

      <h2 className="text-2xl font-bold text-white">
        Carbon Prediction
      </h2>

      {/* Vehicle Name */}

      <input
        placeholder="Vehicle Name"
        className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700"
        onChange={(e)=>setVehicleName(e.target.value)}
      />

      {/* Fuel Type */}

      <select
        className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700"
        onChange={(e)=>setFuelType(e.target.value)}
      >

        <option value="petrol">Petrol</option>
        <option value="diesel">Diesel</option>
        <option value="electric">Electric</option>

      </select>

      {/* Mileage */}

      {fuelType!=="electric" && (

        <input
          type="number"
          placeholder="Mileage (km/l)"
          className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700"
          onChange={(e)=>setMileage(Number(e.target.value))}
        />

      )}

      {/* Energy consumption */}

      {fuelType==="electric" && (

        <input
          type="number"
          placeholder="Energy Consumption (kWh/km)"
          className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700"
          onChange={(e)=>setEnergyConsumption(Number(e.target.value))}
        />

      )}

      {/* Distance */}

      <input
        type="number"
        placeholder="Distance (km)"
        className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700"
        onChange={(e)=>setDistance(Number(e.target.value))}
      />

      {/* Locations */}

      <input
        placeholder="Start Location"
        className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700"
        onChange={(e)=>setStartLocation(e.target.value)}
      />

      <input
        placeholder="End Location"
        className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700"
        onChange={(e)=>setEndLocation(e.target.value)}
      />

      {/* Error */}

      {error && (
        <p className="text-red-400 text-sm">
          {error}
        </p>
      )}

      {/* Button */}

      <button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 py-3 rounded-xl font-semibold text-white"
      >

        {loading ? "Calculating..." : "Predict Carbon"}

      </button>

      {/* Result */}

      {result && (

        <div className="mt-6 p-6 bg-slate-800 rounded-2xl">

          <p className="text-white">
            Emission: <b>{result.carbonEmission}</b> kg CO₂
          </p>

          <p className="text-white">
            Green Score: <b>{result.greenScore}%</b>
          </p>

          <p className="text-emerald-400">
            {result.isEcoFriendly ? "Eco Friendly 🌱" : "Not Eco Friendly"}
          </p>

        </div>

      )}

    </div>
  )
}
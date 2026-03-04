import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import { createCarbonRecord } from "../../redux/carbonSlice";
import { fetchVehicles } from "../../redux/vehicleSlice";

export default function PredictionForm() {
  const dispatch = useDispatch<AppDispatch>();

  const vehicles = useSelector(
    (state: RootState) => state.vehicle.list
  );

  const vehicleStatus = useSelector(
    (state: RootState) => state.vehicle.status
  );

  const carbonStatus = useSelector(
    (state: RootState) => state.carbon.status
  );

  const [vehicleId, setVehicleId] = useState("");
  const [distance, setDistance] = useState("");
  const [error, setError] = useState("");
  

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  const handleSubmit = () => {
    if (!vehicleId) {
      setError("Please select a vehicle");
      return;
    }

    if (!distance || Number(distance) <= 0) {
      setError("Enter valid distance greater than 0");
      return;
    }

    setError("");

    dispatch(
      createCarbonRecord({
        vehicleId,
        distance: Number(distance),
        startLocation: "Delhi",
        endLocation: "Noida",
      })
    );
  };



  return (
    <div className="space-y-8">

      {/* Distance Input */}
      <div>
        <label className="block text-sm text-slate-400 mb-2">
          Distance (km)
        </label>
        <input
          type="number"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          placeholder="Enter distance"
          className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 outline-none transition"
        />
      </div>
      
      {/* Vehicle Selection */}
      <div>
        <label className="block text-sm text-slate-400 mb-3">
          Select Vehicle
        </label>

        {vehicleStatus === "loading" ? (
          <p className="text-slate-400">Loading vehicles...</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {vehicles.map((vehicle: any) => (
              <div
                key={vehicle._id}
                onClick={() => setVehicleId(vehicle._id)}
                className={`cursor-pointer p-4 rounded-xl border transition ${
                  vehicleId === vehicle._id
                    ? "bg-emerald-500/10 border-emerald-400 text-emerald-400"
                    : "bg-slate-800 border-slate-700 text-slate-300 hover:border-emerald-400"
                }`}
              >
                <p className="font-semibold">
                  {vehicle.name}
                </p>
                <p className="text-xs opacity-60">
                  {vehicle.fuelType}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-2 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* Button */}
      <button
        onClick={handleSubmit}
        disabled={carbonStatus === "loading"}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 font-semibold hover:opacity-90 transition disabled:opacity-60"
      >
        {carbonStatus === "loading"
          ? "Calculating..."
          : "Predict Carbon"}
      </button>

    </div>
  );
}

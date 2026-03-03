import { useState } from "react";
import { useAppDispatch } from "../../utils/hooks";
import { fetchCarbonPrediction } from "../../redux/carbonSlice";
import { motion } from "framer-motion";
import { Car, Bus, Bike, Train } from "lucide-react";

export default function CarbonForm() {
  const dispatch = useAppDispatch();

  const [distance, setDistance] = useState<number | "">("");
  const [transportType, setTransportType] = useState("car");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!distance || distance <= 0) return;

    setLoading(true);
    await dispatch(
      fetchCarbonPrediction({
        distance: Number(distance),
        transportType,
      })
    );
    setLoading(false);
  };

  const transportOptions = [
    { value: "car", label: "Car", icon: <Car size={18} /> },
    { value: "bus", label: "Bus", icon: <Bus size={18} /> },
    { value: "bike", label: "Bike", icon: <Bike size={18} /> },
    { value: "train", label: "Train", icon: <Train size={18} /> },
  ];

  return (
    <div className="space-y-6">

      {/* Distance Input */}
      <div className="relative">
        <input
          type="number"
          value={distance}
          onChange={(e) =>
            setDistance(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="peer w-full p-4 rounded-xl bg-slate-900 border border-slate-700 focus:border-green-400 outline-none text-white placeholder-transparent"
          placeholder="Distance"
        />
        <label className="absolute left-4 top-2 text-slate-400 text-sm transition-all 
          peer-placeholder-shown:top-4 
          peer-placeholder-shown:text-base 
          peer-placeholder-shown:text-slate-500 
          peer-focus:top-2 
          peer-focus:text-sm 
          peer-focus:text-green-400">
          Distance (km)
        </label>
      </div>

      {/* Transport Selection */}
      <div className="grid grid-cols-2 gap-4">
        {transportOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setTransportType(option.value)}
            className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all 
              ${
                transportType === option.value
                  ? "bg-green-500/20 border-green-400 text-green-400"
                  : "bg-slate-900 border-slate-700 hover:border-green-400"
              }`}
          >
            {option.icon}
            {option.label}
          </button>
        ))}
      </div>

      {/* Submit Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        disabled={!distance || distance <= 0 || loading}
        onClick={handleSubmit}
        className={`w-full p-4 rounded-xl font-semibold transition-all 
          ${
            loading
              ? "bg-slate-700 cursor-not-allowed"
              : "bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90"
          }`}
      >
        {loading ? "Predicting..." : "Predict Carbon"}
      </motion.button>
    </div>
  );
}
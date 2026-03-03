import { useAppSelector } from "../../utils/hooks";
import { motion } from "framer-motion";

export default function CarbonResultCard() {
  const { result, status } = useAppSelector(
    (state) => state.carbon
  );

  if (status === "loading") {
    return (
      <div className="mt-6 p-6 bg-slate-900/60 rounded-2xl text-center animate-pulse">
        <p className="text-slate-400">Analyzing carbon impact...</p>
      </div>
    );
  }

  if (!result) return null;

  const getColor = (score: number) => {
    if (score >= 75) return "text-green-400";
    if (score >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  const getBarColor = (score: number) => {
    if (score >= 75) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl"
    >
      <h3 className="text-xl font-semibold text-green-400 mb-6">
        Prediction Result
      </h3>

      {/* Emission */}
      <div className="flex justify-between items-center">
        <p className="text-slate-400">Carbon Emission</p>
        <p className="text-lg font-bold">
          {result.carbonEmission} kg CO₂
        </p>
      </div>

      {/* Green Score */}
      <div className="mt-6">
        <div className="flex justify-between">
          <p className="text-slate-400">Green Score</p>
          <p
            className={`font-bold ${getColor(
              result.greenScore
            )}`}
          >
            {result.greenScore}%
          </p>
        </div>

        {/* Animated Progress Bar */}
        <div className="mt-3 h-4 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${result.greenScore}%` }}
            transition={{ duration: 0.8 }}
            className={`h-4 ${getBarColor(
              result.greenScore
            )}`}
          />
        </div>
      </div>

      {/* Eco Badge */}
      <div className="mt-6 text-center">
        {result.isEcoFriendly ? (
          <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
            🌿 Eco Friendly Route
          </span>
        ) : (
          <span className="px-4 py-2 bg-red-500/20 text-red-400 rounded-full text-sm font-semibold">
            ⚠ High Emission Route
          </span>
        )}
      </div>
    </motion.div>
  );
}
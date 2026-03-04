import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

export default function ResultPanel() {

  const result = useSelector(
    (state: RootState) => state.carbon.result
  );

  if (!result) return null;

  const progress = result.greenScore;

  const scoreColor =
    progress >= 70
      ? "text-emerald-400"
      : progress >= 40
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-white/5 backdrop-blur-2xl border border-white/10 shadow-xl rounded-3xl p-8 mt-6 space-y-6"
      >

        {/* Title */}

        <h3 className="text-xl font-bold text-white">
          Prediction Result
        </h3>

        {/* Carbon Emission */}

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700">

          <p className="text-slate-400 text-sm">
            Carbon Emission
          </p>

          <p className="text-3xl font-bold text-white mt-1">
            {result.carbonEmission} kg CO₂
          </p>

        </div>

        {/* Green Score */}

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700">

          <p className="text-slate-400 text-sm">
            Green Score
          </p>

          <p className={`text-2xl font-bold mt-1 ${scoreColor}`}>
            {result.greenScore}%
          </p>

          {/* Progress bar */}

          <div className="w-full h-3 bg-slate-700 rounded-full mt-3">

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1 }}
              className="h-3 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
            />

          </div>

        </div>

        {/* Eco Friendly */}

        <div className="text-center">

          {result.isEcoFriendly ? (

            <span className="px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-semibold">
              🌱 Eco Friendly Route
            </span>

          ) : (

            <span className="px-4 py-2 rounded-full bg-red-500/20 text-red-400 text-sm font-semibold">
              🔥 High Carbon Emission
            </span>

          )}

        </div>

      </motion.div>

    </AnimatePresence>
  );
}
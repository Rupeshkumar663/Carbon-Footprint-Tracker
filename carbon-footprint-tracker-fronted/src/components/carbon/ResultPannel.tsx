import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
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
        className="relative bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl rounded-3xl p-10 mt-10 space-y-8"
      >
        {/* Glow Background */}
        <div className="absolute inset-0 blur-3xl opacity-20 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full"></div>

        <h3 className="relative text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Emission Analytics
        </h3>

        {/* Carbon Emission */}
        <div className="relative text-center space-y-2">
          <p className="text-slate-400">Carbon Emission</p>
          <p className="text-4xl font-bold text-white">
            <CountUp end={result.carbonEmission} duration={1.2} /> kg CO₂
          </p>
        </div>

        {/* Green Score */}
        <div className="relative text-center space-y-2">
          <p className="text-slate-400">Green Score</p>
          <p className={`text-3xl font-bold ${scoreColor}`}>
            <CountUp end={result.greenScore} duration={1.2} />%
          </p>
        </div>

        {/* Circular Progress */}
        <div className="flex justify-center mt-6 relative">
          <svg width="160" height="160">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#1e293b"
              strokeWidth="14"
              fill="none"
            />
            <motion.circle
              cx="80"
              cy="80"
              r="70"
              stroke={
                progress >= 70
                  ? "#10b981"
                  : progress >= 40
                  ? "#facc15"
                  : "#ef4444"
              }
              strokeWidth="14"
              fill="none"
              strokeDasharray={440}
              strokeDashoffset={
                440 - (440 * progress) / 100
              }
              initial={{ strokeDashoffset: 440 }}
              animate={{
                strokeDashoffset:
                  440 - (440 * progress) / 100,
              }}
              transition={{ duration: 1.3 }}
            />
          </svg>
        </div>

        {/* Risk Badge */}
        <div className="flex justify-center">
          <span
            className={`px-5 py-2 rounded-full text-sm font-semibold ${
              progress >= 70
                ? "bg-emerald-500/20 text-emerald-400"
                : progress >= 40
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {progress >= 70
              ? "Low Risk 🌱"
              : progress >= 40
              ? "Moderate Risk ⚠️"
              : "High Risk 🔥"}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
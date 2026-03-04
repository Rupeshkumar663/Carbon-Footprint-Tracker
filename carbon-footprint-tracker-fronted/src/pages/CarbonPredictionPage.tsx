import { motion } from "framer-motion";
import PredictionForm from "../components/carbon/PredictForm";
import ResultPanel from "../components/carbon/ResultPannel";

export default function CarbonPredictionPage() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">

      {/* Background glow effects */}

      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-emerald-500/20 blur-[120px] rounded-full"></div>

      <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-cyan-500/20 blur-[120px] rounded-full"></div>

      {/* Main container */}

      <div className="relative max-w-7xl mx-auto px-6 py-16">

        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
            AI Carbon Footprint Predictor
          </h1>

          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Estimate transportation emissions and analyze environmental
            impact using intelligent carbon prediction technology.
          </p>
        </motion.div>

        {/* Grid Layout */}

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Prediction Form */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-xl"
          >
            <PredictionForm />
          </motion.div>

          {/* Result Panel */}

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-xl"
          >
            <ResultPanel />
          </motion.div>

        </div>

        {/* Footer */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-slate-500 mt-16 text-sm"
        >
          Powered by Intelligent Carbon Analytics 🌍
        </motion.div>

      </div>
    </div>
  );
}
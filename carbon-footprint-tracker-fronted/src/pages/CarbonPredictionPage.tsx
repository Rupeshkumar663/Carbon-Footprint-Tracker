import CarbonForm from "../components/carbon/CarbonForm";
import CarbonResultCard from "../components/carbon/CarbonResultCard";
import { motion } from "framer-motion";

export default function CarbonPredictPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white overflow-hidden">

      {/* Animated Background Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE – Hero Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                AI Carbon
              </span>{" "}
              Intelligence
            </h1>

            <p className="text-slate-400 text-lg max-w-lg">
              Instantly analyze your travel impact using intelligent carbon modeling.
              Make smarter, eco-friendly decisions in seconds.
            </p>

            <div className="flex gap-6 mt-8">
              <div>
                <p className="text-3xl font-bold text-green-400">99%</p>
                <p className="text-sm text-slate-400">Accuracy</p>
              </div>

              <div>
                <p className="text-3xl font-bold text-emerald-400">Real-Time</p>
                <p className="text-sm text-slate-400">Prediction</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE – Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl shadow-2xl space-y-8"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Predict Your Route Impact
              </h2>
              <CarbonForm />
            </div>

            <div className="border-t border-white/10 pt-6">
              <CarbonResultCard />
            </div>
          </motion.div>

        </div>
      </div>

    </div>
  );
}
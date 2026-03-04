import PredictionForm from "../components/carbon/PredictForm";
import ResultPanel from "../components/carbon/ResultPannel";

export default function PredictPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-16 flex items-center">

      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-20 items-center">

        {/* LEFT SECTION */}
        <div className="space-y-8">

          <h1 className="text-5xl font-bold leading-tight">
            <span className="text-emerald-400">
              Smart Carbon
            </span>
            <br />
            <span className="text-cyan-400">
              Intelligence
            </span>
          </h1>

          <p className="text-slate-400 text-lg">
            Predict route emissions using intelligent modeling.
            Measure sustainability and optimize your travel decisions
            with real-time eco analytics.
          </p>

          <div className="space-y-4 text-slate-300">
            <div>✔ AI-based emission engine</div>
            <div>✔ Real-time green scoring</div>
            <div>✔ Sustainability risk analysis</div>
          </div>

        </div>

        {/* RIGHT CARD */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-10">

          <PredictionForm />
          <ResultPanel />

        </div>

      </div>

    </div>
  );
}
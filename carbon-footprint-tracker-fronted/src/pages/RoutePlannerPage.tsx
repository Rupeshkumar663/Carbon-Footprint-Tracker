import { useState } from "react";
import api from "../api/axios";
import { Loader2, MapPin, Leaf, Clock } from "lucide-react";

interface RouteResult {
  distance: number;
  duration: number;
  carbonEmission: number;
  greenScore: number;
}

export default function RoutePlannerPage() {
  const [form, setForm] = useState({
    startLocation: "",
    endLocation: "",
    transportType: "car",
  });

  const [result, setResult] = useState<RouteResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await api.post("/routes/create", {
        userId: "USER_ID",
        ...form,
        distance: 12,
        duration: 25,
      });

      setResult(res.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-16">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Smart Route Planner
          </h1>
          <p className="text-slate-400 text-sm">
            Calculate carbon impact and choose greener travel options.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl">

          <div className="grid md:grid-cols-2 gap-12">

            {/* FORM SECTION */}
            <div className="space-y-6">

              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Start Location
                </label>
                <input
                  type="text"
                  placeholder="Enter starting point"
                  className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 focus:border-green-400 outline-none transition"
                  onChange={(e) =>
                    setForm({ ...form, startLocation: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Destination
                </label>
                <input
                  type="text"
                  placeholder="Enter destination"
                  className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 focus:border-green-400 outline-none transition"
                  onChange={(e) =>
                    setForm({ ...form, endLocation: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Transport Type
                </label>
                <select
                  className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 focus:border-green-400 outline-none transition"
                  onChange={(e) =>
                    setForm({ ...form, transportType: e.target.value })
                  }
                >
                  <option value="car">Car</option>
                  <option value="bike">Bike</option>
                  <option value="bus">Bus</option>
                  <option value="train">Train</option>
                  <option value="walk">Walk</option>
                  <option value="cycle">Cycle</option>
                </select>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90 transition px-6 py-4 rounded-xl font-semibold flex justify-center items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Calculating...
                  </>
                ) : (
                  "Calculate Route"
                )}
              </button>

            </div>

            {/* RESULT SECTION */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between">

              {!result ? (
                <div className="flex flex-col justify-center items-center h-full text-slate-500">
                  <Leaf size={40} className="mb-4 text-green-400" />
                  <p>Results will appear here</p>
                </div>
              ) : (
                <div className="space-y-8">

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-6 text-center">

                    <div className="bg-slate-800 rounded-xl p-5">
                      <MapPin size={18} className="mx-auto mb-2 text-green-400" />
                      <p className="text-sm text-slate-400">Distance</p>
                      <p className="text-xl font-semibold">
                        {result.distance} km
                      </p>
                    </div>

                    <div className="bg-slate-800 rounded-xl p-5">
                      <Clock size={18} className="mx-auto mb-2 text-green-400" />
                      <p className="text-sm text-slate-400">Duration</p>
                      <p className="text-xl font-semibold">
                        {result.duration} min
                      </p>
                    </div>

                  </div>

                  {/* Carbon */}
                  <div className="text-center">
                    <p className="text-slate-400 text-sm">
                      Carbon Emission
                    </p>
                    <p className="text-2xl font-bold text-white mt-2">
                      {result.carbonEmission} kg
                    </p>
                  </div>

                  {/* Green Score */}
                  <div>
                    <div className="flex justify-between mb-2 text-green-400">
                      <span>Green Score</span>
                      <span>{result.greenScore}%</span>
                    </div>

                    <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-3 bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-700"
                        style={{ width: `${result.greenScore}%` }}
                      />
                    </div>
                  </div>

                </div>
              )}

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
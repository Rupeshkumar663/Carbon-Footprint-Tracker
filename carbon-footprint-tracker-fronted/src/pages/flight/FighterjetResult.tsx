import { useLocation, useNavigate } from "react-router-dom";

type FighterJetData = {
  jetModel: string;
  hours: number;
  mission: string;
  payload: number;
  altitude: number;
  speed: number;
};

export default function FighterJetResult() {
  const navigate = useNavigate();
  const location = useLocation();

  const data = location.state as FighterJetData;

  // 🔥 Fuel burn rate (kg/hour) approx values
  const jetFuelMap: Record<string, number> = {
    "F-16 Fighting Falcon": 3200,
    "F-22 Raptor": 5000,
    "F-35 Lightning II": 5500,
    "SU-57": 6000,
    "Rafale": 3500,
    "Eurofighter Typhoon": 4000,
    "J-20 Mighty Dragon": 6000,
    "MiG-29": 3300,
    "MiG-35": 3500,
    "Tejas LCA": 2500,
    "F/A-18 Super Hornet": 4500,
    "Mirage 2000": 3000,
    "Gripen E": 2700,
    "SU-30MKI": 7000,
    "F-15 Eagle": 6000,
  };

  const baseFuelRate = jetFuelMap[data.jetModel] || 4000;

  // 🔥 Mission multiplier
  const missionMultiplier: Record<string, number> = {
    Training: 1,
    Combat: 1.5,
    Patrol: 1.2,
    Reconnaissance: 1.1,
    "Air Superiority": 1.4,
    "Ground Attack": 1.6,
    Interception: 1.3,
    Surveillance: 1.1,
  };

  const missionFactor = missionMultiplier[data.mission] || 1;

  // 🔥 Calculations
  const fuelUsed = baseFuelRate * data.hours * missionFactor;
  const totalCO2 = fuelUsed * 3.16; // 1kg fuel = 3.16 kg CO2

  // 🌍 Environmental equivalents
  const treesNeeded = totalCO2 / 21;
  const carKm = totalCO2 / 0.12;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10 flex flex-col items-center">

      {/* Back */}
      <div className="w-full max-w-5xl">
        <button
          onClick={() => navigate(-1)}
          className="text-green-400 hover:text-green-300 mb-6"
        >
          ← Back
        </button>
      </div>

      {/* Heading */}
      <h1 className="text-5xl font-bold text-green-400 mb-10 text-center">
        Fighter Jet Carbon Analysis
      </h1>

      {/* Main Card */}
      <div className="w-full max-w-5xl bg-[#0a0a0a] border border-green-900 rounded-2xl p-10 space-y-10 shadow-[0_0_40px_rgba(34,197,94,0.15)]">

        {/* 🔥 Total Emission */}
        <div className="text-center">
          <p className="text-gray-400 text-lg">Total CO₂ Emission</p>
          <h2 className="text-5xl font-bold text-green-400 mt-3">
            {totalCO2.toFixed(0)} kg
          </h2>
        </div>

        {/* Divider */}
        <div className="border-t border-green-900"></div>

        {/* 📊 Key Metrics */}
        <div className="grid md:grid-cols-3 gap-6 text-center">

          <div className="p-6 bg-black border border-green-900 rounded-xl">
            <p className="text-gray-400">Flight Hours</p>
            <h3 className="text-2xl font-semibold text-white mt-2">
              {data.hours} hrs
            </h3>
          </div>

          <div className="p-6 bg-black border border-green-900 rounded-xl">
            <p className="text-gray-400">Fuel Used</p>
            <h3 className="text-2xl font-semibold text-green-400 mt-2">
              {fuelUsed.toFixed(0)} kg
            </h3>
          </div>

          <div className="p-6 bg-black border border-green-900 rounded-xl">
            <p className="text-gray-400">Mission Type</p>
            <h3 className="text-2xl font-semibold text-white mt-2">
              {data.mission}
            </h3>
          </div>

        </div>

        {/* 🌍 Environmental Impact */}
        <div className="grid md:grid-cols-2 gap-6">

          <div className="p-6 bg-black border border-green-900 rounded-xl text-center">
            <p className="text-gray-400">Trees Needed</p>
            <h3 className="text-3xl text-green-400 font-bold mt-2">
              {treesNeeded.toFixed(0)} 🌳
            </h3>
          </div>

          <div className="p-6 bg-black border border-green-900 rounded-xl text-center">
            <p className="text-gray-400">Equivalent Car Travel</p>
            <h3 className="text-3xl text-white font-bold mt-2">
              {carKm.toFixed(0)} km 🚗
            </h3>
          </div>

        </div>

        {/* 📌 Jet Info */}
        <div className="p-6 bg-black border border-green-900 rounded-xl text-center">
          <p className="text-gray-400">Aircraft</p>
          <h3 className="text-xl font-semibold mt-2">
            {data.jetModel}
          </h3>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">

          <button
            onClick={() => navigate("/")}
            className="w-full bg-green-500 text-black py-4 rounded-xl font-semibold hover:bg-green-400 transition"
          >
            New Calculation
          </button>

          <button
            onClick={() => window.print()}
            className="w-full border border-green-500 text-green-400 py-4 rounded-xl hover:bg-green-500 hover:text-black transition"
          >
            Download Report
          </button>

        </div>
      </div>
    </div>
  );
}


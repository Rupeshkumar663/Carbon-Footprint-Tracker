import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FighterJetPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    jetModel: "",
    hours: "",
    mission: "",
    payload: "",
    altitude: "",
    speed: "",
  });

  // 🔥 Extended Fighter Jet List
  const fighterJets = [
    "F-16 Fighting Falcon",
    "F-22 Raptor",
    "F-35 Lightning II",
    "SU-57",
    "Rafale",
    "Eurofighter Typhoon",
    "J-20 Mighty Dragon",
    "MiG-29",
    "MiG-35",
    "Tejas LCA",
    "F/A-18 Super Hornet",
    "Mirage 2000",
    "Gripen E",
    "SU-30MKI",
    "F-15 Eagle"
  ];

  // 🔥 All Mission Types
  const missionTypes = [
    "Training",
    "Combat",
    "Patrol",
    "Reconnaissance",
    "Air Superiority",
    "Ground Attack",
    "Interception",
    "Surveillance"
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0a0a] to-black text-white flex items-center justify-center px-4">

      <div className="w-full max-w-4xl bg-[#0d0d0d] border border-green-500/10 rounded-3xl shadow-[0_0_40px_rgba(34,197,94,0.15)] p-10">

        <button onClick={() => navigate("/")} className="text-green-400 mb-4">
          ← Back
        </button>

        <h1 className="text-3xl text-green-400 text-center mb-8 font-bold">
          FIGHTER JET INPUT
        </h1>

        <div className="grid gap-6">

          {/* Jet Model */}
          <select name="jetModel" onChange={handleChange} className="input">
            <option value="">Select Fighter Jet</option>
            {fighterJets.map((jet) => (
              <option key={jet}>{jet}</option>
            ))}
          </select>

          {/* Flight Hours */}
          <input
            type="number"
            name="hours"
            placeholder="Flight Hours (e.g. 1.5)"
            onChange={handleChange}
            className="input"
          />

          {/* Mission Type */}
          <select name="mission" onChange={handleChange} className="input">
            <option value="">Mission Type</option>
            {missionTypes.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>

          {/* Payload */}
          <input
            type="number"
            name="payload"
            placeholder="Payload Weight (kg)"
            onChange={handleChange}
            className="input"
          />

          {/* Altitude */}
          <input
            type="number"
            name="altitude"
            placeholder="Flight Altitude (feet)"
            onChange={handleChange}
            className="input"
          />

          {/* Speed */}
          <input
            type="number"
            name="speed"
            placeholder="Average Speed (km/h)"
            onChange={handleChange}
            className="input"
          />

          {/* Button */}
          <button className="bg-green-500 text-black py-3 rounded-xl font-semibold hover:bg-green-400">
            CALCULATE
          </button>
        </div>
      </div>

      {/* SAME UI STYLE */}
      <style>{`
        .input {
          width: 100%;
          padding: 12px;
          background: black;
          border: 1px solid rgba(34,197,94,0.2);
          border-radius: 12px;
          outline: none;
          transition: 0.3s;
        }

        .input:focus {
          border-color: #22c55e;
          box-shadow: 0 0 10px rgba(34,197,94,0.3);
        }
      `}</style>
    </div>
  );
}
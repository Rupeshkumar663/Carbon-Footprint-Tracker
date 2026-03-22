import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import BackgroundScene from "../components/carbon/BackgroundScene";
import Card from "../components/carbon/Card";
import { CarbonResult } from "../types/carbonTypes";

export default function CarbonEmissionPage(): JSX.Element {
  const location = useLocation();
  const result = location.state as CarbonResult | null;

  if (!result) {
    return (
      <div className="text-white text-center mt-40 text-2xl">
        No Result Found
      </div>
    );
  }

  // ✅ Safe data
  const bestRoute = result.bestRoute;
  const fastestRoute = result.fastestRoute;

  const carbonEmission = result.carbon?.carbonEmission ?? 0;
  const greenScore = result.carbon?.greenScore ?? 0;

  const vehicle = result.vehicle;
  const environment = result.environment;

  const ecoStatus =
    greenScore > 70 ? "Eco Friendly 🌱" : "Not Eco Friendly";

  // 🚀 Navigation function
  const openNavigation = (): void => {
    if (!result?.end) return;

    const end = `${result.end.lat},${result.end.lon}`;

    const url = `https://www.google.com/maps/dir/?api=1&destination=${end}&travelmode=driving`;

    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#022c22] to-black text-white p-10 relative overflow-hidden">

      <BackgroundScene />

      <h1 className="text-4xl font-bold text-center mb-12 text-green-400">
        Carbon Emission Analysis
      </h1>

      {/* 🔥 CARBON CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto bg-gradient-to-br from-[#022c22]/80 to-black/70 
        border border-green-500/30 rounded-2xl p-12 text-center"
      >
        <h2 className="text-lg text-gray-400 mb-2">Carbon Emission</h2>

        <h1 className="text-6xl font-bold text-green-400">
          {carbonEmission.toFixed(2)}
        </h1>

        <p className="text-gray-400">kg CO₂</p>
      </motion.div>

      {/* 🔥 SCORE */}
      <div className="grid grid-cols-2 gap-6 mt-10 max-w-xl mx-auto">
        <Card title="Green Score" value={`${greenScore}/100`} />
        <Card title="Eco Status" value={ecoStatus} />
      </div>

      {/* 🔥 ROUTES */}
      <div className="grid grid-cols-2 gap-6 mt-10 max-w-xl mx-auto">
        <Card
          title="Best Route"
          value={`${bestRoute.distance.toFixed(1)} km | ${(bestRoute.duration / 60).toFixed(0)} min`}
        />

        <Card
          title="Fastest Route"
          value={`${fastestRoute.distance.toFixed(1)} km | ${(fastestRoute.duration / 60).toFixed(0)} min`}
        />
      </div>

      {/* 🚀 SEPARATE NAVIGATION CARD */}
      <div className="mt-10 max-w-xl mx-auto">
        <div
          onClick={openNavigation}
          className="cursor-pointer bg-green-600 hover:bg-green-700 transition p-5 rounded-xl text-center text-lg font-semibold shadow-lg"
        >
          🚀 Start Navigation (Best Eco Route)
        </div>
      </div>

      {/* 🔥 VEHICLE INFO */}
      <div className="grid grid-cols-4 gap-5 mt-12">
        <Card title="Vehicle" value={vehicle.vehicle_name} />
        <Card title="Mileage" value={`${vehicle.mileage} km/l`} />
        <Card title="Fuel Type" value={vehicle.fuel_type} />
        <Card title="Temperature" value={`${environment.temperature}°C`} />
        <Card title="Passengers" value={`${vehicle.passengers}`} />
        <Card title="Engine CC" value={`${vehicle.engine_cc}`} />
        <Card title="Vehicle Age" value={`${vehicle.vehicle_age} yrs`} />
      </div>

    </div>
  );
}
import { motion } from "framer-motion"
import BackgroundScene from "../components/carbon/BackgroundScene"
import Card from "../components/carbon/Card"
import { EmissionData } from "../types/carbonTypes"

const data:EmissionData={
  vehicle:"Car",
  distance:25,
  mileage:18,
  fuel_type:"Petrol",
  speed:35,
  traffic:"Medium",
  temp:32,
  road_type:"City",
  vehicle_age:4,
  vehicle_load:200,
  elevation:120,
  engine_cc:1200,
  emission:4.8,
  green_score:72
}

export default function CarbonEmissionPage() {
  const ecoStatus=data.green_score>70?"Eco Friendly":"Not Eco Friendly"

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#022c22] to-black text-white p-10 relative overflow-hidden">
      <BackgroundScene />

      {/* PAGE TITLE */}
      <h1 className="text-4xl font-bold text-center mb-12 text-green-400">Carbon Emission Analysis</h1>

      {/* CARBON RESULT CARD */}
      <motion.div
        initial={{ opacity:0, y:40 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:1 }}
        whileHover={{ scale:1.03 }}
        className="max-w-xl mx-auto bg-gradient-to-br from-[#022c22]/80 to-black/70 
        border border-green-500/30 rounded-2xl p-12 text-center 
        backdrop-blur-xl shadow-xl shadow-green-500/20"
      >
        <h2 className="text-lg text-gray-400 mb-2">Carbon Emission</h2>
        <motion.h1
          animate={{ scale:[1, 1.05, 1] }}
          transition={{ repeat:Infinity, duration:2 }}
          className="text-6xl font-bold text-green-400"
        >
          {data.emission}
        </motion.h1>
        <p className="text-gray-400">kg CO₂</p>
      </motion.div>

      {/* SCORE SECTION */}
      <div className="grid grid-cols-2 gap-6 mt-10 max-w-xl mx-auto">
        <Card title="Green Score" value={`${data.green_score}/100`} />
        <Card title="Eco Status" value={ecoStatus} />
      </div>
      {/* VEHICLE DATA GRID */}
      <div className="grid grid-cols-4 gap-5 mt-12">
        <Card title="Vehicle" value={data.vehicle} />
        <Card title="Distance" value={`${data.distance} km`} />
        <Card title="Mileage" value={data.mileage} />
        <Card title="Fuel Type" value={data.fuel_type} />
        <Card title="Speed" value={`${data.speed} km/h`} />
        <Card title="Traffic" value={data.traffic} />
        <Card title="Temperature" value={`${data.temp}°C`} />
        <Card title="Road Type" value={data.road_type} />
        <Card title="Vehicle Age" value={`${data.vehicle_age} yrs`} />
        <Card title="Vehicle Load" value={`${data.vehicle_load} kg`} />
        <Card title="Elevation" value={`${data.elevation} m`} />
        <Card title="Engine CC" value={data.engine_cc} />
      </div>
    </div>
  )
}
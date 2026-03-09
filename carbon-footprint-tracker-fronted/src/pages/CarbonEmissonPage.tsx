import { motion } from "framer-motion"
import { useLocation } from "react-router-dom"
import BackgroundScene from "../components/carbon/BackgroundScene"
import Card from "../components/carbon/Card"
import { CarbonResult } from "../types/carbonTypes"

export default function CarbonEmissionPage() {

  const location = useLocation()

  const result = location.state as CarbonResult

  if(!result){
    return (
      <div className="text-white text-center mt-40 text-2xl">
        No Result Found
      </div>
    )
  }

  const { route, carbon, vehicle, environment } = result

  const ecoStatus = carbon.greenScore > 70 ? "Eco Friendly" : "Not Eco Friendly"

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-[#022c22] to-black text-white p-10 relative overflow-hidden">

      <BackgroundScene />

      <h1 className="text-4xl font-bold text-center mb-12 text-green-400">
        Carbon Emission Analysis
      </h1>

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
          animate={{ scale:[1,1.05,1] }}
          transition={{ repeat:Infinity,duration:2 }}
          className="text-6xl font-bold text-green-400"
        >
          {carbon.carbonEmission.toFixed(2)}
        </motion.h1>

        <p className="text-gray-400">kg CO₂</p>

      </motion.div>


      <div className="grid grid-cols-2 gap-6 mt-10 max-w-xl mx-auto">

        <Card title="Green Score" value={`${carbon.greenScore}/100`} />

        <Card title="Eco Status" value={ecoStatus} />

      </div>


      <div className="grid grid-cols-4 gap-5 mt-12">

        <Card title="Vehicle" value={vehicle.vehicle_name} />

        <Card title="Distance" value={`${route.distance} km`} />

        <Card title="Mileage" value={`${vehicle.mileage} km/l`} />

        <Card title="Fuel Type" value={vehicle.fuel_type} />

        <Card title="Temperature" value={`${environment.temperature}°C`} />

        <Card title="Passengers" value={vehicle.passengers} />

        <Card title="Engine CC" value={vehicle.engine_cc} />

        <Card title="Vehicle Age" value={`${vehicle.vehicle_age} yrs`} />

      </div>

    </div>

  )
}
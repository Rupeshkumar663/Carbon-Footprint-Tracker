import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Card from "../components/carbon/Card";
import { CarbonResult } from "../types/carbonTypes";
import Navbar from "../components/carbon/Navbar";
import Footer from "../components/layout/Footer";

export default function CarbonEmissionPage():JSX.Element {
  const location=useLocation();
  const result=location.state as CarbonResult | null;

  if(!result){
    return (
      <div className="text-white text-center mt-40 text-2xl">No Result Found</div>);}
  const bestRoute=result.bestRoute;
  const fastestRoute=result.fastestRoute;
  const carbonEmission=result.carbon?.carbonEmission ?? 0;
  const greenScore=result.carbon?.greenScore ?? 0;
  const vehicle=result.vehicle;
  const environment=result.environment;
  const ecoStatus=greenScore>70?"Eco Friendly 🌱":"Not Eco Friendly";

  const openNavigation=():void=>{
    if(!result?.end) 
      return;
    const end=`${result.end.lat},${result.end.lon}`;
    const url=`https://www.google.com/maps/dir/?api=1&destination=${end}&travelmode=driving`;
    window.open(url,"_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-gray-900 text-white  relative overflow-hidden">
       <Navbar variant="carbonemissionpage"/>
      <h1 className="text-4xl font-bold text-center mb-12 text-green-400 mt-3">Carbon Emission Analysis</h1>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto  bg-black border border-green-200  p-12 text-center rounded-2xl backdrop-blur-md   shadow-md hover:shadow-green-200 transition-all duration-300">
        <h2 className="text-2xl text-green-600 mb-2">Carbon Emission</h2>
        <h1 className="text-6xl font-bold text-green-400">{carbonEmission.toFixed(2)}</h1>
        <p className="text-green-300 mt-1">kg CO₂</p>
      </motion.div>
      <div className="grid grid-cols-2 gap-6 mt-10 max-w-xl mx-auto text-bold">
        <Card  title="Green Score" value={`${greenScore}/100`} />
        <Card title="Eco Status" value={ecoStatus} />
      </div>
      <div className="grid grid-cols-2 gap-6 mt-10 max-w-xl mx-auto">
        <Card title="Best Route" value={`${bestRoute.distance.toFixed(1)} km | ${(bestRoute.duration / 60).toFixed(0)} min`}/>
        <Card title="Fastest Route" value={`${fastestRoute.distance.toFixed(1)} km | ${(fastestRoute.duration / 60).toFixed(0)} min`}/>
      </div>
      <div className="mt-10 max-w-xl mx-auto">
        <div onClick={openNavigation} className="p-6  rounded-2xl bg-black backdrop-blur-md border border-green-200 text-green-400
      text-center shadow-md hover:shadow-green-200 hover:text-black hover:bg-green-300 transition-all duration-300 text-2xl font-semibold"
        >Start Navigation (Best Eco Route)</div>
      </div>

      <div className="grid grid-cols-4 gap-5 mt-12">
        <Card title="Vehicle" value={vehicle.vehicle_name} />
        <Card title="Mileage" value={`${vehicle.mileage} km/l`} />
        <Card title="Fuel Type" value={vehicle.fuel_type} />
        <Card title="Temperature" value={`${environment.temperature}°C`} />
        <Card title="Passengers" value={`${vehicle.passengers}`} />
        <Card title="Engine CC" value={`${vehicle.engine_cc}`} />
        <Card title="Vehicle Age" value={`${vehicle.vehicle_age} yrs`} />
      </div>
        <Footer/>
    </div>
  );
}
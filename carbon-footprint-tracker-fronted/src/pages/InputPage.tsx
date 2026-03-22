import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { serverUrl } from "../App";
import { useState } from "react";
function FloatingOrb(){
  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh>
          <sphereGeometry args={[1.5, 64, 64]}/>
          <meshStandardMaterial color="#22c55e" emissive="#22c55e"/>
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={3}>
        <mesh position={[3, 1, -2]}>
          <torusGeometry args={[0.7, 0.2, 32, 100]} />
          <meshStandardMaterial color="#16a34a" emissive="#16a34a" />
        </mesh>
      </Float>
    </>
  );
}

export default function InputPage(){
  const navigate=useNavigate();
  const [loading, setLoading]=useState(false);
  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
   e.preventDefault();
   const formData=new FormData(e.currentTarget);
    const payload={
     start:String(formData.get("start") ?? ""),
     end:String(formData.get("end") ?? ""),
     vehicle_name:String(formData.get("vehicle_name") ?? ""),
     mileage:Number(formData.get("mileage") ?? 0),
     fuel_type:String(formData.get("fuel_type") ?? ""),
     engine_cc:Number(formData.get("engine_cc") ?? 0),
     vehicle_age:Number(formData.get("vehicle_age") ?? 0),
     passengers:Number(formData.get("passengers") ?? 1)
  };
  try {
    setLoading(true);
    const res=await axios.post(`${serverUrl}/api/carbon`,payload);
    setLoading(false);
    console.log("Result:",res.data);
    navigate("/result",{state:res.data});
  } catch(error:unknown){
    if(error instanceof Error){
      console.error(error.message);
    } else {
      console.error("Unknown error",error);
    }
  }
  finally {
      // ✅ ALWAYS RUNS
      setLoading(false);
    }
 };
return (
   <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center relative">
   <div className="absolute top-0 left-0 w-full h-full opacity-40">
     <Canvas dpr={[1,1.5]} camera={{ position:[0,0,5] }} performance={{ min:0.5 }}>
      <ambientLight intensity={0.7}/>
      <directionalLight position={[2,5,2]}/>
      <Stars radius={60} depth={50} count={2000} factor={4}/>
      <FloatingOrb/>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4}/>
    </Canvas>
  </div>
  <motion.div
    initial={{opacity:0,y:50}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.8}}
    className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-10 w-full max-w-xl shadow-2xl"
  >
   <h1 className="text-3xl font-semibold mb-2 text-center">Plan Your Carbon Emission</h1>
   <p className="text-gray-300 text-center mb-8">Let's calculate the most eco-friendly Journey</p>
   <form onSubmit={handleSubmit} className="space-y-4">
      <input name="start" placeholder="Starting Location"className="w-full p-3 rounded-lg bg-white/10 border border-white/20"/>
      <input name="end" placeholder="Destination"className="w-full p-3 rounded-lg bg-white/10 border border-white/20"/>
     <div className="grid grid-cols-2 gap-3">
      <input name="vehicle_name" placeholder="Vehicle Name" className="p-3 rounded-lg bg-white/10 border border-white/20"/>
      <input name="mileage" placeholder="Mileage km/l" className="p-3 rounded-lg bg-white/10 border border-white/20"/>
      <select name="fuel_type" className="p-3 rounded-lg bg-white/10 border border-white/20">
       <option value="">Fuel Type</option>
       <option value="petrol">Petrol</option>
       <option value="diesel">Diesel</option>
       <option value="electric">Electric</option>
       <option value="cng">CNG</option>
      </select>
      <input name="engine_cc" placeholder="Engine CC" className="p-3 rounded-lg bg-white/10 border border-white/20"/>
      <input name="vehicle_age" placeholder="Vehicle Age" className="p-3 rounded-lg bg-white/10 border border-white/20"/>
      <input name="passengers" placeholder="Passengers" className="p-3 rounded-lg bg-white/10 border border-white/20"/>
     </div>
     <button type="submit" className="w-full mt-5 bg-green-500 hover:bg-green-600 transition p-3 rounded-lg text-lg font-medium" disabled={loading}>{loading ? "Calculating...":"Carbon Emission"}</button>
    </form>
  </motion.div>
  </div>
  );
 }
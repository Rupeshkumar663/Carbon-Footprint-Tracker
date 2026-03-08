import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "../api/axios";
import { serverUrl } from "../App";
import { CarbonFormData } from "../types/carbonTypes";

function FloatingOrb() {
  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh>
          <sphereGeometry args={[1.5, 64, 64]} />
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" />
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

export default function InputPage() {

const [form,setForm]=useState<CarbonFormData>({
  start:"",
  end:"",
  vehicle_name:"",
  mileage:"",
  fuel_type:"",
  engine_cc:"",
  vehicle_age:"",
  passengers:""
});

const handleChange=(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
  setForm({ ...form,[e.target.name]:e.target.value });
};

const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  try {
    const res=await axios.post(`${serverUrl}/api/carbon`,form);
    console.log(res.data);
  } catch(error){
    console.error("server error",error);
  }
};

return (

<div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center relative">
  <div className="absolute top-0 left-0 w-full h-full opacity-40">
   <Canvas camera={{ position: [0, 0, 5] }}>
     <ambientLight intensity={0.7} />
     <directionalLight position={[2, 5, 2]} />
     <Stars radius={60} depth={50} count={2000} factor={4} />
     <FloatingOrb />
     <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
  </Canvas>
 </div>

<motion.div
initial={{ opacity: 0, y: 50 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}
className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-10 w-full max-w-xl shadow-2xl">
  <h1 className="text-3xl font-semibold mb-2 text-center">Plan Your Carbon Emission</h1>
  <p className="text-gray-300 text-center mb-8">Let's calculate the most eco-friendly Journey</p>

  <form onSubmit={handleSubmit} className="space-y-4">
   <input
     name="start"
     placeholder="Starting Location"
     onChange={handleChange}
     className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
   />
   <input
     name="end"
     placeholder="Destination"
     onChange={handleChange}
     className="w-full p-3 rounded-lg bg-white/10 border border-white/20"
  />

  <div className="grid grid-cols-2 gap-3">

   <input
    name="vehicle_name"
    placeholder="Vehicle Name"
    onChange={handleChange}
    className="p-3 rounded-lg bg-white/10 border border-white/20"
  />

   <input
    name="mileage"
    placeholder="Mileage km/l"
    onChange={handleChange}
    className="p-3 rounded-lg bg-white/10 border border-white/20"
   />

   <select className="p-3 rounded-lg bg-white/10 border border-white/20" name="fuel_type" onChange={handleChange}>
     <option>Fuel Type</option>
     <option>Petrol</option>
     <option>Diesel</option>
     <option>Electric</option>
   </select>

   <input
    name="engine_cc"
    placeholder="Engine CC"
    onChange={handleChange}
    className="p-3 rounded-lg bg-white/10 border border-white/20"
   />

   <input
    name="vehicle_age"
    placeholder="Vehicle Age"
    onChange={handleChange}
    className="p-3 rounded-lg bg-white/10 border border-white/20"
   />

   <input
    name="passengers"
    placeholder="Passengers"
    onChange={handleChange}
    className="p-3 rounded-lg bg-white/10 border border-white/20"
   />

  </div>

   <button type="submit" className="w-full mt-5 bg-green-500 hover:bg-green-600 transition p-3 rounded-lg text-lg font-medium">Carbon Emission</button>

  </form>
  </motion.div>
 </div>
 );
}
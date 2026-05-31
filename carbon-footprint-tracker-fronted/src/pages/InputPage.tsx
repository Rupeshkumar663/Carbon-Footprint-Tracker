import { Canvas } from "@react-three/fiber";
import {  OrbitControls, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { serverUrl } from "../App";
import { useState } from "react";
import Navbar from "../components/carbon/Navbar";
import Footer from "../components/layout/Footer";


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

      setLoading(false);
    }
 };
return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center relative overflow-hidden px-3">
    <div className="w-full fixed top-0 left-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
     <Navbar variant="inputpage"/>
  </div>
   
   <div className="absolute  left-0 w-full h-full opacity-40 ">
     <Canvas dpr={[1,1.5]} camera={{ position:[0,0,5] }} performance={{ min:0.5 }}>
      <ambientLight intensity={0.7}/>
      <directionalLight position={[2,5,2]}/>
      <Stars radius={50} depth={40} count={500} factor={2}/>
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false}/>
    </Canvas>
  </div>
  <motion.div
    initial={{opacity:0,y:50}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.8}}
    className="relative backdrop-blur-xl bg-green-800/10 border border-white/20 rounded-2xl p-4 sm:p-6 md:p-8 w-full max-w-xl shadow-none mt-24 md:mt-32 mb-10"
  >
   <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 text-center text-green-300">Plan Your Carbon Emission</h1>
   <p className="text-center mb-6 text-sm sm:text-base text-green-300">Let's calculate the most eco-friendly Journey</p>
   <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
      <input name="start" placeholder="Starting Location"className="w-full py-2.5 px-3 rounded-lg bg-green-200/20 border border-green-400"/>
      <input name="end" placeholder="Destination"className="w-full py-2.5 px-3 rounded-lg bg-green-200/20 border border-green-400"/>
     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
      <input name="vehicle_name" placeholder="Vehicle Name" className="py-2.5 px-3 rounded-lg bg-green-200/20 border border-green-400"/>
      <input type="number" min="1" name="mileage" placeholder="Mileage km/l" className="py-2.5 px-3 rounded-lg bg-green-200/20 border border-green-400"/>
      <select name="fuel_type" className="py-2.5 px-3 rounded-lg bg-green-200/20 border border-green-400">
       <option value="">Fuel Type</option>
       <option value="petrol">Petrol</option>
       <option value="diesel">Diesel</option>
       <option value="electric">Electric</option>
       <option value="cng">CNG</option>
      </select>
      <input type="number" min="50" name="engine_cc" placeholder="Engine CC" className="py-2.5 px-3 rounded-lg bg-green-200/20 border border-green-400"/>
      <input type="number" min="0" name="vehicle_age" placeholder="Vehicle Age" className="py-2.5 px-3 rounded-lg bg-green-200/20 border border-green-400"/>
      <input type="number" min="1" name="passengers" placeholder="Passengers" className="py-2.5 px-3 rounded-lg bg-green-200/20 border border-green-400"/>
     </div>
     <button type="submit" className="w-full py-2.5 border bg-green-300 border-green-400 text-green-950 rounded-xl font-medium hover:bg-green-400 hover:text-black disabled:opacity-60 disabled:cursor-not-allowed transition" disabled={loading}>{loading ? "Calculating...":"Carbon Emission"}</button>
    </form>
  </motion.div>
      <div className="relative z-10 w-full mt-6">
      <Footer />
    </div>
  </div>
  );
 }
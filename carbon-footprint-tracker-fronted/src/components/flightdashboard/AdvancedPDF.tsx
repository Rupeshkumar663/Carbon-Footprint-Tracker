import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import api from "../../api/axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const AdvancedPDF:React.FC=()=>{
  const [total,setTotal]=useState(0);
  const [score,setScore]=useState(0);
  const pdfRef=useRef<HTMLDivElement>(null);

  const { userData }=useSelector((state:RootState)=>state.auth);
  const fetchData=async()=>{
    try {
      const res=await api.get("/api/flight/gettotalco2");
      const data=res.data?.data || res.data;
      setTotal(Number(data?.totalCO2 || 0));
      setScore(Number(data?.ecoScore || 0));
    } catch(error){
      console.log("PDF fetch error:",error);
    }
  };

  useEffect(()=>{
    fetchData();
  },[]);

  const getBadge=()=>{
    if(score>=85) 
      return "🌍 Green Hero";
    if(score>=60) 
      return "🌱 Eco Friendly";
    if(score>=40) 
      return "⚠️ Moderate";
    return "🚫 High Impact";
  };

  const getSuggestion=()=>{
    if(score>=85)
       return "Excellent performance. Maintain eco-friendly habits.";
    if(score>=60) 
      return "Good performance. Try reducing premium class flights.";
    if(score>=40) 
      return "Moderate emissions. Consider fewer or direct flights.";
    return "High emissions. Consider alternatives like trains or offsets.";
  };

  const downloadPDF=async()=>{
    try {
      if(!pdfRef.current)
         return;
      const canvas=await html2canvas(pdfRef.current, {scale:2,backgroundColor:"#ffffff"});
      const imgData=canvas.toDataURL("image/png");
      const pdf=new jsPDF("p","mm","a4");
      pdf.addImage(imgData,"PNG",10,10,190,0);
      pdf.save("carbon-report.pdf");
    } catch(error){
      console.log("PDF error:",error);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity:0,y:10 }}
        animate={{ opacity:1,y:0 }}
        className="w-full max-w-3xl mx-auto p-6 sm:p-25 rounded-2xl bg-black border border-white/10 text-center shadow-lg">
        <p className="text-green-400 font-semibold mb-4">Generate Carbon Report</p>
        <button onClick={downloadPDF} className="px-6 py-2 rounded-lg bg-green-400 hover:bg-green-500 text-black font-semibold">Download PDF</button>
      </motion.div>
      <div
        ref={pdfRef}
        style={{
          position:"absolute",
          left:"-9999px",
          top:0,
          width:"600px",
          background:"#ffffff",
          color:"#000",
          padding:"30px",
          fontFamily:"Arial",
        }}
      >
        <div style={{ textAlign:"center",marginBottom:"20px" }}>
          <h1 style={{ fontSize:"24px" }}>🌍 Carbon Emission Report</h1>
          <p style={{ fontSize:"12px",color:"gray" }}>Generated on {new Date().toLocaleDateString()}</p>
        </div>

        <div style={{ marginBottom:"20px" }}>
          <h3>User Information</h3>
          <p><strong>Name:</strong> {userData?.name || "User"}</p>
        </div>
        <div style={{ marginBottom:"20px"}}>
          <h3>Emission Summary</h3>
          <p><strong>Total CO₂:</strong>{total} kg</p>
          <p><strong>Eco Score:</strong>{score}%</p>
          <p><strong>Badge:</strong>{getBadge()}</p>
        </div>

        <div style={{ marginBottom:"20px"}}>
          <h3>Analysis</h3>
          <p>{getSuggestion()}</p>
        </div>
        <hr />
        <p style={{ fontSize:"10px",marginTop:"10px",color:"gray"}}>
          This report is generated based on your flight carbon data.
        </p>
      </div>
    </>
  );
};

export default AdvancedPDF;
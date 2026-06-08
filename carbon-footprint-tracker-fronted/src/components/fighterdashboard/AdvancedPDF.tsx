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
      const res=await api.get("/api/fighter/fighterjet");
      const data=res.data?.data || res.data;
      setTotal(Number(data?.totalCO2 || 0));
      setScore(Number(data?.ecoScore || 0));
    } catch(error){
      console.log("PDF fetch error:",error);
    }
  };

    useEffect(()=>{
      const loadData=async()=>{
       await fetchData();
    };
     loadData();
    },[]);

  const getBadge=()=>{
    if(score>=85) 
      return " Green Hero";
    if(score>=60) 
      return " Eco Friendly";
    if(score>=40) 
      return " Moderate";
    return "High Impact";
  };

   const getSuggestion=()=>{
   if(score>=85)
     return "Excellent efficiency. Current fighter jet operations show optimized carbon performance.";
   if(score>=60)
     return "Good efficiency. Consider reducing mission duration and optimizing fuel usage.";
   if(score>=40)
    return "Moderate emissions detected. Review mission planning and operational efficiency.";
   return "High carbon impact detected. Consider fuel optimization and mission efficiency improvements.";
 };

  const downloadPDF=async()=>{
    try {
      if(!pdfRef.current)
         return;
      const canvas=await html2canvas(pdfRef.current, {scale:2,backgroundColor:"#ffffff"});
      const imgData=canvas.toDataURL("image/png");
      const pdf=new jsPDF("p","mm","a4");
      const imgWidth=190;
      const imgHeight=(canvas.height*imgWidth)/canvas.width;
      pdf.addImage(imgData,"PNG",10,10,imgWidth,imgHeight);
      pdf.save("fighter-jet-carbon-report.pdf");
    } catch(error){
      console.log("PDF error:",error);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity:0,y:10 }}
        animate={{ opacity:1,y:0 }}
        className="w-full max-w-3xl mx-auto p-6 sm:p-10 rounded-2xl bg-black border border-white/10 text-center shadow-lg">
        <p className="text-green-400 font-semibold mb-4">Generate Carbon Report</p>
        <button onClick={downloadPDF} className="px-6 py-3 rounded-xl bg-green-400 hover:bg-green-500 text-black font-semibold transition-all duration-300 hover:scale-105">Download PDF</button>
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
          <h1 style={{ fontSize:"24px" }}>Fighter Jet Carbon Emission Report</h1>
          <p style={{ fontSize:"12px",color:"gray" }}>Generated on {new Date().toLocaleDateString()}</p>
        </div>

        <div style={{ marginBottom:"20px" }}>
          <h3>User Information</h3>
          <p><strong>Name:</strong> {userData?.name || "User"}</p>
          <p><strong>Report Type:</strong> Fighter Jet Sustainability Report</p>
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
          This report is generated based on your fighter jet carbon data.
        </p>
      </div>
    </>
  );
};

export default AdvancedPDF;
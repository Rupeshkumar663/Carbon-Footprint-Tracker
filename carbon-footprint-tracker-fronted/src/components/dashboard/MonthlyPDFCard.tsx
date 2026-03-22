import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import api from "../../api/axios";
import { serverUrl } from "../../App";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const CarbonReportCard:React.FC=()=>{
  const [total,setTotal]=useState(0);
  const [score,setScore]=useState(0);
  const [name,setName]=useState("");
  const pdfRef=useRef<HTMLDivElement>(null);
  const fetchData=async()=>{
    try {
      const res=await api.get(`${serverUrl}/api/carbon`);
      const records=res.data.data || [];
      let sum=0;
      records.forEach((item:any)=>{sum +=item.carbonEmission || 0});
      const latest=records[0];
      setTotal(Math.round(sum));
      setScore(latest?.greenScore || 0);
      setName(latest?.userId?.name || "User");
    } catch(error){
      console.log(error);
    }
  };
  useEffect(()=>{
    fetchData();
  },[]);
  const getBadge=()=>{
    if(score>=80) return "🌍 Green Hero";
    if(score>=60) return "🌱 Eco Friendly";
    if(score>=30) return "⚠️ Moderate";
    return "🚫 Polluter";
  };
  const downloadPDF=async()=>{
    if(!pdfRef.current) 
      return;

    const canvas=await html2canvas(pdfRef.current,{scale:2,backgroundColor:"#ffffff"});
    const imgData=canvas.toDataURL("image/png");
    const pdf=new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 180, 0);
    pdf.save("carbon-report.pdf");
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-20 py-3 p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg text-center"
      >
        <button
          onClick={downloadPDF}
          className="w-full py-9 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-semibold">
          Download PDF of Report
        </button>
      </motion.div>
      <div
        ref={pdfRef}
        style={{
          position:"absolute",
          left:"-9999px",
          top:0,
          background:"#ffffff",
          color:"#000",
          padding:"30px",
          width:"400px",
          fontFamily:"Arial"
        }}
      >
        <h1 style={{ textAlign: "center",marginBottom:"20px" }}>Personal Carbon Report</h1>
        <p><strong>Name:</strong>{name}</p>
        <p><strong>Total Carbon:</strong> {total} kg CO₂</p>
        <p><strong>Eco Score:</strong>{score}%</p>
        <p><strong>Badge:</strong>{getBadge()}</p>
        <hr style={{ margin:"20px 0" }} />
        <p style={{ fontSize:"12px",color:"gray" }}>
          Generated on:{new Date().toLocaleDateString()}
        </p>
      </div>
    </>
  );
};
export default CarbonReportCard;
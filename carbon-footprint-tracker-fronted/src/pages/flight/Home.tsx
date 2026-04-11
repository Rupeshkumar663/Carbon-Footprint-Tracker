// src/pages/FlightHome.tsx

import { useState } from "react";
import Navbar from "../../components/flightcarbon/Navbar";
import FlightForm from "../../components/flightcarbon/Flightform";
import ResultCard from "../../components/flightcarbon/ResultCard";
import AIChat from "../../components/flightcarbon/AiChat";

export default function FlightHome() {
  const [result, setResult] = useState(null);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto mt-10">
        <FlightForm setResult={setResult} />
        <ResultCard data={result} />
        <AIChat />
      </div>
    </div>
  );
}
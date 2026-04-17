import EcoScore from "../../components/flightdashboard/EcoScore";
import EmissionBreakdown from "../../components/flightdashboard/EmissionBreakdown";
import TimelineChart from "../../components/flightdashboard/TimelineChart";
import GlobalImpact from "../../components/flightdashboard/GlobalImpact";
import AdvancedPDF from "../../components/flightdashboard/AdvancedPDF";
import TodayCarbonCard from "../../components/flightdashboard/TodayCarbonCard";
import TotalCarbonCard from "../../components/flightdashboard/TotalCarbonCard";
import Navbar from "../../components/carbon/Navbar";
import DailyBarChart from "../../components/flightdashboard/DailyBarChart";
import MonthlyLineChart from "../../components/flightdashboard/MonthlyLineChart";

export default function Dashboard(){

  
  const totalCO2 = 12000;
  const todayCO2 = 1800;
  const history = [12000, 9500, 14000, 8000];

  const ecoScore = Math.max(0, 100 - totalCO2 / 200);

  return (
    <div className=" min-h-screen bg-gradient-to-br bg-gray-900 text-white max-w-[1600px] mx-auto ">
      {/* NAVBAR */}
      <Navbar variant="flightdashboard" />

      

      {/* HERO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10  px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-5">
        {/* Total CO2 */}
        <div className="bg-black p-6 sm:p-8 rounded-2xl">
          <p className="text-green-400 font-semibold text-center text-sm sm:text-base">
            Total CO₂
          </p>

          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl text-center text-green-200 font-bold break-words">
            {totalCO2} kg
          </h2>
        </div>

        {/* EcoScore */}
        <div className="bg-black p-6 sm:p-8 rounded-2xl flex flex-col items-center justify-center">
          <p className="text-green-400 font-semibold text-center mb-6">
            EcoScore
          </p>

          <EcoScore score={ecoScore} />
        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10  px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-5">
        <TodayCarbonCard total={todayCO2} />
        <TotalCarbonCard total={totalCO2} />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10  px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-5">
        <MonthlyLineChart />
        <DailyBarChart />
      </div>

      {/* ANALYTICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10  px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-5">
        <div className="bg-black"><EmissionBreakdown total={totalCO2} /></div>
        <div className="bg-black"><TimelineChart history={history} /></div>
      </div>

      {/* EXTRA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10  px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-5">
        <GlobalImpact total={totalCO2} />
        <AdvancedPDF
          total={totalCO2}
          route="Delhi → Mumbai"
          score={ecoScore}
        />
      </div>

      <style>{`
        .glass {
          backdrop-filter: blur(12px);
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(34,197,94,0.2);
        }
      `}</style>
    </div>
  );
}
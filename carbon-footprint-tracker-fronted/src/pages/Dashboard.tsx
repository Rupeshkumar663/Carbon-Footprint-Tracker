import { Header } from "../components/dashboard/Header";
import graph from "../assets/graph.jpeg";
import EcoScore from "../components/dashboard/EcoScore";
import LineChartComponent from "../components/dashboard/LineChartComponent";
import BarChartComponent from "../components/dashboard/BarChartComponent";
import TodayCarbonCard from "../components/dashboard/TodayCarbonCard";
import TotalCarbonCard from "../components/dashboard/TotalCarbonCard";
import CarbonHistory from "../components/dashboard/CarbonHistory";
import MonthlyPDFCard from "../components/dashboard/MonthlyPDFCard";

function Dashboard() {
  return (
    <div className="relative w-full min-h-[160vh]">
      <img src={graph} alt="graph" className=" min-h-[160vh]  bg-cover bg-center "/>
      <div className="absolute top-0 left-0 w-full">
        <Header />
        <div className="flex gap-3 justify-center items-start ">
         <TotalCarbonCard/>
         <EcoScore />
          <TodayCarbonCard/>
        </div>
        <div className="flex gap-1 justify-center items-start mt-1">
          <CarbonHistory/>
          <MonthlyPDFCard/>
      </div>
        <div className="flex gap-1 justify-center items-start mt-2">
         <LineChartComponent />
         <BarChartComponent/>
      </div>
      </div>
    </div>
  );
}
export default Dashboard;

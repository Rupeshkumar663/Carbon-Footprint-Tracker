import EcoScore from "../components/dashboard/EcoScore";
import LineChartComponent from "../components/dashboard/LineChartComponent";
import BarChartComponent from "../components/dashboard/BarChartComponent";
import TodayCarbonCard from "../components/dashboard/TodayCarbonCard";
import TotalCarbonCard from "../components/dashboard/TotalCarbonCard";
import CarbonHistory from "../components/dashboard/CarbonHistory";
import MonthlyPDFCard from "../components/dashboard/MonthlyPDFCard";
import Navbar from "../components/carbon/Navbar";
import Footer from "../components/layout/Footer";

function Dashboard() {
  return (
    <div className="relative w-full h-[160vh]  min-h-screen bg-gradient-to-br bg-gray-900 text-white ">
      <div className="absolute top-0 left-0 w-full">
        <Navbar variant="dash"/>
        <div className="flex gap-3 justify-center items-start mt-3">
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
      <Footer/>
      </div>
    </div>
  );
}
export default Dashboard;

import StatCard from "../dashboard/StatCard";
import EmissionChart from "../dashboard/EmmisionChart";

export default function DashboardPage(){

 return(

 <div>

 <h1 className="text-4xl font-bold mb-10">
 Carbon Intelligence Dashboard
 </h1>

 <div className="grid md:grid-cols-4 gap-8 mb-12">

 <StatCard title="Total CO₂" value="24.5 kg"/>
 <StatCard title="Green Score" value="88%"/>
 <StatCard title="Routes" value="14"/>
 <StatCard title="Trees Covered" value="120 🌳"/>

 </div>

 <EmissionChart/>

 </div>

 );

}
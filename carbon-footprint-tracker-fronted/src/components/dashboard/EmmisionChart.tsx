import {
 LineChart,
 Line,
 XAxis,
 YAxis,
 Tooltip,
 ResponsiveContainer,
 CartesianGrid
} from "recharts";

const data = [
 { day: "Mon", emission: 4 },
 { day: "Tue", emission: 6 },
 { day: "Wed", emission: 3 },
 { day: "Thu", emission: 5 },
 { day: "Fri", emission: 2 }
];

export default function EmissionChart() {

 return (

  <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-xl">

   <h3 className="mb-6 text-lg text-slate-200">
    Weekly Emission Analytics
   </h3>

   <ResponsiveContainer width="100%" height={300}>

    <LineChart data={data}>

     <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />

     <XAxis dataKey="day" stroke="#94a3b8" />

     <YAxis stroke="#94a3b8" />

     <Tooltip />

     <Line
      dataKey="emission"
      stroke="#22c55e"
      strokeWidth={3}
      dot={{ r: 5 }}
     />

    </LineChart>

   </ResponsiveContainer>

  </div>

 );

}
import { PieChart,Pie,Cell,Tooltip,ResponsiveContainer,Legend,} from "recharts";
const COLORS=["#22c55e","#3b82f6","#f59e0b"];
export default function EmissionBreakdown({ total }:{ total:number}){
  const safeTotal=Math.max(0, Number(total) || 0);

  if(safeTotal === 0) {
    return (
      <div className="bg-black p-6 rounded-2xl text-center border border-white/10">
        <h3 className="text-green-400 font-semibold mb-2">Emission Breakdown</h3>
        <p className="text-gray-400 text-sm">No emission data</p>
      </div>
    );
  }

  const fuel=Math.round(safeTotal * 0.6);
  const operations=Math.round(safeTotal * 0.25);
  const other=safeTotal-fuel-operations;
  const data=[
    { name:"Fuel",value:Math.max(fuel,1)},
    { name:"Operations",value:Math.max(operations,1)},
    { name:"Other",value:Math.max(other, 1)},
  ];

  return (
    <div className="bg-black p-4 sm:p-6 rounded-2xl border border-white/10 w-full h-full">
      <h3 className="text-green-400 font-semibold mb-4 text-center sm:text-left">Emission Breakdown</h3>
      <div className="relative w-full h-[250px] sm:h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius="80%"
              innerRadius="55%"
              paddingAngle={4}
            >
              {data.map((_, i)=>(<Cell key={i} fill={COLORS[i % COLORS.length]} />))}
            </Pie>

            <Tooltip
              formatter={(value: number) => `${value} kg`}
              contentStyle={{
                background:"#1e293b",
                border:"none",
                borderRadius:"8px",
                color:"#fff",
              }}
            />

            <Legend
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{ color:"#90EE90",fontSize:"12px" }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* CENTER TEXT */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-green-300 text-sm sm:text-base font-semibold"> {Math.round(safeTotal).toLocaleString()} kg</p>
        </div>
      </div>
    </div>
  );
}
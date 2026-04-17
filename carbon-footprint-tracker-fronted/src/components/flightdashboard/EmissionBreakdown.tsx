
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function EmissionBreakdown({ total }: { total: number }) {
  const data = [
    { name: "Fuel", value: total * 0.6 },
    { name: "Operations", value: total * 0.25 },
    { name: "Other", value: total * 0.15 },
  ];

  return (
    <div className="card bg-black">
      <h3 className="title">Emission Breakdown</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={100}>
            {data.map((_, i) => (
              <Cell key={i} fill="#22c55e" />
            ))}
          </Pie>
          <Tooltip/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}


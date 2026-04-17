
import {
  LineChart, Line, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

export default function TimelineChart({ history }: { history: number[] }) {
  const data = history.map((val, i) => ({
    day: `Day ${i + 1}`,
    value: val,
  }));

  return (
    <div className="card rounded-2xl">
      <h3 className="title">Emission Timeline</h3>
      <ResponsiveContainer width="100%" height={255}>
        <LineChart data={data}>
          <CartesianGrid stroke="#1f2937"/>
          <XAxis dataKey="day" stroke="#22c55e"/>
          <YAxis stroke="#22c55e"/>
          <Tooltip/>
          <Line dataKey="value" stroke="#22c55e" strokeWidth={3}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}


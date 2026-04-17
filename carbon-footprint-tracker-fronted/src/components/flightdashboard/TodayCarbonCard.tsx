export default function TodayCarbonCard({ total }:{total:number}) {
  return (
    <div className="card text-center rounded-xl h-[110px] bg-black">
      <p className="text-green-400 mt-2">Today Emission</p>
      <h2 className="text-4xl text-green-300 font-bold mt-2">{total} kg CO₂</h2>
    </div>
  );
}

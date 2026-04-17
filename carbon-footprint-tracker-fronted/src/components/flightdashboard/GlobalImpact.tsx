
export default function GlobalImpact({ total }: { total: number }) {
  const globalDaily = 1000000000;
  const percent = ((total / globalDaily) * 100).toFixed(6);

  return (
    <div className="card text-center bg-black ">
      <h3 className="title">Global Impact</h3>
      <p className="text-gray-400">Contribution</p>
      <h2 className="text-2xl text-green-400 font-bold mt-2">
        {percent}%
      </h2>
      <p className="text-gray-500 text-sm mt-2">
        of global daily emissions 🌍
      </p>
      
    </div>
  );
}

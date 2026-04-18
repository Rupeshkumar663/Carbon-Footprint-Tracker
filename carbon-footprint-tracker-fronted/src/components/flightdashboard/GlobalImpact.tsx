export default function GlobalImpact({total,impact}:{
  total:number
  impact:{
    trees:number;
    jetFuel:number;
    flightHours:number;
    earthTrips:number;
  };
}){

  const globalDaily=110_000_000_000;
  const percent=((total/globalDaily)*100).toFixed(6);

  return (
    <div className="bg-black p-6 rounded-2xl text-center border border-white/10">
      <h3 className="text-green-400 font-semibold mb-2">Global Impact</h3>
      <p className="text-gray-400 text-sm">Your Contribution</p>
      <h2 className="text-2xl text-green-400 font-bold mt-1">{percent}%</h2>
      <p className="text-gray-500 text-xs mb-4">of global daily emissions</p>
      <div className="grid grid-cols-2 gap-3 text-sm mt-3">
        <div className="bg-white/5 p-2 rounded">🌳 {impact.trees}Trees</div>
        <div className="bg-white/5 p-2 rounded">⛽ {impact.jetFuel} L Fuel</div>
        <div className="bg-white/5 p-2 rounded">✈️ {impact.flightHours} hrs</div>
        <div className="bg-white/5 p-2 rounded">🌍{impact.earthTrips} Earth trips</div>
      </div>
    </div>
  );
}
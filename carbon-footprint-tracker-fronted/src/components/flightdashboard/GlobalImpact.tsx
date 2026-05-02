export default function GlobalImpact({total,impact}:{
  total:number;
  impact:{
    trees:number;
    jetFuel:number;
    flightHours:number;
    earthTrips:number;
  };
}){
  const globalDaily=110_000_000_000;
  const percent=(total/globalDaily)*100;
  const formattedPercent=percent<0.0001 ? "<0.0001%": `${percent.toFixed(4)}%`;
  return (
    <div className="w-full bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 text-center shadow-lg">
      <h3 className="text-green-400 font-semibold text-sm sm:text-base mb-1">Global Impact</h3>
      <p className="text-gray-400 text-xs sm:text-sm">Your Contribution</p>
      <h2 className="text-2xl sm:text-3xl text-green-400 font-bold mt-2">{formattedPercent}</h2>
      <p className="text-gray-500 text-xs mb-4">of global daily emissions</p>
      <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm mt-3">
        <div className="bg-white/5 p-3 rounded-xl">🌳 {impact.trees.toLocaleString()}
          <div className="text-gray-400 text-xs">Trees</div>
        </div>
        <div className="bg-white/5 p-3 rounded-xl">⛽ {impact.jetFuel.toLocaleString()}
          <div className="text-gray-400 text-xs">Fuel (L)</div>
        </div>
        <div className="bg-white/5 p-3 rounded-xl">✈️ {impact.flightHours}
          <div className="text-gray-400 text-xs">Hours</div>
        </div>
        <div className="bg-white/5 p-3 rounded-xl">🌍 {impact.earthTrips}
          <div className="text-gray-400 text-xs">Earth Trips</div>
        </div>
      </div>
    </div>
  );
}
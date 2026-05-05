export default function GlobalImpact({ total,impact,}:{
  total:number;
  impact:{
    trees:number;
    jetFuel:number;
    fighterHours:number;
    earthTrips:number;
  };
}) {

  const globalDaily=110_000_000_000;
  const safeTotal=Math.max(0, Number(total) || 0);
  const safeImpact={
    trees:impact?.trees ?? 0,
    jetFuel:impact?.jetFuel ?? 0,
    fighterHours:impact?.fighterHours ?? 0,
    earthTrips:impact?.earthTrips ?? 0,
  };
  const percent=globalDaily>0?(safeTotal/globalDaily)*100:0;
  const formattedPercent=!isFinite(percent) || percent < 0.0001 ? "<0.0001%"
      :`${Math.min(percent, 100).toFixed(4)}%`;

  return (
    <div className="w-full bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 text-center shadow-lg">
      <h3 className="text-green-400 font-semibold mb-1">Global Impact</h3>
      <p className="text-gray-400 text-sm">Your Contribution</p>
      <h2 className="text-3xl text-green-400 font-bold mt-2">{formattedPercent}</h2>
      <p className="text-gray-500 text-xs mb-4">of global daily emissions</p>
      <div className="grid grid-cols-2 gap-3 mt-3">
        
        <div className="bg-white/5 p-3 rounded-xl">
         🌳 {safeImpact.trees.toLocaleString()}
          <div className="text-gray-400 text-xs">Trees</div>
        </div>

        <div className="bg-white/5 p-3 rounded-xl">
          ⛽ {safeImpact.jetFuel.toLocaleString()}
          <div className="text-gray-400 text-xs">Fuel (L)</div>
        </div>

        <div className="bg-white/5 p-3 rounded-xl">
          ✈️ {safeImpact.fighterHours.toLocaleString()}
          <div className="text-gray-400 text-xs">Fighter Hours</div>
        </div>

        <div className="bg-white/5 p-3 rounded-xl">
          🌍 {safeImpact.earthTrips.toLocaleString()}
          <div className="text-gray-400 text-xs">Earth Trips</div>
        </div>

      </div>
    </div>
  );
}
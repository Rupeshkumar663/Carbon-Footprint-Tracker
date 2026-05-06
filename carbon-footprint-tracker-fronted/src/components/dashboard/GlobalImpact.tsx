export default function GlobalImpact({total,impact,}:{
  total:number;
  impact:{
    trees:number;
    vehicleDuration:number;
    earthTrips:number;
  };
}) {

  const globalDaily=36_000_000_000;
  const safeTotal=Math.max(0,Number(total) || 0);
  const safeImpact={
    trees:impact?.trees ?? 0,
    vehicleDuration:impact?.vehicleDuration ?? 0,
    earthTrips:impact?.earthTrips ?? 0,
  };
  const percent=globalDaily>0?(safeTotal/globalDaily)*100:0;
  const formattedPercent=!isFinite(percent) ||percent<0.0001?"<0.0001%": `${Math.min(percent,100).toFixed(4)}%`;

  return (

    <div className=" w-full bg-black backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 shadow-lg">
      <div className="mb-5">
        <h3 className=" text-green-400 font-semibold text-base">Global Impact</h3>
        <p className=" text-green-300 text-xs mt-1 ">Your vehicle emission footprint</p>
      </div>
    
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl text-green-300 font-bold">{formattedPercent}</h2>
        <p className=" text-green-300 text-xs mt-2">of estimated global daily CO₂ emissions</p>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-6">
        <div className=" bg-white/5 p-4 rounded-xl border border-white/5">
          <div className=" text-green-300 text-lg font-semibold ">{safeImpact.trees.toLocaleString()}</div>
          <div className=" text-green-200 text-xs mt-1 ">Trees Offset</div>
        </div>
        <div className=" bg-white/5 p-4 rounded-xl border border-white/5">
          <div className=" text-green-300 text-lg font-semibold">{Number((safeImpact.vehicleDuration / 60).toFixed(1))}</div>
          <div className=" text-green-200 text-xs mt-1"> Drive Duration (hours)</div>
        </div>
        <div className=" bg-white/5 p-4 rounded-xl border border-white/5 col-span-2">
          <div className=" text-green-300 text-lg font-semibold ">{safeImpact.earthTrips.toLocaleString()}</div>
          <div className=" text-gray-400 text-xs mt-1"> Earth Distance Ratio</div>
        </div>
      </div>
    </div>
  );
}
export default function TodayCarbonCard({ total }: { total: number }) {
  return (
    <div className="w-full bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 text-center shadow-lg hover:scale-[1.02] transition">
      <p className="text-green-400 text-sm sm:text-base font-semibold mt-7">Today Emission</p>
      <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-green-300 break-words">{total}<span className="text-5xl  text-green-300"> kg CO₂</span></h2>
      {total===0 && (
        <p className="text-xs text-gray-500 mt-2">No emissions today 🌱</p>
      )}
    </div>
  );
}
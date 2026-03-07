export default function StatCard({ title, value }: any) {

 return (

  <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/10 hover:border-emerald-400 transition hover:scale-[1.02]">

   <p className="text-slate-400 text-sm">
    {title}
   </p>

   <h2 className="text-3xl font-bold mt-2 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
    {value}
   </h2>

  </div>

 );

}
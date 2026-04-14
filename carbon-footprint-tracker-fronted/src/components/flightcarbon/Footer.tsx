export default function Footer() {
  return (
    <footer className="relative mt-24 bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-green-400 via-emerald-500 to-lime-400" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-500/10 rounded-full blur-3xl opacity-40" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl opacity-40" />
      <div className="relative max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="space-y-5">
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">CarbonTrack</h2>
            <p className="text-gray-400 text-sm leading-relaxed">Advanced carbon intelligence platform helping you track,analyze and reduce your environmental impact with precision.</p>
            <p className="text-xs text-gray-500">Built for a sustainable future.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-6 text-white tracking-wide">Platform</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              {["Dashboard", "Flight Tracking", "Emission Analysis", "Eco Insights"].map((item, i) => (
                <li
                  key={i}
                  className="hover:text-green-400 transition duration-300 cursor-pointer relative group"
                >
                  {item}
                  <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-green-400 transition-all duration-300 group-hover:w-full" />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-6 text-white tracking-wide">Company</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              {["About", "Privacy Policy", "Terms & Conditions", "Contact"].map((item, i) => (
                <li
                  key={i}
                  className="hover:text-green-400 transition duration-300 cursor-pointer relative group"
                >
                  {item}
                  <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-green-400 transition-all duration-300 group-hover:w-full" />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-6 text-white tracking-wide">Insights</h3>
            <div className="space-y-4 text-sm text-gray-400">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">✈️ Flights contribute significantly to global CO₂ emissions.</div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">⚡ Fighter jets can emit 10–20x more carbon than commercial flights.</div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">🌱 Tracking emissions helps build sustainable aviation systems.</div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} CarbonTrack. All rights reserved.</p>
          <p className="mt-3 md:mt-0">Designed with 💚 for Earth.</p>
        </div>
      </div>
    </footer>
  );
}
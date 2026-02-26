import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="relative mt-24 bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden">

      {/* Animated Gradient Top Border */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-green-400 via-emerald-500 to-lime-400 animate-pulse" />

      {/* Soft Background Glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-500/10 rounded-full blur-3xl opacity-40" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6 py-20">

        {/* Top Grid */}
        <div className="grid md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="space-y-5">
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              🌍 CarbonX
            </h2>

            <p className="text-gray-400 text-sm leading-relaxed">
              Advanced carbon intelligence platform helping you track,
              analyze and reduce your environmental impact with precision.
            </p>

            <div className="text-xs text-gray-500">
              Built for a sustainable future.
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold mb-6 text-white tracking-wide">
              Platform
            </h3>

            <ul className="space-y-4 text-sm text-gray-400">
              {["Dashboard", "Analytics", "Route Tracking", "Eco Insights"].map((item, i) => (
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

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-6 text-white tracking-wide">
              Company
            </h3>

            <ul className="space-y-4 text-sm text-gray-400">
              {["About", "Privacy Policy", "Terms", "Contact"].map((item, i) => (
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

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-6 text-white tracking-wide">
              Stay Updated
            </h3>

            <div className="bg-white/5 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-lg">
              <p className="text-gray-400 text-sm mb-4">
                Get eco tips & carbon insights directly in your inbox.
              </p>

              <div className="flex items-center bg-black/30 rounded-xl border border-white/10 focus-within:border-green-400 transition">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent flex-1 px-4 py-3 text-sm outline-none text-white placeholder-gray-500"
                />
                <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-105 transition-transform duration-300 px-5 py-3 rounded-xl text-sm font-semibold shadow-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">

          <p>
            © {new Date().getFullYear()} CarbonX. All rights reserved.
          </p>

          <p className="mt-3 md:mt-0">
            Designed with 💚 for Earth.
          </p>

        </div>
      </div>
    </footer>
  );
}
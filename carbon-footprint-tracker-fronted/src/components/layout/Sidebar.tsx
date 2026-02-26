import { NavLink } from "react-router-dom";
import { Home, BarChart3, Map, Leaf } from "lucide-react";

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
    { name: "Map", path: "/map", icon: Map },
    { name: "Eco Score", path: "/eco", icon: Leaf },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 h-screen bg-gradient-to-b from-slate-950 to-slate-900 border-r border-white/10 shadow-2xl">

      {/* Logo Section */}
      <div className="px-6 py-8 border-b border-white/10">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          🌍 CarbonX
        </h2>
        <p className="text-xs text-gray-500 mt-1 tracking-wide">
          Carbon Intelligence
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-3">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-green-500/10 text-green-400"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active Glow Bar */}
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-green-400 to-emerald-500 rounded-r-full" />
                  )}

                  <Icon
                    size={18}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />

                  <span className="text-sm font-medium tracking-wide">
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="px-6 py-6 border-t border-white/10 text-xs text-gray-500">
        <div className="bg-white/5 rounded-xl p-4 backdrop-blur-md border border-white/10">
          <p className="text-gray-400 text-[11px] leading-relaxed">
            Track smarter. Live greener. 🌱
          </p>
        </div>
      </div>
    </div>
  );
}
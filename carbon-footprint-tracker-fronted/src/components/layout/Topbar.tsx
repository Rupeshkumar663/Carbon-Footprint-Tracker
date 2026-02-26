import { Search, Bell } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

export default function Topbar() {
  const [search, setSearch] = useState("");

  // ✅ Redux se userData lo
  const { userData } = useSelector((state: RootState) => state.auth);

  // ✅ Safe initials logic
  const initials = userData?.name
    ? userData.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">

      {/* Left Section */}
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-semibold tracking-wide text-white">
          Dashboard
        </h1>

        <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus-within:border-green-400 transition">
          <Search size={16} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search routes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm text-white placeholder-gray-500 w-52"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        {/* Notification */}
        <div className="relative cursor-pointer">
          <Bell
            className="text-gray-300 hover:text-green-400 transition"
            size={20}
          />
          <span className="absolute -top-2 -right-2 bg-green-500 text-[10px] px-1.5 py-0.5 rounded-full">
            3
          </span>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-sm font-bold text-white">
            {initials}
          </div>
          <span className="hidden md:block text-sm text-gray-300 hover:text-green-400 transition">
            {userData?.name || "User"}
          </span>
        </div>

      </div>
    </div>
  );
}
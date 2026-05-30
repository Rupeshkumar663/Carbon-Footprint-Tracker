import {MapPin,ShieldCheck, Globe, Plane, Car} from "lucide-react";
import { Link } from "react-router-dom";
export default function Footer() {
  const currentYear=new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-[#050505] text-white border-t border-white/10">
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-green-400 via-emerald-500 to-cyan-500" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-[0_10px_30px_rgba(34,197,94,0.25)]">
                <Globe  className="text-black"  size={28} />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">CarbonTrack</h2>
                <p className="text-sm text-green-400 mt-1"> AI Sustainability Intelligence</p>
              </div>
            </div>

            <p className="mt-5 sm:mt-8 text-gray-400 leading-relaxed text-[15px] max-w-md">
             CarbonTrack provides real-time carbon emission tracking, sustainability insights, and environmental impact analytics for vehicles, commercial flights, and fighter jet operations.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] text-sm text-gray-300">
                <Car size={16} className="text-green-400" /> Vehicle Intelligence</div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] text-sm text-gray-300">
                <Plane size={16} className="text-cyan-400"/> Flight Analytics
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] text-sm text-gray-300">
                <ShieldCheck size={16} className="text-orange-400"/>Fighter Jet Emissions</div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6">Platform</h3>
            <ul className="space-y-5 text-gray-400 text-sm">
              <li>
                <Link to="/overviewdashboard" className="hover:text-green-400 transition"> Overview Dashboard</Link></li>
              <li> 
                <Link to="/about" className="hover:text-green-400 transition">About Platform</Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-green-400 transition">User Profile</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-5 text-gray-400 text-sm">
              <li>
                <Link to="/about" className="hover:text-green-400 transition">About Us</Link></li>
              <li>
                <Link to="" className="hover:text-green-400 transition">Privacy Policy</Link>
              </li>
              <li>
                <Link to="" className="hover:text-green-400 transition">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="" className="hover:text-green-400 transition">Contact Support</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6">System Status</h3>
            <div className="rounded-2xl border border-white/10 bg-[#0B0B0B] p-4 sm:p-6">
              <div className="space-y-4">
              <div className="flex items-center justify-between">
               <span className="text-gray-400 text-sm">Vehicle Analytics</span>
               <span className="text-green-400 text-sm font-medium">Active</span>
            </div>
            <div className="flex items-center justify-between">
             <span className="text-gray-400 text-sm">Flight Monitoring</span>
             <span className="text-cyan-400 text-sm font-medium">Live</span>
            </div>
            <div className="flex items-center justify-between">
             <span className="text-gray-400 text-sm">Fighter Jet Tracking</span>
             <span className="text-orange-400 text-sm font-medium">Operational</span>
            </div>
            <div className="flex items-center justify-between">
             <span className="text-gray-400 text-sm">AI Assistant</span>
             <span className="text-purple-400 text-sm font-medium">Online</span>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
           <div className="flex items-center gap-3 text-gray-400 text-sm">
            <Globe size={16} className="text-green-400" />Global Carbon Intelligence Platform</div>
           <div className="flex items-center gap-3 text-gray-400 text-sm">
           <MapPin size={16} className="text-orange-400" />India
           </div>
           <div className="flex items-center gap-3 text-gray-400 text-sm">
            <ShieldCheck size={16} className="text-cyan-400" />Enterprise Grade Security
           </div>
          </div>
         </div>
        </div>
      </div>
        <div className="mt-10 md:mt-20 pt-6 md:pt-8 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <p className="text-gray-500 text-sm text-center lg:text-left">
            © {currentYear} CarbonTrack.
            All rights reserved.
            Powered by AI-driven carbon intelligence and sustainability analytics.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-500">
            <Link to="" className="hover:text-green-400 transition">Privacy</Link>
            <Link to="" className="hover:text-green-400 transition">Terms</Link>
            <Link to="" className="hover:text-green-400 transition"> Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
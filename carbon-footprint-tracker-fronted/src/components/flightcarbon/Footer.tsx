import { useState } from "react";
import {Mail,MapPin, Phone,ArrowRight,ShieldCheck, Globe, Plane, Car,} from "lucide-react";
import { Link } from "react-router-dom";
export default function Footer() {
  const [email,setEmail]=useState("");
  const currentYear=new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-[#050505] text-white border-t border-white/10">
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-green-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full" />
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-green-400 via-emerald-500 to-cyan-500" />
      <div className="relative max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-[0_10px_30px_rgba(34,197,94,0.25)]">
                <Globe  className="text-black"  size={28} />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight">CarbonTrack</h2>
                <p className="text-sm text-green-400 mt-1"> AI Sustainability Intelligence</p>
              </div>
            </div>

            <p className="mt-8 text-gray-400 leading-relaxed text-[15px] max-w-md">
              CarbonTrack is an enterprise-grade sustainability
              intelligence platform designed to monitor,
              analyze,
              and optimize environmental impact across
              transportation,
              aviation,
              and defense ecosystems using AI-powered analytics.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/[0.03] text-sm text-gray-300">
                <Car size={16} className="text-green-400" /> Vehicle Intelligence</div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/[0.03] text-sm text-gray-300">
                <Plane size={16} className="text-cyan-400"/> Flight Analytics
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/[0.03] text-sm text-gray-300">
                <ShieldCheck size={16} className="text-orange-400"/> Defense AI</div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-8">Platform</h3>
            <ul className="space-y-5 text-gray-400 text-sm">
              <li>
                <Link to="/overviewdashboard" className="hover:text-green-400 transition"> Overview Dashboard</Link></li>
              <li> 
                <Link to="/about" className="hover:text-green-400 transition" > About Platform</Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-green-400 transition" >User Profile</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-8">Company</h3>
            <ul className="space-y-5 text-gray-400 text-sm">
              <li>
                <Link to="/about" className="hover:text-green-400 transition">About Us</Link></li>
              <li>
                <Link to="" className="hover:text-green-400 transition"> Privacy Policy</Link>
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
            <h3 className="text-lg font-semibold mb-8"> Stay Update
            </h3>
            <div className="rounded-[28px] border border-white/10 bg-[#0B0B0B] p-6">
              <p className="text-gray-400 text-sm leading-relaxed">
                Subscribe for sustainability insights,
                AI analytics updates,
                and platform improvements.
              </p>
              <div className="mt-6">
                <div className="flex items-center rounded-2xl border border-white/10 bg-black overflow-hidden focus-within:border-green-500/30 transition-all duration-300">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className="flex-1 bg-transparent px-5 py-4 outline-none text-sm text-white placeholder-gray-500"
                  />
                  <button
                    className="px-5 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-black font-semibold hover:brightness-110 transition-all duration-300"><ArrowRight size={18} /></button>
                </div>
              </div>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <Mail size={16}className="text-green-400" />supportcarbontrack.ai</div>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <Phone size={16} className="text-cyan-400"/>+91 93115 42075
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <MapPin size={16} className="text-orange-400"/>India
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <p className="text-gray-500 text-sm text-center lg:text-left">
            © {currentYear} CarbonTrack.
            All rights reserved.
            Built with AI-powered sustainability intelligence.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link to="" className="hover:text-green-400 transition">Privacy</Link>
            <Link to="" className="hover:text-green-400 transition">Terms</Link>
            <Link to="" className="hover:text-green-400 transition"> Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
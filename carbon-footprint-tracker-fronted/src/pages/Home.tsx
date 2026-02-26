import React from "react";
import MainLayout from "../components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { FaLeaf, FaRoute, FaChartLine } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>

      {/* ================= HERO SECTION ================= */}
      <section className="bg-black text-white py-28 px-6">
        <div className="max-w-6xl mx-auto text-center">

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Build a Greener Future with
            <span className="text-green-400"> Smart Route Tracking</span>
          </h1>

          <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">
            Monitor your travel emissions, analyze eco scores and choose
            sustainable alternatives with powerful real-time carbon insights.
          </p>

          <div className="mt-10 flex justify-center gap-6 flex-wrap">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-8 py-4 bg-green-500 rounded-xl text-lg font-semibold hover:bg-green-600 transition"
            >
              Go to Dashboard
            </button>

            <button
              onClick={() => navigate("/calculate")}
              className="px-8 py-4 border border-green-400 text-green-400 rounded-xl text-lg font-semibold hover:bg-green-400 hover:text-black transition"
            >
              Calculate Emission
            </button>
          </div>

        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="bg-gray-950 text-white py-24 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">
              Powerful Sustainability Tools
            </h2>
            <p className="text-gray-400 mt-4">
              Everything you need to monitor and reduce carbon impact.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">

            <div className="bg-gray-900 p-10 rounded-2xl shadow-lg">
              <FaLeaf className="text-green-400 text-4xl mb-6" />
              <h3 className="text-2xl font-semibold">
                Eco Score Tracking
              </h3>
              <p className="text-gray-400 mt-4">
                Instantly measure sustainability of your travel patterns.
              </p>
            </div>

            <div className="bg-gray-900 p-10 rounded-2xl shadow-lg">
              <FaRoute className="text-green-400 text-4xl mb-6" />
              <h3 className="text-2xl font-semibold">
                Smart Route Suggestions
              </h3>
              <p className="text-gray-400 mt-4">
                Discover greener and optimized travel routes using AI.
              </p>
            </div>

            <div className="bg-gray-900 p-10 rounded-2xl shadow-lg">
              <FaChartLine className="text-green-400 text-4xl mb-6" />
              <h3 className="text-2xl font-semibold">
                Emission Analytics
              </h3>
              <p className="text-gray-400 mt-4">
                Visualize emission trends and sustainability performance.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="bg-black text-white py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">

          <div className="bg-gray-900 p-12 rounded-2xl">
            <h2 className="text-5xl font-bold text-green-400">18K+</h2>
            <p className="text-gray-400 mt-4 text-lg">Routes Analyzed</p>
          </div>

          <div className="bg-gray-900 p-12 rounded-2xl">
            <h2 className="text-5xl font-bold text-green-400">11T</h2>
            <p className="text-gray-400 mt-4 text-lg">CO₂ Saved</p>
          </div>

          <div className="bg-gray-900 p-12 rounded-2xl">
            <h2 className="text-5xl font-bold text-green-400">7K+</h2>
            <p className="text-gray-400 mt-4 text-lg">Active Users</p>
          </div>

        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-500 text-black py-24 text-center px-6">

        <h2 className="text-4xl font-bold">
          Ready to Reduce Your Carbon Footprint?
        </h2>

        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Join thousands of users who are making smarter, greener decisions.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-8 px-10 py-4 bg-black text-white rounded-xl text-lg font-semibold hover:opacity-90 transition"
        >
          Start Tracking Now
        </button>

      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black text-gray-400 py-14 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h3 className="text-white text-2xl font-semibold mb-4">
            CarbonTrack
          </h3>

          <p>
            Empowering sustainable travel through smart emission analysis.
          </p>

          <p className="mt-6 text-sm text-gray-500">
            © 2026 CarbonTrack. All rights reserved.
          </p>

        </div>
      </footer>

    </MainLayout>
  );
};

export default Home;
import { useState } from "react";

export default function FlightForm() {
  const [tripType, setTripType] = useState("round");
  const [cabin, setCabin] = useState("Economy");

  return (
    <div className="bg-gradient-to-b from-[#0b2a18] to-[#061a0d] p-6 rounded-xl border border-green-900">
      
      {/* Flight Type */}
      <div className="mb-6">
        <h3 className="mb-2 text-gray-300">Flight type</h3>
        <div className="flex gap-6">
          <button
            onClick={() => setTripType("round")}
            className={`px-4 py-2 rounded-full border ${
              tripType === "round"
                ? "bg-green-600 border-green-500"
                : "border-gray-600"
            }`}
          >
            Round trip
          </button>

          <button
            onClick={() => setTripType("oneway")}
            className={`px-4 py-2 rounded-full border ${
              tripType === "oneway"
                ? "bg-green-600 border-green-500"
                : "border-gray-600"
            }`}
          >
            One-way
          </button>
        </div>
      </div>

      {/* Route */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="City or IATA code"
          className="p-3 rounded-md bg-gray-200 text-black"
        />
        <input
          type="text"
          placeholder="City or IATA code"
          className="p-3 rounded-md bg-gray-200 text-black"
        />
      </div>

      {/* Aircraft */}
      <div className="mb-6">
        <select className="w-full p-3 rounded-md bg-gray-200 text-black">
          <option>No information entered</option>
        </select>
      </div>

      {/* Passengers */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <select className="p-3 rounded-md bg-gray-200 text-black">
          <option>1 Passenger</option>
          <option>2 Passengers</option>
        </select>

        <select className="p-3 rounded-md bg-gray-200 text-black">
          <option>Economy</option>
          <option>Business</option>
        </select>
      </div>

      {/* Cabin Class */}
      <div className="mb-6">
        <h3 className="mb-2 text-gray-300">Cabin class</h3>

        <div className="flex flex-wrap gap-3">
          {["Economy", "Premium Economy", "Business", "First Class"].map(
            (item) => (
              <button
                key={item}
                onClick={() => setCabin(item)}
                className={`px-4 py-2 rounded-full border ${
                  cabin === item
                    ? "bg-green-600 border-green-500"
                    : "border-gray-600"
                }`}
              >
                {item}
              </button>
            )
          )}
        </div>
      </div>

      {/* Button */}
      <button className="w-full bg-green-600 hover:bg-green-700 transition p-3 rounded-md font-semibold">
        Calculate CO₂ emission
      </button>

      {/* Info Box */}
      <div className="mt-6 p-4 border border-green-900 rounded-lg text-gray-400 text-sm">
        <p className="mb-2 text-white font-medium">
          Before booking your flight
        </p>
        Consider lower-emission alternatives. If your flight is unavoidable,
        calculate the CO₂ footprint and contribute to climate protection projects.
      </div>
    </div>
  );
}
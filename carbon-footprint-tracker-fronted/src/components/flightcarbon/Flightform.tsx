
import { useState } from "react";
import api from "../../api/axios";

export default function FlightForm({ setResult }:any) {
  const [form, setForm] = useState({
    from: "",
    to: "",
    passengers: 1,
    seatClass: "economy",
  });

  const handleSubmit = async () => {
    try {
      const res = await api.post("/flights/calculate", form);
      setResult(res.data.data);
    } catch (error:any) {
      console.log("Error calculating flight",error.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <input
        placeholder="From (Delhi)"
        className="border p-2 w-full mb-3"
        onChange={(e) =>
          setForm({ ...form, from: e.target.value })
        }
      />

      <input
        placeholder="To (Mumbai)"
        className="border p-2 w-full mb-3"
        onChange={(e) =>
          setForm({ ...form, to: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Passengers"
        className="border p-2 w-full mb-3"
        onChange={(e) =>
          setForm({ ...form, passengers: Number(e.target.value) })
        }
      />

      <select
        className="border p-2 w-full mb-3"
        onChange={(e) =>
          setForm({ ...form, seatClass: e.target.value })
        }
      >
        <option value="economy">Economy</option>
        <option value="business">Business</option>
        <option value="first">First</option>
      </select>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white w-full py-2 rounded-xl"
      >
        Calculate Carbon
      </button>
    </div>
  );
}
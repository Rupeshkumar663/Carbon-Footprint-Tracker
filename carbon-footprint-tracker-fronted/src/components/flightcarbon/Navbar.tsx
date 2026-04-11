
export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-8 py-4 bg-white shadow">
      <h1 className="text-xl font-bold">🌍 Carbon Tracker</h1>
      <button className="bg-black text-white px-4 py-2 rounded-xl">
        Login
      </button>
    </div>
  );
}
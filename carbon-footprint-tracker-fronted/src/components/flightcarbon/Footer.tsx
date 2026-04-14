export default function Footer() {
  return (
    <div className="mt-12 pt-6 border-t border-green-500/10 text-center">

      {/* Main Text */}
      <p className="text-gray-400 text-sm">
        Advanced Aviation Carbon Emission Calculator
      </p>

      {/* Subtext */}
      <p className="text-gray-500 text-xs mt-1">
        Based on real flight parameters • Designed for sustainability
      </p>

      {/* Links */}
      <div className="flex justify-center gap-6 mt-4 text-sm text-green-400">
        <span className="hover:text-green-300 cursor-pointer transition">
          About
        </span>
        <span className="hover:text-green-300 cursor-pointer transition">
          Privacy
        </span>
        <span className="hover:text-green-300 cursor-pointer transition">
          Contact
        </span>
      </div>

      {/* Bottom */}
      <p className="text-xs text-gray-600 mt-4">
        © {new Date().getFullYear()} Carbon Tracker
      </p>
    </div>
  );
}
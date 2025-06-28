import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="h-16 w-full bg-white shadow-md flex items-center justify-between px-6 fixed top-0 left-64 z-10 rounded-bl-2xl border-b">
      {/* Left: Title */}
      <h1 className="text-xl font-semibold text-[#0077b6]">Volunteer Dashboard</h1>

      {/* Right: Links */}
      <div className="flex items-center gap-6 text-sm text-gray-700 whitespace-nowrap">
        <Link to="/contact" className="hover:text-red-500 transition-colors">📞 Contact</Link>
        <Link to="/about" className="hover:text-blue-600 transition-colors">ℹ️ About</Link>
        <Link to="/help" className="hover:text-rose-500 transition-colors">🆘 Help</Link>

        {/* Divider */}
        <div className="h-4 w-px bg-gray-300"></div>

        {/* Switch Profile */}
        <Link
          to="/ngologin"
          className="hover:text-green-600 transition-colors font-medium"
        >
          🔄 Switch Profile
        </Link>
      </div>
    </header>
  );
}

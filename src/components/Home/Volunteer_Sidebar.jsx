import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function VolunteerSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`h-screen fixed top-0 left-0 bg-[#0077b6] text-white p-4 transition-all duration-300 ease-in-out flex flex-col rounded-r-2xl shadow-lg ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-11 left-3 bg-white text-[#0077b6] rounded-full shadow p-1"
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      <div>
        <h2 className={`text-2xl font-bold mb-6 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
          ShoreCare 🌴
        </h2>

        {/* Add margin-top here to push nav down */}
        <nav className="space-y-4 mt-20">
          <Link to="/volunteerhome" className="flex items-center gap-2 hover:text-yellow-300">
            🏠 {isOpen && <span>Home</span>}
          </Link>
          <Link to="/achievements" className="flex items-center gap-2 hover:text-yellow-300">
            🏅 {isOpen && <span>Achievements</span>}
          </Link>
          <Link to="/my-drives" className="flex items-center gap-2 hover:text-yellow-300">
            🗓️ {isOpen && <span>My Drives</span>}
          </Link>
          <Link to="/guidance" className="flex items-center gap-2 hover:text-yellow-300">
            📋 {isOpen && <span>Guidance</span>}
          </Link>
          <Link to="/feed" className="flex items-center gap-2 hover:text-yellow-300">
            📸 {isOpen && <span>Community Feed</span>}
          </Link>
          <Link to="/profile" className="flex items-center gap-2 hover:text-yellow-300">
            👤 {isOpen && <span>My Profile</span>}
          </Link>
        </nav>
      </div>
    </aside>
  );
}

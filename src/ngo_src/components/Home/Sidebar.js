import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Sidebar() {
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

        {/* Navigation */}
        <nav className="space-y-4 mt-20">
    

          <Link to="/" className="flex items-center gap-2 hover:text-yellow-300">
            🏠 {isOpen && <span>Home</span>}
          </Link>
          <Link to="/volunteer-management" className="flex items-center gap-2 hover:text-yellow-300">
            🧑‍🤝‍🧑 {isOpen && <span>Volunteer Management</span>}
          </Link>
          <Link to="/skill-deployment" className="flex items-center gap-2 hover:text-yellow-300">
            🛠️ {isOpen && <span>Skill Deployment</span>}
          </Link>
          <Link to="/beach-selection" className="flex items-center gap-2 hover:text-yellow-300">
            🏖️ {isOpen && <span>Beach Mapping</span>}
          </Link>
          <Link to="/csrtoolkithome" className="flex items-center gap-2 hover:text-yellow-300">
            🤝 {isOpen && <span>CSR Toolkit</span>}
          </Link>
          <Link to="/ai-assistant" className="flex items-center gap-2 hover:text-yellow-300">
            🤖 {isOpen && <span>AI Assistant</span>}
          </Link>
          <Link to="/impact-analytics" className="flex items-center gap-2 hover:text-yellow-300">
            📊 {isOpen && <span>Impact Analytics</span>}
          </Link>
        </nav>
      </div>
    </aside>
  );
}

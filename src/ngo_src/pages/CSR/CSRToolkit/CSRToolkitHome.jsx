import { Link } from 'react-router-dom';

export default function CSRToolkitHome() {
  const features = [
    { name: "Corporate Sponsor Login", path: "/csr/sponsor-login", emoji: "🔐" },
    { name: "Corporate Dashboard", path: "/csr/dashboard", emoji: "📊" },
    { name: "Volunteer Engagement Logs", path: "/csr/dashboard#logs", emoji: "🧑‍🤝‍🧑" },
    { name: "Branded Event Visibility", path: "/csr/dashboard#branding", emoji: "🪧" },
    { name: "Impact Dashboard", path: "/csr/dashboard#impact", emoji: "📈" },
    { name: "Automated Reports", path: "/csr/dashboard#reports", emoji: "📄" },
    { name: "Campaign Scheduler", path: "/csr/dashboard#scheduler", emoji: "📅" },
  ];

  return (
    <div className="p-10 min-h-screen bg-[#fdf6e3]">
      <h1 className="text-4xl font-bold text-[#005f73] mb-6">🌐 CSR Partnership Toolkit</h1>
      <p className="text-lg mb-10 text-gray-700">
        Enable, track, and manage corporate engagement through ShoreCare’s data-driven CSR platform.
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {features.map((f, idx) => (
          <Link key={idx} to={f.path}>
            <div className="bg-white hover:bg-[#d6f0eb] p-6 rounded-xl shadow transition-all border border-gray-200">
              <div className="text-3xl mb-2">{f.emoji}</div>
              <div className="text-lg font-semibold">{f.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

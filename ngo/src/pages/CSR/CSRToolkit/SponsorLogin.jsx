import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SponsorLogin() {
  const navigate = useNavigate();
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (!company || !email) {
      alert("Please fill out both fields.");
      return;
    }

    // Temporary login logic — assume login is successful
    navigate('/csr/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdf6e3] p-6">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-[#0077b6] mb-6">Corporate Sponsor Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077b6]"
              placeholder="e.g. Infosys"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">CSR Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077b6]"
              placeholder="name@company.com"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0077b6] text-white py-2 rounded-lg hover:bg-[#005f73] transition"
          >
            🚀 Login & View Dashboard
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Not registered? Contact NGO admin for CSR onboarding.
        </p>
      </div>
    </div>
  );
}

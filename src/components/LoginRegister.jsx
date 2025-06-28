import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginRegister() {
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState('ngo');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === 'ngo') navigate('/ngohome');
    else if (role === 'volunteer') navigate('/volunteerhome');
    else if (role === 'csr') navigate('/csrtoolkithome'); // or your CSR landing route
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white bg-opacity-90 p-10 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-center">{isRegister ? 'Register' : 'Login'}</h2>

        {/* Role Selection */}
        <div className="flex justify-center gap-4 mb-6">
          {['ngo', 'volunteer', 'csr'].map(r => (
            <button
              key={r}
              className={`px-4 py-2 rounded-full border ${role === r ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} border-blue-500`}
              onClick={() => setRole(r)}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Form Fields */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" className="p-3 border rounded" />
          {isRegister && <input type="email" placeholder="Email" className="p-3 border rounded" />}
          <input type="password" placeholder="Password" className="p-3 border rounded" />

          <button type="submit" className="bg-blue-500 text-white py-3 rounded font-bold">
            {isRegister ? 'Register' : 'Login'}
          </button>

          {!isRegister && <a href="#" className="text-sm text-blue-500 text-center">Forgot password?</a>}

          <p className="text-center text-sm">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button type="button" className="text-blue-500 underline" onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? 'Login' : 'Register'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

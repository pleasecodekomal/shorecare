import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginRegister() {
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState("ngo");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // ✅ NEW
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Auto redirect if JWT exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.role === "ngo") navigate("/ngohome");
        else if (payload.role === "volunteer") navigate("/volunteerhome");
        else if (payload.role === "csr") navigate("/csrtoolkithome");
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      username,
      email: isRegister ? email : undefined, // only for register
      phone: isRegister ? phone : undefined, // ✅ NEW
      password,
    };

    const url = isRegister
      ? role === "ngo"
        ? "http://localhost:8002/api/register"
        : "http://localhost:8001/api/register"
      : role === "ngo"
        ? "http://localhost:8002/api/login"
        : "http://localhost:8001/api/login";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);

        if (role === "ngo") navigate("/ngohome");
        else if (role === "volunteer") navigate("/volunteerhome");
        else if (role === "csr") navigate("/csrtoolkithome");
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white bg-opacity-90 p-10 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-center">
          {isRegister ? "Register" : "Login"}
        </h2>

        {/* Role Selection */}
        <div className="flex justify-center gap-4 mb-6">
          {["ngo", "volunteer", "csr"].map((r) => (
            <button
              key={r}
              className={`px-4 py-2 rounded-full border ${
                role === r ? "bg-blue-500 text-white" : "bg-white text-blue-500"
              } border-blue-500`}
              onClick={() => setRole(r)}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Form Fields */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="p-3 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {isRegister && (
            <>
              <input
                type="email"
                placeholder="Email"
                className="p-3 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Phone"
                className="p-3 border rounded"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </>
          )}

          <input
            type="password"
            placeholder="Password"
            className="p-3 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-blue-500 text-white py-3 rounded font-bold"
          >
            {isRegister ? "Register" : "Login"}
          </button>

          {!isRegister && (
            <a href="/forgot-password" className="text-sm text-blue-500 text-center">
              Forgot password?
            </a>
          )}

          <p className="text-center text-sm">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              className="text-blue-500 underline"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Login" : "Register"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from "react";

export default function ForgotPassword() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrPhone }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Check your email/phone for OTP instructions.");
      } else {
        setMessage(data.message || "Error sending reset link.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>

        <input
          type="text"
          placeholder="Enter email or phone"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
          className="p-3 border rounded w-full mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded font-bold"
        >
          Send Reset Link
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-green-600">{message}</p>
        )}
      </form>
    </div>
  );
}

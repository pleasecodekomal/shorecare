import React, { useEffect, useState } from "react";

export default function Verify() {
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const role = urlParams.get("role"); // ✅ new

    console.log("✅ Extracted token:", token);
    console.log("✅ Extracted role:", role);

    if (!token || !role) {
      setMessage("Invalid verification link.");
      return;
    }

    // ✅ Pick backend by role:
    const apiURL =
      role === "ngo"
        ? "http://localhost:8001/api/verify"
        : "http://localhost:8002/api/verify";

    console.log("✅ Hitting:", apiURL);

    fetch(apiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Backend response:", data);
        if (data.message) {
          setMessage(data.message);
        } else {
          setMessage(data.detail || "Something went wrong.");
        }
      })
      .catch((err) => {
        console.error("❌ Verify failed:", err);
        setMessage("Server error.");
      });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 bg-white rounded shadow">
        <h1 className="text-xl font-bold">{message}</h1>
      </div>
    </div>
  );
}

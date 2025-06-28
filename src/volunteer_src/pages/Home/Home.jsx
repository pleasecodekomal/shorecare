import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

console.log("VolunteerHome loaded"); // Add this on top

export default function VolunteerHome() {
  return (
    <div className="min-h-screen bg-[#f5f0e1] p-8">
      <h1 className="text-4xl font-bold text-[#023e8a] mb-4">
        🌊 Welcome to ShoreCare!
      </h1>
      <p className="text-lg text-gray-700">
        Join upcoming beach drives and track your achievements here.
      </p>
    </div>
  );
}

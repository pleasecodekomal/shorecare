import React from "react";
import { useNavigate } from "react-router-dom";

export default function VolunteerHome() {
  const navigate = useNavigate();

  const dummyDrives = [
    {
      id: "1a2b3c",
      location: "Juhu Beach",
      date: "2025-07-01",
    },
    {
      id: "4d5e6f",
      location: "Versova Beach",
      date: "2025-07-05",
    },
    {
      id: "7g8h9i",
      location: "Marina Beach",
      date: "2025-07-10",
    },
  ];

  const handleJoin = (id) => {
    navigate(`/join-drive/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#f5f0e1] p-8">
      <h1 className="text-4xl font-bold text-[#023e8a] mb-4">
        🌊 Welcome to ShoreCare!
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Join upcoming beach drives and track your achievements here.
      </p>

      <h2 className="text-2xl font-semibold mb-4">📅 Upcoming Drives</h2>
      <div className="space-y-4">
        {dummyDrives.map((drive) => (
          <div
            key={drive.id}
            className="bg-white shadow p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <h3 className="text-xl font-semibold">{drive.location}</h3>
              <p className="text-gray-600">Date: {drive.date}</p>
            </div>
            <button
              onClick={() => handleJoin(drive.id)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Join Drive
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

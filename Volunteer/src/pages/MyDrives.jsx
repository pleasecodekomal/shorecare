import React from "react";
import DashboardLayout from "../layout/DashboardLayout";

// Example dummy drives data
const dummyDrives = [
  {
    id: 1,
    title: "Versova Beach Cleanup",
    date: "June 10, 2025",
    location: "Versova Beach, Mumbai",
    wasteCollected: "120 kg",
    teamLead: "John Doe",
    status: "Completed",
  },
  {
    id: 2,
    title: "Dadar Beach Cleanup",
    date: "June 15, 2025",
    location: "Dadar Beach, Mumbai",
    wasteCollected: "95 kg",
    teamLead: "Jane Smith",
    status: "Completed",
  },
  {
    id: 3,
    title: "Juhu Beach Evening Sweep",
    date: "June 22, 2025",
    location: "Juhu Beach, Mumbai",
    wasteCollected: "140 kg",
    teamLead: "Alex Johnson",
    status: "Scheduled",
  },
];

const MyDrives = () => {
  return (
      <div className="p-6">
        <br />
        <h2 className="text-2xl font-bold mb-4">My Drives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyDrives.map((drive) => (
            <div key={drive.id} className="border rounded-lg p-4 shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">{drive.title}</h3>
              <p><strong>Date:</strong> {drive.date}</p>
              <p><strong>Location:</strong> {drive.location}</p>
              <p><strong>Waste Collected:</strong> {drive.wasteCollected}</p>
              <p><strong>Team Lead:</strong> {drive.teamLead}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`${
                    drive.status === "Completed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  } font-semibold`}
                >
                  {drive.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
  );
};

export default MyDrives;

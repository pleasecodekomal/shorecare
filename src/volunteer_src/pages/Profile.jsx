import React from "react";

const dummyUser = {
  name: "Morjeena Begum",
  location: "Mumbai, India",
  avatar: "https://i.pravatar.cc/150?img=32", // Replace with real user avatar
  totalDrives: 12,
  totalWaste: "420 kg",
  hoursVolunteered: 85,
  kudos: 48,
  last7Days: {
    drives: 3,
    waste: "50 kg",
    hours: 8,
  },
  route: "Versova Beach",
};

const Profile = () => {
  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Header */}
      <div className="flex items-center gap-6 mb-8">
        <img
          src={dummyUser.avatar}
          alt={dummyUser.name}
          className="w-32 h-32 rounded-full border-4 border-blue-500"
        />
        <div>
          <h2 className="text-3xl font-bold">{dummyUser.name}</h2>
          <p className="text-gray-500">{dummyUser.location}</p>
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-2">Total Drives</h3>
          <p className="text-3xl font-bold">{dummyUser.totalDrives}</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-2">Total Waste Collected</h3>
          <p className="text-3xl font-bold">{dummyUser.totalWaste}</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-2">Hours Volunteered</h3>
          <p className="text-3xl font-bold">{dummyUser.hoursVolunteered} hrs</p>
        </div>
      </div>

      {/* Last 7 Days */}
      <div className="p-6 bg-white rounded-xl shadow mb-8">
        <h3 className="text-2xl font-semibold mb-4">Last 7 Days</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-gray-500">Drives Attended</p>
            <p className="text-xl font-bold">{dummyUser.last7Days.drives}</p>
          </div>
          <div>
            <p className="text-gray-500">Waste Collected</p>
            <p className="text-xl font-bold">{dummyUser.last7Days.waste}</p>
          </div>
          <div>
            <p className="text-gray-500">Hours Volunteered</p>
            <p className="text-xl font-bold">{dummyUser.last7Days.hours} hrs</p>
          </div>
        </div>
      </div>

      {/* Route & Kudos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="text-2xl font-semibold mb-4">Favorite Route</h3>
          <p className="text-xl font-bold">{dummyUser.route}</p>
          <p className="text-gray-500">Used most frequently in the last 30 days</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="text-2xl font-semibold mb-4">Kudos & Feedback</h3>
          <p className="text-xl font-bold">{dummyUser.kudos} Kudos</p>
          <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            View Comments
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

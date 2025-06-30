import React, { useEffect, useState } from "react";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8001/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setUserData(data);
        } else {
          console.error("Error fetching profile:", data.detail);
        }
      } catch (err) {
        console.error("Server error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="p-8">Loading profile...</div>;
  if (!userData) return <div className="p-8 text-red-600">Failed to load profile.</div>;

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Header */}
      <div className="flex items-center gap-6 mb-8">
        <img
          src={`https://i.pravatar.cc/150?u=${userData.volunteerId}`}
          alt="User avatar"
          className="w-32 h-32 rounded-full border-4 border-blue-500"
        />
        <div>
          <h2 className="text-3xl font-bold">{userData.username || "Volunteer"}</h2>
          <p className="text-gray-500">{userData.location || "India"}</p>
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-2">Total Drives</h3>
          <p className="text-3xl font-bold">{userData.totalCleanups}</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-2">Badges</h3>
          <p className="text-3xl font-bold">{userData.badges.length}</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-2">XP</h3>
          <p className="text-3xl font-bold">{userData.xp}</p>
        </div>
      </div>

      {/* Skills */}
      <div className="p-6 bg-white rounded-xl shadow mb-8">
        <h3 className="text-2xl font-semibold mb-4">Top Skills</h3>
        <ul className="space-y-2">
          {userData.skills.map((skill, i) => (
            <li key={i} className="flex justify-between">
              <span>{skill}</span>
              <span className="text-gray-400">Preference #{i + 1}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Badges */}
      <div className="p-6 bg-white rounded-xl shadow">
        <h3 className="text-2xl font-semibold mb-4">Badges Earned</h3>
        <div className="flex gap-4 flex-wrap">
          {userData.badges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center p-4 bg-blue-50 rounded-lg shadow">
              <div className="text-4xl">🏅</div>
              <p className="mt-2 font-medium">{badge}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;

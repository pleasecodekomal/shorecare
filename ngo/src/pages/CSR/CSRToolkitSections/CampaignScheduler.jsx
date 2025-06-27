import React, { useState } from 'react';

const upcomingDrives = [
  {
    id: 1,
    beach: 'Juhu Beach, Mumbai',
    date: '2025-07-05',
    slots: '2/3 Sponsored',
    visibility: 'Logo on banners + digital invites',
    involvement: ['Funding', 'Volunteers'],
  },
  {
    id: 2,
    beach: 'Marina Beach, Chennai',
    date: '2025-07-15',
    slots: '1/3 Sponsored',
    visibility: 'Brand mention + blog feature',
    involvement: ['Volunteers Only'],
  },
  {
    id: 3,
    beach: 'Versova Beach, Mumbai',
    date: '2025-07-22',
    slots: 'Open for 3 Sponsors',
    visibility: 'Full branding rights + press mention',
    involvement: ['Funding + Media'],
  },
];

export default function CampaignScheduler() {
  const [bookedDrive, setBookedDrive] = useState(null);

  const handleBook = (beach) => {
    setBookedDrive(beach);
    alert(`✅ Campaign booked for ${beach}! Our team will reach out shortly.`);
  };

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-semibold mb-4">📅 Upcoming Drives – Reserve Your Slot</h3>

      <div className="grid md:grid-cols-2 gap-6">
        {upcomingDrives.map((drive) => (
          <div
            key={drive.id}
            className="bg-white p-6 rounded-xl shadow border border-gray-200 flex flex-col justify-between"
          >
            <div>
              <h4 className="text-lg font-bold text-[#0077b6] mb-2">{drive.beach}</h4>
              <p className="text-sm text-gray-600 mb-1">📆 {drive.date}</p>
              <p className="text-sm text-gray-600 mb-1">🎯 Visibility: {drive.visibility}</p>
              <p className="text-sm text-gray-600 mb-2">👥 Slots: {drive.slots}</p>
              <p className="text-sm text-gray-600">🎗️ Involvement: <span className="font-medium">{drive.involvement.join(', ')}</span></p>
            </div>

            <button
              onClick={() => handleBook(drive.beach)}
              className="mt-4 bg-[#0077b6] text-white py-2 px-4 rounded-lg hover:bg-[#005f73] transition"
            >
              📌 Book Sponsorship
            </button>
          </div>
        ))}
      </div>

      {bookedDrive && (
        <div className="mt-6 p-4 rounded-lg bg-green-50 text-green-800 border border-green-300">
          Thank you! Your interest in <strong>{bookedDrive}</strong> has been noted. We will reach out for partnership onboarding.
        </div>
      )}
    </div>
  );
}

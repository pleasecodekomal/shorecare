import React from 'react';

const volunteerData = [
  {
    name: 'Aarav Mehta',
    department: 'Sustainability',
    location: 'Juhu Beach, Mumbai',
    hours: 5,
    role: 'Cleanup',
    date: '2025-06-10',
  },
  {
    name: 'Riya Kapoor',
    department: 'Media & PR',
    location: 'Marina Beach, Chennai',
    hours: 3,
    role: 'Photography',
    date: '2025-06-12',
  },
  {
    name: 'Rahul Nair',
    department: 'Tech',
    location: 'Versova Beach, Mumbai',
    hours: 4,
    role: 'Logistics',
    date: '2025-06-15',
  },
];

export default function VolunteerLogs() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-[#0077b6] text-white">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Department</th>
            <th className="p-4 text-left">Location</th>
            <th className="p-4 text-left">Hours</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {volunteerData.map((v, index) => (
            <tr key={index} className="hover:bg-[#f1f9ff] transition-all">
              <td className="p-4">{v.name}</td>
              <td className="p-4">{v.department}</td>
              <td className="p-4">{v.location}</td>
              <td className="p-4">{v.hours} hrs</td>
              <td className="p-4">{v.role}</td>
              <td className="p-4">{v.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

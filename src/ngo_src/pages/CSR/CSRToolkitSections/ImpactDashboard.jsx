import React from 'react';
import { FaLeaf, FaRecycle, FaUsers, FaMapMarkedAlt, FaHandshake } from 'react-icons/fa';

const impactStats = [
  {
    label: 'Total Waste Collected',
    value: '3,250 kg',
    icon: <FaRecycle className="text-white text-2xl" />,
    bg: 'bg-green-600',
  },
  {
    label: 'CO₂ Offset',
    value: '1,540 kg',
    icon: <FaLeaf className="text-white text-2xl" />,
    bg: 'bg-sky-500',
  },
  {
    label: 'Beaches Cleaned',
    value: '42',
    icon: <FaMapMarkedAlt className="text-white text-2xl" />,
    bg: 'bg-orange-500',
  },
  {
    label: 'Volunteers Engaged',
    value: '780+',
    icon: <FaUsers className="text-white text-2xl" />,
    bg: 'bg-indigo-600',
  },
  {
    label: 'Corporate Drives Sponsored',
    value: '18',
    icon: <FaHandshake className="text-white text-2xl" />,
    bg: 'bg-pink-600',
  },
];

export default function ImpactDashboard() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {impactStats.map((item, idx) => (
        <div
          key={idx}
          className={`rounded-xl p-6 shadow-lg text-white flex items-center gap-4 ${item.bg}`}
        >
          <div className="p-3 bg-white/20 rounded-full">{item.icon}</div>
          <div>
            <div className="text-xl font-bold">{item.value}</div>
            <div className="text-sm">{item.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

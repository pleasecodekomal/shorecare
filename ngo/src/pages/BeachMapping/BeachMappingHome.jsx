import React, { useState, useEffect } from 'react';
import BeachStatsTable from './BeachStatsTable';
import BeachInsightsEDA from './BeachInsightsEDA';
import { beachData } from '../../data/beach_data'; 

const beaches = ['Versova', 'Dadar', 'Goregaon', 'Mahim', 'Juhu', 'Palm'];

export default function BeachMappingHome() {
  const [selectedBeach, setSelectedBeach] = useState(null);
  const [beachInfo, setBeachInfo] = useState(null);

  useEffect(() => {
    if (selectedBeach) {
      const info = beachData.find(beach => beach.name === selectedBeach);
      setBeachInfo(info);
    }
  }, [selectedBeach]);

  return (
    <div className="p-10 bg-[#fdf6e3] min-h-screen">
      <h1 className="text-3xl font-bold text-[#0077b6] mb-4">🏝️ Data-Driven Beach Mapping</h1>
      <p className="mb-8 text-gray-700">
        Select a beach to view cleanup recommendation stats and visual insights based on recent activity.
      </p>

      {/* Beach Selection Buttons */}
      <div className="flex flex-wrap gap-4 mb-10">
        {beaches.map((beach, index) => (
          <button
            key={index}
            onClick={() => setSelectedBeach(beach)}
            className={`px-5 py-2 rounded-xl shadow transition-all ${
              selectedBeach === beach
                ? 'bg-[#0077b6] text-white'
                : 'bg-white text-[#0077b6] border border-[#0077b6]'
            }`}
          >
            {beach}
          </button>
        ))}
      </div>

      {/* Data Display */}
      {beachInfo ? (
        <div className="space-y-10">
          <BeachStatsTable data={beachInfo} />
          <BeachInsightsEDA data={beachInfo} />
        </div>
      ) : (
        <p className="text-gray-500">🔍 Select a beach to view data.</p>
      )}
    </div>
  );
}

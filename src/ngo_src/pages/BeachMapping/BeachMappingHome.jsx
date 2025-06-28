import React, { useState, useEffect } from 'react';
import BeachStatsTable from './BeachStatsTable';
import BeachInsightsEDA from './BeachInsightsEDA';

export default function BeachMappingHome() {
  const [selectedBeach, setSelectedBeach] = useState(null);
  const [beachInfo, setBeachInfo] = useState(null);
  const [beachList, setBeachList] = useState([]);

  // ✅ Fetch beaches from your backend
  useEffect(() => {
    const fetchBeaches = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/beaches');
        const data = await res.json();
        setBeachList(data);
        console.log('✅ Beaches fetched:', data);
      } catch (err) {
        console.error('Error fetching beaches:', err);
      }
    };
    fetchBeaches();
  }, []);

  // ✅ Set selected beach from DB list
  useEffect(() => {
    if (selectedBeach && beachList.length) {
      const info = beachList.find(beach => beach.name === selectedBeach);
      setBeachInfo(info);
      console.log('✅ Selected Beach:', info);
    }
  }, [selectedBeach, beachList]);

  // ✅ Helper to flatten latest stats
  function getLatestStats(beach) {
    if (!beach?.monthly_stats || beach.monthly_stats.length === 0) return {};
    const latest = beach.monthly_stats[beach.monthly_stats.length - 1];
    const output = {
      name: beach.name,
      waste_kg: latest.waste_kg || 0,
      tourists: latest.tourists || 0,
      events: latest.events ? latest.events.length : 0,
      beach_score: latest.beach_score || 0
    };
    console.log('✅ Latest Stats:', output);
    return output;
  }

  return (
    <div className="p-10 bg-[#fdf6e3] min-h-screen">
      <h1 className="text-3xl font-bold text-[#0077b6] mb-4">🏝️ Data-Driven Beach Mapping</h1>
      <p className="mb-8 text-gray-700">
        Select a beach to view cleanup recommendation stats and visual insights based on recent activity.
      </p>

      {/* Beach Selection Buttons */}
      <div className="flex flex-wrap gap-4 mb-10">
        {beachList.map((beach, index) => (
          <button
            key={index}
            onClick={() => setSelectedBeach(beach.name)}
            className={`px-5 py-2 rounded-xl shadow transition-all ${
              selectedBeach === beach.name
                ? 'bg-[#0077b6] text-white'
                : 'bg-white text-[#0077b6] border border-[#0077b6]'
            }`}
          >
            {beach.name}
          </button>
        ))}
      </div>

      {/* Data Display */}
      {beachInfo ? (
        <div className="space-y-10">
          <BeachStatsTable data={getLatestStats(beachInfo)} />
          <BeachInsightsEDA data={getLatestStats(beachInfo)} />
        </div>
      ) : (
        <p className="text-gray-500">🔍 Select a beach to view data.</p>
      )}
    </div>
  );
}

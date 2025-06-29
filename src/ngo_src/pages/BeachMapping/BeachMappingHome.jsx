import React, { useState, useEffect } from 'react';
import BeachStatsTable from './BeachStatsTable';
import BeachInsightsEDA from './BeachInsightsEDA';

export default function BeachMappingHome() {
  const [selectedBeach, setSelectedBeach] = useState(null);
  const [beachInfo, setBeachInfo] = useState(null);
  const [beachList, setBeachList] = useState([]);

  // ✅ Fetch all beaches from MongoDB on load
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

  // ✅ Pick selected beach info from beachList
  useEffect(() => {
    if (selectedBeach && beachList.length) {
      const info = beachList.find(beach => beach.name === selectedBeach);
      setBeachInfo(info);
      console.log('✅ Selected Beach:', info);
    }
  }, [selectedBeach, beachList]);

  // ✅ Safely flatten stats
  function getLatestStats(beach) {
    if (!beach?.monthly_stats || beach.monthly_stats.length === 0) {
      return {
        name: beach.name,
        waste_kg: 0,
        tourists: 0,
        events: 0,
        beach_score: 0
      };
    }
    const latest = beach.monthly_stats[beach.monthly_stats.length - 1];
    return {
      name: beach.name,
      waste_kg: latest.waste_kg || 0,
      tourists: latest.tourists || 0,
      events: latest.events ? latest.events.length : 0,
      beach_score: latest.beach_score || 0
    };
  }

  return (
    <div className="p-10 bg-[#fdf6e3] min-h-screen">
      <h1 className="text-3xl font-bold text-[#0077b6] mb-4">🏝️ Data-Driven Beach Mapping</h1>
      <p className="mb-8 text-gray-700">
        Select a beach to view cleanup recommendation stats and visual insights based on real data.
      </p>

      {/* ✅ Real Beach Buttons */}
      {beachList.length > 0 ? (
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
      ) : (
        <p className="text-red-600 font-semibold mb-10">
          ⚠️ No beaches found. Please add some data!
        </p>
      )}

      {/* ✅ Stats & EDA */}
      {beachInfo ? (
        <div className="space-y-10">
          <BeachStatsTable data={getLatestStats(beachInfo)} />
          <BeachInsightsEDA data={beachInfo} />
        </div>
      ) : (
        <p className="text-gray-500">🔍 Select a beach to view data.</p>
      )}
    </div>
  );
}

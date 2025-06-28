import React from 'react';

export default function BeachStatsTable({ data }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-[#0077b6]">
        📊 Last Month Overview – {data.name} Beach
      </h2>

      <table className="min-w-full text-left border-collapse">
        <thead className="bg-[#0077b6] text-white">
          <tr>
            <th className="p-4">Metric</th>
            <th className="p-4">Value</th>
          </tr>
        </thead>
        <tbody className="text-gray-800 text-sm md:text-base">
          <tr className="border-b">
            <td className="p-4 font-medium">Total Waste Collected (kg)</td>
            <td className="p-4">{data.waste_kg.toLocaleString()}</td>
          </tr>
          <tr className="border-b">
            <td className="p-4 font-medium">Tourist Footfall (people)</td>
            <td className="p-4">{data.tourists.toLocaleString()}</td>
          </tr>
          <tr>
            <td className="p-4 font-medium">Events/Festivals Held</td>
            <td className="p-4">{data.events}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Line,
  LineChart
} from 'recharts';

export default function BeachInsightsEDA({ data }) {
  // ✅ If no stats, use empty array so Recharts does not crash
  const monthly_stats = data.monthly_stats || [];

  // ✅ Build your chart data safely
  const chartData = monthly_stats.map(item => ({
    month: item.month,
    waste: item.waste_kg || 0,
    events: Array.isArray(item.events) ? item.events.length : 0,
    tourists: item.tourists || 0,
    beach_score: item.beach_score || 0,
  }));

  console.log('✅ chartData:', chartData);

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-200 space-y-12">
      <h2 className="text-xl font-semibold text-[#0077b6]">📈 Visual Insights (Advanced EDA)</h2>

      {/* Waste vs Events */}
      <div>
        <h3 className="text-lg font-medium mb-4">Waste Volume vs Events</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" orientation="left" stroke="#0077b6" />
            <YAxis yAxisId="right" orientation="right" stroke="#ff6f00" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="waste" fill="#0077b6" name="Waste (kg)" />
            <Bar yAxisId="right" dataKey="events" fill="#90D5FF" name="Events Held" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tourist Trend */}
      <div>
        <h3 className="text-lg font-medium mb-4">Tourist Activity Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="tourists" stroke="#26a69a" strokeWidth={3} name="Tourists" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Beach Score Trend */}
      <div>
        <h3 className="text-lg font-medium mb-4">Beach Score Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="beach_score" stroke="#ff7043" strokeWidth={3} name="Beach Score" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

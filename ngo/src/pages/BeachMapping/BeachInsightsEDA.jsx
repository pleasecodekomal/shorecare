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
  ScatterChart,
  Scatter,
  ZAxis,
  Line,
  LineChart
} from 'recharts';

export default function BeachInsightsEDA({ data }) {
  const monthlyWasteAndEvents = [
    { month: 'Jan', waste: 1000, events: 1 },
    { month: 'Feb', waste: 1300, events: 2 },
    { month: 'Mar', waste: 1100, events: 1 },
    { month: 'Apr', waste: 1600, events: 3 },
    { month: 'May', waste: 1800, events: 2 },
    { month: 'Jun', waste: data.waste_kg, events: data.events },
  ];

  const touristTrend = [
    { month: 'Jan', tourists: 7000 },
    { month: 'Feb', tourists: 8000 },
    { month: 'Mar', tourists: 8500 },
    { month: 'Apr', tourists: 10000 },
    { month: 'May', tourists: 11000 },
    { month: 'Jun', tourists: data.tourists },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-200 space-y-12">
      <h2 className="text-xl font-semibold text-[#0077b6]">📈 Visual Insights (Advanced EDA)</h2>

      {/* Waste vs Events Bar Chart */}
      <div>
        <h3 className="text-lg font-medium mb-4">Waste Volume vs Events (6 Months)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyWasteAndEvents}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" orientation="left" stroke="#0077b6" />
            <YAxis yAxisId="right" orientation="right" stroke="#ff6f00" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="waste" fill="#0077b6" name="Waste (kg)" />
            <Bar yAxisId="right" dataKey="events" fill="#90D5FF" name="Events" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tourist Activity Scatter Line Chart */}
      <div>
        <h3 className="text-lg font-medium mb-4">Tourist Activity Trend (6 Months)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={touristTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="tourists" stroke="#26a69a" strokeWidth={3} name="Tourists" />
          </LineChart>
        </ResponsiveContainer>
      </div>


    </div>
  );
}

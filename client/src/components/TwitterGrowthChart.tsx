import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { FaTwitter } from 'react-icons/fa';


const data = [
  { date: 'Jul 1', followers: 1023 },
  { date: 'Jul 2', followers: 1080 },
  { date: 'Jul 3', followers: 1125 },
  { date: 'Jul 4', followers: 1154 },
  { date: 'Jul 5', followers: 1190 },
  { date: 'Jul 6', followers: 1244 },
  { date: 'Jul 7', followers: 1301 },
];

export default function TwitterGrowthChart() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 mb-4">
            <FaTwitter className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-semibold text-gray-800"> X Follower Growth</h2>
        </div>

        <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg transition">
          Download CSV
        </button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              borderRadius: '10px',
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              fontSize: '0.875rem',
            }}
          />
          <Line
            type="monotone"
            dataKey="followers"
            stroke="#1DA1F2"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

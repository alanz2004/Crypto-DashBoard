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
    <div className="twitter-chart-container">
       <div className="flex flex-col items-center mb-4">
                <h2 className="chart-title">
                 X Following Chart
                </h2>
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

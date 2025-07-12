import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const data = [
  { day: 'Mon', eth: 2 },
  { day: 'Tue', eth: 4 },
  { day: 'Wed', eth: 6 },
  { day: 'Thu', eth: 8 },
  { day: 'Fri', eth: 12 },
  { day: 'Sat', eth: 15 },
  { day: 'Sun', eth: 20 },
];

export default function EthRaisingChart() {
  return (
    <div className="ethereum-chart-container">
             <div className="flex flex-col items-center mb-4">
                <h2 className="text-lg font-semibold text-center text-brand-bg">
                 Ethereum Growing Chart
                </h2>
              </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="day" />
          <YAxis domain={[0, 'dataMax + 5']} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="eth"
            stroke="#6366F1" // Indigo-500 Tailwind color
            strokeWidth={3}
            activeDot={{ r: 8 }}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

import TwitterGrowthChart from '../components/TwitterGrowthChart';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6" >
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

      <div className="w-[70vw] max-w-5xl bg-white p-8 rounded-2xl shadow-lg">
        <TwitterGrowthChart />
      </div>
    </div>
  );
}

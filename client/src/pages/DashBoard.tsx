import TwitterGrowthChart from '../components/TwitterGrowthChart';
import EthRaisingChart from '../components/EthRaisingChart';
import TokenHoldings from '../components/TokenHoldings';

export default function Dashboard() {
  return (
    <div className="w-[95vw] min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-brand-primary self-start">DashBoard</h1>
        <div className="flex justify-around w-full">
          <div className="w-[45%]">
            <TwitterGrowthChart />
          </div>
          <div className="w-[45%]">
            <EthRaisingChart />
          </div>
        </div>

        <TokenHoldings />

    </div>
  );
}

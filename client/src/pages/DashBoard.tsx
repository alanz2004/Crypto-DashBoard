import TwitterGrowthChart from '../components/TwitterGrowthChart';
import EthRaisingChart from '../components/EthRaisingChart';
import TokenHoldings from '../components/TokenHoldings';
import ChartComponent from '../components/FundBarChart';

const sampleData = [
  { category: 'Category A', value: 75, description: 'Description A...' },
  { category: 'Category B', value: 55, description: 'Description B...' },
  { category: 'Category C', value: 90, description: 'Description C...' },
];


export default function Dashboard() {
  return (
   <div className='w-[95%] box-border'>
    <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <div className='w-[100%] flex flex-col'>
      
          <div className="flex justify-start w-full mt-[3.5%] gap-x-4">
                        <div className="flex-grow max-w-[48%] min-w-0">
                          <TwitterGrowthChart />
                        </div>
                        <div className="flex-grow max-w-[48%] min-w-0">
                          <EthRaisingChart />
                        </div>
          </div>
          <ChartComponent />

          <TokenHoldings />
      </div>
    </div>
  );
}

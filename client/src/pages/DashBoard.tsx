import './DashBoard.css'
import TwitterGrowthChart from '../components/TwitterGrowthChart';
import EthRaisingChart from '../components/EthRaisingChart';
import DashboardStats from '../components/DashboardStats';
import TokenHoldings from '../components/TokenHoldings';
import ChartComponent from '../components/FundBarChart';

const sampleData = [
  { category: 'Category A', value: 75, description: 'Description A...' },
  { category: 'Category B', value: 55, description: 'Description B...' },
  { category: 'Category C', value: 90, description: 'Description C...' },
];


export default function Dashboard() {
  return (
   <div className='dashboard-content'> 
          <DashboardStats totalUsers={12500} totalEth={342.57} />
          <ChartComponent />
          <TokenHoldings />
    </div>
  );
}

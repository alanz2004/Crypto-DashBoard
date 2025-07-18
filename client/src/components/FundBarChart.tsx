import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const data = {
  labels: ['Category A', 'Category B', 'Category C'],
  datasets: [
    {
      label: 'Value',
      data: [70, 50, 90],
      backgroundColor: ['#8884d8', '#82ca9d', '#ffc658'],
      borderRadius: 8,
    },
  ],
};

const options = {
  indexAxis: 'y' as const,
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      max: 100,
      beginAtZero: true,
    },
  },
};

export default function ChartComponent() {
  return (
    <div className="chart-container">
      <h1 className='chart-container-title'>Token Distrubition</h1>
      <div className="inner-chart-container">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
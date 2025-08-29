import './DashBoard.css'

import { useEffect, useState,Fragment } from "react";
import { useNavigate } from "react-router-dom";


import { useAuth } from '../context/AuthContext';


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

type Project = {
  _id: string;
  projectName: string;
  projectDescription: string;
  wallet: string;
  // extend based on backend response
};


export default function Dashboard() {

  const { token } = useAuth();  // ✅ grab token (or user) from context
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProjects = async () => {
      if (!token) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ using context token
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data: Project[] = await response.json();
        setProjects(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [token]); // ✅ re-fetch if token changes

return (
  <div className="dashboard-content">
    {loading ? (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    ) : error ? (
      <div className="error-message">{error}</div>
    ) : projects.length === 0 ? (
      <div className="no-projects">
        <h3>You don’t have any projects yet 🚀</h3>
        <p>Start building your startup journey by creating your first project.</p>
        <button
          className="create-project-btn"
          onClick={() => navigate("/createProject")}
        >
          + Create Project
        </button>
      </div>
    ) : (
      <Fragment>
        <DashboardStats totalUsers={12500} totalEth={342.57} />
        <ChartComponent />
        <TokenHoldings />
      </Fragment>
    )}
  </div>
);
}

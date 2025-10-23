import { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import "./DashBoard.css";

import { useAuth } from "../context/AuthContext";

// Components
import DashboardStats from "../components/DashboardStats";
import TrackingDashboard from "../components/DashBoard/TrackingDashboard";
import TokenHoldings from "../components/TokenHoldings";
import WalletActivity from "../components/DashBoard/WalletActivity";
import TokenMarketData from "../components/DashBoard/TokenMarketData";
import TokenomicsChart from "../components/DashBoard/TokenomicsChart";

// --- Types ---
interface Project {
  _id: string;
  projectName: string;
  projectDescription: string;
  wallet: string;
  // Extend with more fields if backend response includes them
}

export default function Dashboard() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Fetch projects from API ---
  useEffect(() => {
    if (!token) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    const fetchProjects = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error(`Failed to fetch projects (${res.status})`);

        const data: Project[] = await res.json();
        setProjects(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [token]);

  // --- Render Conditions ---
  if (loading) {
    return (
      <div className="dashboard-loader">
        <div className="spinner" />
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">⚠️ {error}</div>;
  }

  if (projects.length === 0) {
    return (
      <div className="no-projects">
        <h3>No projects yet 🚀</h3>
        <p>Start building your startup journey by creating your first project.</p>
        <button
          className="create-project-btn"
          onClick={() => navigate("/createProject")}
        >
          + Create Project
        </button>
      </div>
    );
  }

  // --- Active Project (for simplicity, show first one) ---
  const activeProject = projects[0];

  return (
    <div className="dashboard-content">
      <Fragment>
        <h1 className="dashboard-title">{activeProject.projectName}</h1>

        <DashboardStats totalUsers={12500} totalEth={342.57} />

        <WalletActivity projectId={activeProject._id} />
        <TokenMarketData projectId={activeProject._id} />
        <TrackingDashboard />
        <TokenomicsChart projectId={activeProject._id} />
        <TokenHoldings projectId={activeProject._id} />

        {/* 🚀 Create Landing Page Action */}
        <div className="landing-page-actions">
          <button
            className="create-landing-btn"
            onClick={() => navigate("/createLandingPage")}
          >
            Create Landing Page
          </button>
        </div>
      </Fragment>
    </div>
  );
}

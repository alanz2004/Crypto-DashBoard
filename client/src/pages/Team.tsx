import './Team.css';

import { TeamCard } from '../components/Team/TeamCard';
import TeamTasks from "../components/Team/TeamTasks";
import BlockchainInfo from '../components/Team/BlockchainInfo';


import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Team: React.FC<{ projectId: string }> = ({ projectId }) => {
  const { token } = useAuth();
  const [contractAddress, setContractAddress] = useState<string | null>(null);
  const [deploying, setDeploying] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/projects/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setContractAddress(data.contractAddress || null);
        }
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    };
    fetchProject();
  }, [projectId, token]);

  const handleDeployBlockchain = async () => {
    setDeploying(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/blockchain/deploy/${projectId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to deploy blockchain");
      const data = await res.json();
      setContractAddress(data.contractAddress);
      alert("✅ Blockchain deployed successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to deploy blockchain");
    } finally {
      setDeploying(false);
    }
  };

  return (
    <div className="team-page">
    <h1 className='team-page-title'>Team</h1>
      {!contractAddress && (
        <div className="deploy-blockchain-container">
          <p className="deploy-blockchain-text">
            This project is not deployed to the blockchain yet.
          </p>
          <button
            className="deploy-blockchain-btn"
            onClick={handleDeployBlockchain}
            disabled={deploying}
          >
            {deploying ? "Deploying..." : "Deploy Blockchain"}
          </button>
        </div>
      )}

      <BlockchainInfo />

      <div className="team-grid">
          <TeamCard />
      </div>

      <TeamTasks />
    </div>
  );
};

export default Team;

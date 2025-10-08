import './Team.css';

import { TeamCard } from '../components/Team/TeamCard';
import TeamTasks from "../components/Team/TeamTasks";
import BlockchainInfo from '../components/Team/BlockchainInfo';
import AddTeamMember from '../components/Team/AddTeamMember';


import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface ContractData {
  _id: string;
  projectId: string;
  name: string;
  address: string;
  deployer: string;
  network: string;
  abi: any[];
  bytecode?: string;
  status: string;
  transactionCount: number;
  deploymentDate: string;
}

interface Props {
  projectId: string;
}

const Team: React.FC<Props> = ({ projectId }) => {
  const { token } = useAuth();
  const [contract, setContract] = useState<ContractData | null>(null);
  const [contractAddress, setContractAddress] = useState<string>('');
  const [deploying, setDeploying] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/blockchain/project/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setContract(data[0]);
        }
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    };
    fetchProject();
  }, [projectId, token]);

  // ✅ Deploy and store new contract
  const handleDeployBlockchain = async () => {
    setDeploying(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/blockchain/deploy/${projectId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to deploy blockchain");

      const data = await res.json();
      setContract(data.contract); // store full contract info

      alert("✅ Blockchain deployed successfully!");
    } catch (err) {
      console.error("Error deploying contract:", err);
      alert("❌ Failed to deploy blockchain");
    } finally {
      setDeploying(false);
    }
  };

  return (
    <div className="team-page">
    <h1 className='team-page-title'>Team</h1>
      {!contract && (
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

      {contract && (
        <BlockchainInfo
          data={{
            network: contract.network,
            contractAddress: contract.address,
            deployer: contract.deployer,
            contractName: contract.name,
            totalTransactions: contract.transactionCount,
            deploymentDate: new Date(contract.deploymentDate).toLocaleDateString(),
            status: contract.status === "active" ? "Active" : "Inactive",
          }}
        />
        )}

      <div className="team-grid">
          <TeamCard />
      </div>

        <AddTeamMember projectId={projectId}/>

      <TeamTasks />
    </div>
  );
};

export default Team;

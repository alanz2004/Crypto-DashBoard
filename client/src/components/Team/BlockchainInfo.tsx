import React from "react";
import "./BlockchainInfo.css";

interface BlockchainData {
  network: string;
  contractAddress: string;
  deployer: string;
  contractName: string;
  totalTransactions: number;
  deploymentDate: string;
  status: "Active" | "Inactive";
}

const BlockchainInfo: React.FC = () => {
  const mockData: BlockchainData = {
    network: "Hardhat (Local)",
    contractAddress: "0xAbC12345D67890Ef1234567890AbCdEf12345678",
    deployer: "0xDeAdBeEf1234567890abcdef1234567890abcdef",
    contractName: "ProjectManager",
    totalTransactions: 12,
    deploymentDate: "2025-10-04",
    status: "Active",
  };

  return (
    <div className="blockchain-info-container">
      <h2 className="section-title">Blockchain Overview</h2>

      <div className="info-cards">
        <div className="info-card">
          <span className="label">Network</span>
          <span className="value">{mockData.network}</span>
        </div>
        <div className="info-card">
          <span className="label">Contract Name</span>
          <span className="value">{mockData.contractName}</span>
        </div>
        <div className="info-card">
          <span className="label">Contract Address</span>
          <span className="value address">{mockData.contractAddress}</span>
        </div>
        <div className="info-card">
          <span className="label">Deployer</span>
          <span className="value address">{mockData.deployer}</span>
        </div>
        <div className="info-card">
          <span className="label">Total Transactions</span>
          <span className="value">{mockData.totalTransactions}</span>
        </div>
        <div className="info-card">
          <span className="label">Deployment Date</span>
          <span className="value">{mockData.deploymentDate}</span>
        </div>
        <div className={`info-card status ${mockData.status.toLowerCase()}`}>
          <span className="label">Status</span>
          <span className="value">{mockData.status}</span>
        </div>
      </div>
    </div>
  );
};

export default BlockchainInfo;

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

interface BlockchainInfoProps {
  data: BlockchainData | null; // data comes from parent (can be null while loading)
}

const BlockchainInfo: React.FC<BlockchainInfoProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="blockchain-info-container">
        <h2 className="section-title">Blockchain Overview</h2>
        <p className="loading-text">Fetching blockchain data...</p>
      </div>
    );
  }

  return (
    <div className="blockchain-info-container">
      <h2 className="section-title">BlockChain </h2>

      <div className="info-cards">
        <div className="info-card">
          <span className="label">Network</span>
          <span className="value">{data.network}</span>
        </div>

        <div className="info-card">
          <span className="label">Contract Name</span>
          <span className="value">{data.contractName}</span>
        </div>

        <div className="info-card">
          <span className="label">Contract Address</span>
          <span className="value address">{data.contractAddress}</span>
        </div>

        <div className="info-card">
          <span className="label">Deployer</span>
          <span className="value address">{data.deployer}</span>
        </div>

        <div className="info-card">
          <span className="label">Total Transactions</span>
          <span className="value">{data.totalTransactions}</span>
        </div>

        <div className="info-card">
          <span className="label">Deployment Date</span>
          <span className="value">{data.deploymentDate}</span>
        </div>

        <div className={`info-card status ${data.status.toLowerCase()}`}>
          <span className="label">Status</span>
          <span className="value">{data.status}</span>
        </div>
      </div>
    </div>
  );
};

export default BlockchainInfo;
import React, { useEffect, useRef } from "react";
import "./BlockchainFeature.css";

const BlockchainFeature: React.FC = () => {

  return (
    <section className="blockchain-section">
      <div className="blockchain-content">
        <h2 className="blockchain-title">Blockchain Integration</h2>
        <p className="blockchain-description">
          Our platform empowers you to <span>share files</span> and{" "}
          <span>manage users</span> securely through{" "}
          <strong>smart contracts</strong> on the blockchain.  
          Built using <strong>Hardhat</strong>, it allows seamless deployment and 
          interaction with decentralized applications while maintaining full transparency and ownership.
        </p>
        <p className="blockchain-description">
          Every upload, transaction, and permission update is immutably recorded —
          offering next-level trust and data integrity for your business.
        </p>
      </div>
    </section>
  );
};

export default BlockchainFeature;

import React from 'react';
import './SmartContractsDashboard.css';
import { FaCode, FaShieldAlt, FaFileAlt, FaCubes, FaRocket } from 'react-icons/fa';

const SmartContractsDashboard: React.FC = () => {
  return (
    <div className="smart-contracts-dashboard">
      <h2>⚙️ AI Smart Contract Tools</h2>

      <div className="features-grid">

        {/* Feature 1 */}
        <div className="feature-card">
          <div className="icon"><FaCode /></div>
          <h3>Smart Contract Generator</h3>
          <p>Describe your idea in plain English and generate production-ready Solidity code with AI.</p>
          <div className="component-placeholder">[Generator Component Here]</div>
        </div>

        {/* Feature 2 */}
        <div className="feature-card">
          <div className="icon"><FaShieldAlt /></div>
          <h3>AI Contract Auditor</h3>
          <p>Paste your smart contract and get automatic AI-powered security and gas optimization insights.</p>
          <div className="component-placeholder">[Auditor Component Here]</div>
        </div>

        {/* Feature 3 */}
        <div className="feature-card">
          <div className="icon"><FaFileAlt /></div>
          <h3>Contract Explainer</h3>
          <p>Understand exactly what your smart contract does with clear, plain-language summaries.</p>
          <div className="component-placeholder">[Explainer Component Here]</div>
        </div>

        {/* Feature 4 */}
        <div className="feature-card">
          <div className="icon"><FaCubes /></div>
          <h3>Template Selector</h3>
          <p>Select from templates like ERC20, NFT, and vesting wallets. Easily customize with AI suggestions.</p>
          <div className="component-placeholder">[Template Selector Component Here]</div>
        </div>

        {/* Feature 5 */}
        <div className="feature-card">
          <div className="icon"><FaRocket /></div>
          <h3>Smart Contract Deployer</h3>
          <p>Deploy contracts directly to testnet or mainnet using Metamask or WalletConnect.</p>
          <div className="component-placeholder">[Deploy Tool Component Here]</div>
        </div>

      </div>
    </div>
  );
};

export default SmartContractsDashboard;

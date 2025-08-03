import React from 'react';
import './CreateProject.css';

import projectImage from '../../assets/wallet.png';


interface Props {
  value: string;
  onNext: () => void;
  onBack: () => void;
  onChange: (field: string, value: string) => void;
}

const StepWallet: React.FC<Props> = ({ value, onNext, onBack, onChange }) => {
  return (
    <div className="step-container">
      <div className="step-image">
        <img src='/assets/wallet.png' alt="wallet connection" />
      </div>
      <div className="step-form">
        <h2>🔗 ETH Wallet Address</h2>
        <p>This wallet will be used for holding raised funds, token distribution, and more.</p>
        <input
          type="text"
          placeholder="Enter your Ethereum wallet address"
          value={value}
          onChange={(e) => onChange('wallet', e.target.value)}
        />
        <div className="step-actions">
          <button onClick={onBack}>Back</button>
          <button disabled={!value} onClick={onNext}>Finish</button>
        </div>
      </div>
    </div>
  );
};

export default StepWallet;

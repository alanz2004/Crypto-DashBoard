// components/WalletLinks.tsx
import React from 'react';
import './WalletLinks.css'

const walletAddress = '0xC0ffee254729296a45a3885639AC7E10F9d54979';

const WalletLinks: React.FC = () => {
  return (
    <div className="wallet-links-container">
      <h2 className="wallet-links-title">Wallet Links</h2>

      <div className="wallet-links">
        <a
          href={`https://etherscan.io/address/${walletAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="wallet-link"
        >
          <span className="wallet-link-icon etherscan-icon" />
          Etherscan
        </a>

        <a
          href={`https://debank.com/profile/${walletAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="wallet-link"
        >
          <span className="wallet-link-icon debank-icon" />
          DeBank
        </a>

        <a
          href={`https://ethplorer.io/address/${walletAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="wallet-link"
        >
          <span className="wallet-link-icon ethplorer-icon" />
          Ethplorer
        </a>
      </div>
    </div>
  );
};

export default WalletLinks;
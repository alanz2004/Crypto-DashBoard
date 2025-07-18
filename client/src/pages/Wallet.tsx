// components/WalletPage.tsx
import React from 'react';

type Transaction = {
  id: string;
  type: 'Send' | 'Receive';
  amount: number;
  tokenSymbol: string;
  date: string;
  hash: string;
};

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'Send',
    amount: 1.2,
    tokenSymbol: 'ETH',
    date: '2025-07-15',
    hash: '0xabc123...',
  },
  {
    id: '2',
    type: 'Receive',
    amount: 4.8,
    tokenSymbol: 'ETH',
    date: '2025-07-12',
    hash: '0xdef456...',
  },
  {
    id: '3',
    type: 'Send',
    amount: 0.75,
    tokenSymbol: 'ETH',
    date: '2025-07-10',
    hash: '0xghi789...',
  },
];

const WalletPage: React.FC = () => {
  const walletAddress = '0xC0ffee254729296a45a3885639AC7E10F9d54979';
  const tokenName = 'Ethereum';
  const tokenSymbol = 'ETH';
  const totalTokens = 8.25;

  return (
    <div className="wallet-container">
      <h1 className="wallet-title">🚀 Startup Wallet</h1>

      <div className="wallet-info">
        <div className="wallet-section">
          <h3>🏦 Wallet Address</h3>
          <p className="wallet-address">{walletAddress}</p>
        </div>

        <div className="wallet-section">
          <h3>💰 Total Balance</h3>
          <p>
            <span className="eth-icon" /> {totalTokens} {tokenSymbol}
          </p>
        </div>

        <div className="wallet-section">
          <h3>🔗 Token Metadata</h3>
          <p>Name: {tokenName}</p>
          <p>Symbol: {tokenSymbol}</p>
        </div>
      </div>

      <div className="wallet-transactions">
        <h2>📄 Last Transactions</h2>
        <div className="transaction-list">
          {mockTransactions.map((tx) => (
            <div className="transaction-card" key={tx.id}>
              <div className="transaction-header">
                <span className={`tx-type ${tx.type.toLowerCase()}`}>
                  {tx.type === 'Send' ? '🔼 Send' : '🔽 Receive'}
                </span>
                <span>{tx.date}</span>
              </div>
              <p className="tx-amount">{tx.amount} ETH</p>
              <p className="tx-hash">Hash: {tx.hash}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;

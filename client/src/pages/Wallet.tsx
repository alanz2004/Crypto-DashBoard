import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./Wallet.css";

import WalletLinks from "../components/WalletLinks";

type Transaction = {
  id: string;
  type: "Send" | "Receive";
  amount: number;
  tokenSymbol: string;
  date: string;
  hash: string;
};

const WalletPage: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(
    localStorage.getItem("walletAddress")
  );
  const [balance, setBalance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const tokenName = "Ethereum";
  const tokenSymbol = "ETH";

  const mockTransactions: Transaction[] = [
    {
      id: "1",
      type: "Send",
      amount: 1.2,
      tokenSymbol: "ETH",
      date: "2025-07-15",
      hash: "0xabc123...",
    },
    {
      id: "2",
      type: "Receive",
      amount: 4.8,
      tokenSymbol: "ETH",
      date: "2025-07-12",
      hash: "0xdef456...",
    },
    {
      id: "3",
      type: "Send",
      amount: 0.75,
      tokenSymbol: "ETH",
      date: "2025-07-10",
      hash: "0xghi789...",
    },
  ];

  const connectWallet = async () => {
    if (!(window as any).ethereum) {
      setError("MetaMask not detected. Please install MetaMask.");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const account = await signer.getAddress();
      setWalletAddress(account);
      localStorage.setItem("walletAddress", account);

      const balanceWei = await provider.getBalance(account);
      const balanceEth = parseFloat(ethers.utils.formatEther(balanceWei));
      setBalance(balanceEth);
    } catch (err) {
      console.error(err);
      setError("Failed to connect wallet.");
    }
  };

  useEffect(() => {
    if (walletAddress && balance === null) {
      connectWallet();
    }
  }, []);

  return (
    <div className="wallet-container">
      <h1 className="wallet-title">🚀 Wallet</h1>

      {!walletAddress ? (
        <button className="connect-btn" onClick={connectWallet}>
          Connect MetaMask
        </button>
      ) : (
        <div className="wallet-info">
          <div className="wallet-section">
            <h3>🏦 Wallet Address</h3>
            <p className="wallet-address">{walletAddress}</p>
          </div>

          <div className="wallet-section">
            <h3>💰 Total Balance</h3>
            <p>
              <span className="eth-icon" />{" "}
              {balance !== null ? balance.toFixed(4) : "..."} {tokenSymbol}
            </p>
          </div>

          <div className="wallet-section">
            <h3>🔗 Token Metadata</h3>
            <p>Name: {tokenName}</p>
            <p>Symbol: {tokenSymbol}</p>
          </div>
        </div>
      )}

      <div className="wallet-transactions">
        <h2>📄 Last Transactions</h2>
        <div className="transaction-list">
          {mockTransactions.map((tx) => (
            <div className="transaction-card" key={tx.id}>
              <div className="transaction-header">
                <span className={`tx-type ${tx.type.toLowerCase()}`}>
                  {tx.type === "Send" ? "🔼 Send" : "🔽 Receive"}
                </span>
                <span>{tx.date}</span>
              </div>
              <p className="tx-amount">{tx.amount} ETH</p>
              <p className="tx-hash">Hash: {tx.hash}</p>
            </div>
          ))}
        </div>
      </div>

      

      <WalletLinks />
    </div>
  );
};

export default WalletPage;


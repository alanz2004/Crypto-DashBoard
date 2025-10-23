import React, { useEffect, useState } from "react";
import {
  BrowserProvider,   // replaces ethers.providers.Web3Provider
  formatEther        // replaces ethers.utils.formatEther
} from "ethers";
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
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);

  const tokenName = "Ethereum";
  const tokenSymbol = "ETH";

  // ✅ Connect wallet
  const connectWallet = async () => {
    if (!(window as any).ethereum) {
      setError("MetaMask not detected. Please install MetaMask.");
      return;
    }

    try {
      const provider = new BrowserProvider((window as any).ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const account = await signer.getAddress();

      setWalletAddress(account);
      localStorage.setItem("walletAddress", account);

      const balanceWei = await provider.getBalance(account);
      const balanceEth = parseFloat(formatEther(balanceWei));
      setBalance(balanceEth);

      await fetchTransactions(account);
    } catch (err) {
      console.error(err);
      setError("Failed to connect wallet.");
    }
  };

  // ✅ Fetch transactions from Etherscan API
  const fetchTransactions = async (address: string) => {
    try {
      const apiKey = "PVREZKYJ84WK3TKTDT6SHVZCUUCMEYY9BB"; // replace with your real key
      const response = await fetch(
        `https://api.etherscan.io/v2/api?chainid=1&module=account&action=txlist&address=${address}&sort=desc&apikey=${apiKey}`
      );

      const data = await response.json();

      if (data.status === "1" && Array.isArray(data.result)) {
        const txs = data.result.slice(0, 5).map((tx: any) => ({
          id: tx.hash,
          type:
            tx.from.toLowerCase() === address.toLowerCase()
              ? "Send"
              : "Receive",
          amount: parseFloat(formatEther(tx.value)),
          tokenSymbol: "ETH",
          date: new Date(parseInt(tx.timeStamp) * 1000).toLocaleDateString(),
          hash: tx.hash,
        }));

        setTransactions(txs);
      } else {
        console.warn("No transactions found or API limit reached");
      }
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  useEffect(() => {
    if (walletAddress && balance === null) {
      connectWallet();
    } else if (walletAddress) {
      fetchTransactions(walletAddress);
    }
  }, [walletAddress]);

  return (
    <div className="wallet-container">
      <h1 className="wallet-title">Wallet</h1>

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
          {transactions.length > 0 ? (
            transactions.map((tx) => (
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
            ))
          ) : (
            <p className="no-transactions">No recent transactions found.</p>
          )}
        </div>
      </div>

      <WalletLinks />
    </div>
  );
};

export default WalletPage;

import React, { useEffect, useState } from "react";
import "./WalletActivity.css";

import { useAuth } from '../../context/AuthContext';


interface GrowthData {
  transactionGrowth: number;
  valueGrowth: number;
  trend: "up" | "down" | "neutral";
}

interface WalletData {
  wallet: string;
  transactionCount: number;
  totalValueUSD: number;
  avgTransactionValueUSD: number;
  activeDays: number;
  adoptionScore: number;
  growth: GrowthData;
  lastUpdated: string;
}

interface WalletActivityProps {
  projectId: string;
}

const WalletActivity: React.FC<WalletActivityProps> = ({ projectId }) => {

  const { token } = useAuth();  // ✅ grab token (or user) from context
  const [data, setData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/projects/${projectId}/trackWallet`,
          {
            credentials: "include",
            headers: {
                Authorization: `Bearer ${token}`, // ✅ using context token
            }
          }
        );
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Failed to fetch wallet data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, [projectId]);

  if (loading) {
    return <div className="wallet-loading">Fetching cosmic data...</div>;
  }

  if (!data) {
    return <div className="wallet-error">No data available.</div>;
  }

  return (
    <div className="wallet-activity-container">
      <h2 className="wallet-title">🔮 Wallet Analytics</h2>

      <div className="wallet-grid">
        <div className="wallet-card">
          <h4>Wallet Address</h4>
          <p className="wallet-address">{data.wallet}</p>
        </div>

        <div className="wallet-card">
          <h4>Transaction Count</h4>
          <p>{data.transactionCount.toLocaleString()}</p>
        </div>

        <div className="wallet-card">
          <h4>Total Value (USD)</h4>
          <p>${data.totalValueUSD.toLocaleString()}</p>
        </div>

        <div className="wallet-card">
          <h4>Average Tx Value</h4>
          <p>${data.avgTransactionValueUSD.toFixed(2)}</p>
        </div>

        <div className="wallet-card">
          <h4>Active Days</h4>
          <p>{data.activeDays}</p>
        </div>

        <div className="wallet-card">
          <h4>Adoption Score</h4>
          <p>{data.adoptionScore}%</p>
        </div>

        <div className="wallet-card">
          <h4>Growth (Transactions)</h4>
          <p
            className={`growth ${
              data.growth.trend === "up"
                ? "up"
                : data.growth.trend === "down"
                ? "down"
                : "neutral"
            }`}
          >
            {data.growth.transactionGrowth}% ({data.growth.trend})
          </p>
        </div>

        <div className="wallet-card">
          <h4>Growth (Value)</h4>
          <p
            className={`growth ${
              data.growth.trend === "up"
                ? "up"
                : data.growth.trend === "down"
                ? "down"
                : "neutral"
            }`}
          >
            {data.growth.valueGrowth}% ({data.growth.trend})
          </p>
        </div>
      </div>

      <div className="wallet-footer">
        <p>Last Updated: {new Date(data.lastUpdated).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default WalletActivity;

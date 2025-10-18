import React, { useEffect, useState } from "react";
import "./TokenMarketData.css";

import { useAuth } from '../../context/AuthContext';


interface MarketData {
  tokenName: string;
  currentPrice: number;
  priceChange24h: number;
  marketCap: number;
  liquidity: number;
  volume24h: number;
  sources: { name: string; url: string }[];
  lastUpdated: string;
}

const TokenMarketData: React.FC<{ projectId: string }> = ({ projectId }) => {
   const { token } = useAuth();  // ✅ grab token (or user) from context
  const [data, setData] = useState<MarketData | null>(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/projects/${projectId}/marketokendata`, {
          credentials: "include",
          headers: {
                Authorization: `Bearer ${token}`, // ✅ using context token
            }
        });
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Fetch Market Data Error:", error);
      }
    };

    fetchMarketData();
  }, [projectId]);

  if (!data) return <div className="market-container">Loading market data...</div>;

  return (
    <div className="market-container">
      <h2 className="market-title">{data.tokenName.toUpperCase()} Market Overview</h2>

      <div className="market-stats">
        <div className="market-card">
          <h3>Current Price</h3>
          <p>${data.currentPrice.toFixed(6)}</p>
        </div>
        <div className={`market-card ${data.priceChange24h >= 0 ? "positive" : "negative"}`}>
          <h3>24h Change</h3>
          <p>{data.priceChange24h}%</p>
        </div>
        <div className="market-card">
          <h3>Market Cap</h3>
          <p>${data.marketCap.toLocaleString()}</p>
        </div>
        <div className="market-card">
          <h3>Liquidity</h3>
          <p>${data.liquidity.toLocaleString()}</p>
        </div>
        <div className="market-card">
          <h3>24h Volume</h3>
          <p>${data.volume24h.toLocaleString()}</p>
        </div>
      </div>

      <div className="market-sources">
        <h3>Sources</h3>
        <div className="source-links">
          {data.sources.map((s, i) => (
            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="source-link">
              {s.name}
            </a>
          ))}
        </div>
      </div>

      <p className="updated">Last updated: {new Date(data.lastUpdated).toLocaleTimeString()}</p>
    </div>
  );
};

export default TokenMarketData;
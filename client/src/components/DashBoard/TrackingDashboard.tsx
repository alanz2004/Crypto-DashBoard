import React from "react";
import "./TrackingDashboard.css";

const trackingFeatures = [
  {
    title: "Wallet Growth & Activity",
    desc: "Monitor how many unique wallets interact with your project and track holder growth over time.",
    action: "View Wallet Data",
  },
  {
    title: "Transaction Volume & Value",
    desc: "Track transaction counts and total on-chain value to understand your token's activity and adoption.",
    action: "Analyze Transactions",
  },
  {
    title: "Smart Contract Interactions",
    desc: "Measure how often users call your contract functions like staking or governance actions.",
    action: "View Contract Logs",
  },
  {
    title: "Token Price & Market Cap",
    desc: "See live token price, liquidity pool data, and market cap changes across exchanges.",
    action: "Track Token",
  },
  {
    title: "User Engagement",
    desc: "Understand how users interact with your dApp frontend to improve retention and UX.",
    action: "View Engagement",
  },
  {
    title: "Cross-Project Interactions",
    desc: "Detect shared activity or partnerships between projects on your platform.",
    action: "View Collaborations",
  },
  {
    title: "Protocol Health",
    desc: "Monitor gas usage, failed transactions, and on-chain performance issues.",
    action: "Check Health",
  },
  {
    title: "Community Sentiment",
    desc: "Analyze social media mentions and sentiment to gauge community trust and buzz.",
    action: "Analyze Sentiment",
  },
];

const TrackingDashboard: React.FC = () => {
  return (
    <div className="tracking-dashboard-container">
      <h1 className="dashboard-title">Tracking Tools</h1>
      <div className="tracking-grid">
        {trackingFeatures.map((feature, index) => (
          <div className="tracking-card" key={index}>
            <h3 className="tracking-title">{feature.title}</h3>
            <p className="tracking-desc">{feature.desc}</p>
            <button className="tracking-btn">{feature.action}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackingDashboard;

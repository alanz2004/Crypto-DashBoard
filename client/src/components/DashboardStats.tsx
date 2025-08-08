import React, { useEffect, useState } from "react";
import "./DashboardStats.css";
import { FaUsers, FaWallet } from "react-icons/fa";

interface DashboardStatsProps {
  totalUsers: number;
  totalEth: number;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ totalUsers, totalEth }) => {
  const [displayUsers, setDisplayUsers] = useState(0);
  const [displayEth, setDisplayEth] = useState(0);

  // Number animation effect
  useEffect(() => {
    let startUsers = 0;
    let startEth = 0;
    const duration = 1500; // ms
    const startTime = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      setDisplayUsers(Math.floor(progress * totalUsers));
      setDisplayEth(parseFloat((progress * totalEth).toFixed(2)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [totalUsers, totalEth]);

  return (
   <div className="dashboard-stats-section">
  <h2 className="dashboard-stats-title">Platform Overview</h2>

  <div className="dashboard-stats">
    <div className="stat-card">
      <FaUsers className="stat-icon users-icon" />
      <div>
        <h2>{displayUsers.toLocaleString()}</h2>
        <p>Total Users</p>
      </div>
    </div>

    <div className="stat-card">
      <FaWallet className="stat-icon wallet-icon" />
      <div>
        <h2>{displayEth.toLocaleString()} ETH</h2>
        <p>Total ETH in Wallet</p>
      </div>
    </div>
  </div>
</div>

  );
};

export default DashboardStats;

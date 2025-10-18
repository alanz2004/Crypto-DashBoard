import React from "react";
import "./AnalyticsOverviewSection.css";

const AnalyticsOverviewSection: React.FC = () => {
  return (
    <section className="analytics-overview">
      <div className="analytics-text">
        <h1 className="analytics-title">Cosmic Analytics Dashboard</h1>

        <p className="analytics-desc">
          The <strong>Cosmic Analytics Dashboard</strong> transforms raw blockchain data into
          intelligent visual insights. Track <strong>wallet evolution</strong>, liquidity trends,
          and <strong>market cap changes</strong> — all in real time.
        </p>

        <p className="analytics-desc">
          Powered by <strong>on-chain analysis</strong> and <strong>AI data modeling</strong>, it
          delivers performance metrics, token activity heatmaps, and adoption forecasts through a
          seamless, futuristic interface.
        </p>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>🚀 Wallet Intelligence</h3>
            <p>
              Visualize your wallet’s transactional growth and historical evolution — see where your
              value is flowing and how your assets scale over time.
            </p>
          </div>

          <div className="feature-card">
            <h3>💠 Token Market Engine</h3>
            <p>
              Monitor real-time token price movements, liquidity pool shifts, and cross-exchange
              market cap analytics — all harmonized into a sleek interface.
            </p>
          </div>

          <div className="feature-card">
            <h3>📊 Predictive Growth Metrics</h3>
            <p>
              Get algorithm-driven predictions and long-term adoption trajectories powered by
              adaptive market learning and trend recognition models.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsOverviewSection;

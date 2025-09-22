import React from "react";
import './MarketingRoadMap.css';


const MarketingRoadmap: React.FC = () => {
  return (
    <div className="marketing-roadmap">
      <h2 className="marketing-roadmap-title">🚀 Marketing Roadmap for Your Crypto Startup</h2>
      <div className="marketing-roadmap-list">
        <div className="marketing-roadmap-card">
          <h3>🐦 Twitter (X)</h3>
          <p>Create a Twitter account to build hype and update your community in real time.</p>
        </div>

        <div className="marketing-roadmap-card">
          <h3>💬 Discord Server</h3>
          <p>Set up a Discord for real-time community building, support, and governance discussions.</p>
        </div>

        <div className="marketing-roadmap-card">
          <h3>📢 Telegram Channel</h3>
          <p>Telegram is a must for crypto communities. Fast, global, and easy to scale engagement.</p>
        </div>

        <div className="marketing-roadmap-card">
          <h3>🌐 Website + Medium</h3>
          <p>Have a clear landing page and blog posts explaining your project, tokenomics, and roadmap.</p>
        </div>

        <div className="marketing-roadmap-card">
          <h3>🌍 Community Groups</h3>
          <p>Join crypto subreddits, Telegram groups, and Discord servers to connect with early adopters.</p>
        </div>

        <div className="marketing-roadmap-card">
          <h3>📊 Crypto Directories</h3>
          <p>Submit your project to CoinGecko, CoinMarketCap, and niche directories to gain visibility.</p>
        </div>

        <div className="marketing-roadmap-card">
          <h3>🎤 AMA (Ask Me Anything)</h3>
          <p>Host AMAs on Twitter Spaces, Reddit, or Discord to gain credibility and attract users.</p>
        </div>

        <div className="marketing-roadmap-card">
          <h3>📰 Visibility & PR</h3>
          <p>
            Get featured in crypto news sites, podcasts, and newsletters.  
            Partner with influencers and thought leaders to increase awareness.  
            Press releases on CoinTelegraph, Decrypt, or niche blogs can give your project legitimacy.  
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketingRoadmap;


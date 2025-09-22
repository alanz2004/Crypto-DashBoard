import React from "react";
import "./MarketingPage.css";

import SocialMediaPostGenerator from "../components/Marketing/SocialMediaPostGenerator";

const MarketingPage: React.FC = () => {
  return (
    <div className="marketing-container">
      <h1 className="marketing-title">Marketing</h1>
      <div className="marketing-features">
        {/* Placeholder cards for future features */}
        <div className="feature-card"><SocialMediaPostGenerator /></div>
        <div className="feature-card">Feature Placeholder 2</div>
        <div className="feature-card">Feature Placeholder 3</div>
      </div>
    </div>
  );
};

export default MarketingPage;

import React from "react";
import "./MarketingPage.css";

import SocialMediaPostGenerator from "../components/Marketing/SocialMediaPostGenerator";
import MarketingRoadMap from "../components/Marketing/MarketingRoadMap";

const MarketingPage: React.FC = () => {
  return (
    <div className="marketing-container">
      <h1 className="marketing-title">Marketing</h1>
      <div className="marketing-features">
        {/* Placeholder cards for future features */}
        <div className="feature-card"><SocialMediaPostGenerator /></div>
      </div>
      <MarketingRoadMap />
    </div>
  );
};

export default MarketingPage;

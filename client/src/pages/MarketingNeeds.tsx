import React from "react";
import "./MarketingNeeds.css";

import NavBarHome from '../components/NavBars/NavBarHome';


const MarketingNeeds: React.FC = () => {
  const categories = [
    {
      title: "Brand Awareness",
      description:
        "Building trust and visibility is critical in crypto, where scams are common.",
      needs: [
        "Professional brand identity (logo, colors, website)",
        "Strong social media presence (Twitter/X, Telegram, Discord, Reddit)",
        "PR campaigns and crypto news coverage",
      ],
      pain: "Many small startups don’t have marketing teams or budgets.",
    },
    {
      title: "Community Building",
      description: "Crypto projects rely heavily on communities for adoption.",
      needs: [
        "Active social channels",
        "Telegram, Discord, and forum moderation",
        "Community engagement tools (AMA sessions, polls)",
      ],
      pain: "Managing multiple channels is time-consuming.",
    },
    {
      title: "Content Marketing",
      description: "Education-focused content builds credibility.",
      needs: [
        "Blog posts, tutorials, explainer videos",
        "Tokenomics and roadmap explanation",
        "Whitepapers and litepapers",
      ],
      pain: "Content must be clear and professional to attract investors.",
    },
    {
      title: "Advertising & Promotions",
      description:
        "Paid advertising is tricky because crypto is restricted on many platforms.",
      needs: [
        "Targeted campaigns on crypto-friendly platforms (Coinzilla, Bitmedia, CoinTraffic)",
        "Social media campaigns (X/Twitter, LinkedIn, Telegram Ads)",
        "Influencer marketing",
      ],
      pain: "Compliance and ad copy restrictions make it complicated.",
    },
    {
      title: "Email & Retargeting",
      description: "Building a mailing list for token launches and updates is key.",
      needs: [
        "Newsletter system",
        "Automated email campaigns",
        "Retargeting campaigns for website visitors",
      ],
      pain: "Many startups fail to capture leads early.",
    },
    {
      title: "Analytics & Performance Tracking",
      description: "Must track which channels and campaigns convert.",
      needs: [
        "Website analytics",
        "Social media analytics",
        "Campaign ROI tracking",
      ],
      pain: "Hard to track campaigns across multiple channels without a dashboard.",
    },
  ];

  return (
    <div className="marketing-container">
        <NavBarHome />
      <h1 className="marketing-title">
        🚀 Key Marketing & Advertising Needs for New Crypto Startups
      </h1>
      <p className="marketing-subtitle">
        Marketing is often the deciding factor between a successful crypto launch
        and one that fades away. Here’s what every startup needs:
      </p>

      <div className="needs-grid">
        {categories.map((cat, index) => (
          <div key={index} className="need-card">
            <h2 className="need-title">{cat.title}</h2>
            <p className="need-description">{cat.description}</p>
            <h3 className="section-subtitle">✅ Needs:</h3>
            <ul className="needs-list">
              {cat.needs.map((need, i) => (
                <li key={i}>{need}</li>
              ))}
            </ul>
            <h3 className="section-subtitle pain">⚠️ Pain Point:</h3>
            <p className="pain-text">{cat.pain}</p>
          </div>
        ))}
      </div>
      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} CRAIS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MarketingNeeds;

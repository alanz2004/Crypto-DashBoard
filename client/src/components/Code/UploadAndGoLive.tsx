import React, { useState } from "react";
import "./UploadAndGoLive.css";

interface Platform {
  name: string;
  description: string;
  link: string;
  connected?: boolean;
  stats?: {
    liveUrl: string;
    visits: number;
    deployments: number;
  };
}

const UploadAndGoLive: React.FC = () => {
  const [platforms, setPlatforms] = useState<Platform[]>([
    {
      name: "Vercel",
      description: "Fast and modern deployment for frontend apps with easy GitHub integration.",
      link: "https://vercel.com/",
    },
    {
      name: "Netlify",
      description: "Seamless deployment for static sites and serverless functions.",
      link: "https://www.netlify.com/",
    },
    {
      name: "Fleek",
      description: "Specialized for Web3 & DeFi hosting, deploy directly to IPFS and Filecoin.",
      link: "https://fleek.xyz/",
    },
  ]);

  const connectPlatform = (name: string) => {
    setPlatforms((prev) =>
      prev.map((platform) =>
        platform.name === name
          ? {
              ...platform,
              connected: true,
              stats: {
                liveUrl: `https://${name.toLowerCase()}.com/myproject`,
                visits: Math.floor(Math.random() * 1000),
                deployments: Math.floor(Math.random() * 10),
              },
            }
          : platform
      )
    );
  };

  return (
    <div className="upload-container">
      <h2 className="upload-title"> Upload & Go Live</h2>
      <p className="upload-subtitle">
        Choose your preferred platform to deploy your DeFi project.
      </p>
      <div className="platforms">
        {platforms.map((platform) => (
          <div key={platform.name} className={`platform-card ${platform.connected ? "connected" : ""}`}>
            <h3>{platform.name}</h3>
            <p>{platform.description}</p>

            {!platform.connected ? (
              <a
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                className="platform-link"
                onClick={() => connectPlatform(platform.name)}
              >
                Connect & Deploy
              </a>
            ) : (
              <div className="platform-stats">
                <p><strong>✅ Connected!</strong></p>
                <p>Live URL: <a href={platform.stats?.liveUrl} target="_blank">{platform.stats?.liveUrl}</a></p>
                <p>Visits: {platform.stats?.visits}</p>
                <p>Deployments: {platform.stats?.deployments}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadAndGoLive;
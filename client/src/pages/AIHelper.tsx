import React, { useState } from "react";
import "./AIHelper.css";

import TokenomicsHelper from "../components/AITools/TokenomicsHelper";
import FundraisingRounds from "../components/AITools/FundraisingRounds";
import FundraisingRecommendation from "../components/AITools/FundraisingRecommendation";
import RoadmapBuilder from "../components/AITools/RoadmapBuilder";
import ToolSection from "../components/AITools/ToolSection";

// --- Types ---
interface Member {
  name: string;
  role: string;
  description: string;
}

// --- Utility: Generate Role-Based Description ---
const generateDescription = (name: string, role: string): string => {
  const roleLower = role.toLowerCase();

  switch (true) {
    case roleLower.includes("ceo"):
      return `${name} is the strategic leader of the company, overseeing vision, operations, and fundraising.`;
    case roleLower.includes("engineer") || roleLower.includes("developer"):
      return `${name} is responsible for developing and maintaining the technical foundation of the startup.`;
    case roleLower.includes("growth"):
      return `${name} drives user acquisition, community engagement, and strategic partnerships.`;
    case roleLower.includes("marketing"):
      return `${name} leads marketing campaigns to grow brand awareness and customer engagement.`;
    case roleLower.includes("product"):
      return `${name} defines and manages the product roadmap to align with user needs and business goals.`;
    default:
      return `${name} plays a critical role in the startup, contributing their expertise as ${role}.`;
  }
};

// --- Main Component ---
const AIHelper: React.FC<{ projectId: string }> = ({ projectId }) => {
  const [inputText, setInputText] = useState("");
  const [team, setTeam] = useState<Member[]>([]);

  const handleGenerate = () => {
    const members = inputText
      .split("\n")
      .map((line) => {
        const [name, role] = line.split(":").map((s) => s.trim());
        return name && role
          ? { name, role, description: generateDescription(name, role) }
          : null;
      })
      .filter((member): member is Member => Boolean(member));

    setTeam(members);
  };

  return (
    <div className="ai-helper-page">
      <header className="page-header">
        <h1>AI Helper</h1>
        <p>Use powerful AI tools to accelerate your crypto startup development.</p>
      </header>

      <div className="tools-container">
        {/* Website Helper */}
        <ToolSection
          title="Website Helper"
          description="Generate team sections and other website components using AI."
          renderContent={() => (
            <>
              <p>
                Enter team members in the format: <code>Name: Role</code>
              </p>

              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Alan Starobinski: CEO\nSarah Dahan: Smart Contract Engineer`}
              />

              <button className="tool-button" onClick={handleGenerate}>
                Generate Section
              </button>

              {team.length > 0 && (
                <section className="team-section">
                  <h3 className="team-title">Meet the Team</h3>
                  <div className="team-list">
                    {team.map(({ name, role, description }) => (
                      <div className="team-card" key={name}>
                        <div className="avatar-placeholder" />
                        <h4>{name}</h4>
                        <p className="team-role">{role}</p>
                        <p className="team-description">{description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        />

        {/* Tokenomics Helper */}
        <ToolSection
          title="Tokenomics Helper"
          description="Design token allocations and utility models with AI-driven insights."
          renderContent={() => <TokenomicsHelper projectId={projectId} />}
        />

        {/* Fundraising Tools */}
        <ToolSection
          title="Fundraising Rounds"
          description="Plan your token distribution and capital raise strategy."
          renderContent={() => <FundraisingRounds />}
        />

        <ToolSection
          title="Fundraising Recommendations"
          description="AI-driven suggestions for raise amounts, pricing, and allocation."
          renderContent={() => <FundraisingRecommendation />}
        />

        {/* Roadmap Builder */}
        <ToolSection
          title="Roadmap Builder"
          description="Build a tailored roadmap aligned with your project's growth stage."
          renderContent={() => <RoadmapBuilder />}
        />

        {/* Whitepaper Assistant */}
        <ToolSection
          title="Whitepaper Assistant"
          description="Generate a professional whitepaper draft with AI support."
          renderContent={() => (
            <p style={{ color: "#64748b" }}>Coming soon...</p>
          )}
        />
      </div>
    </div>
  );
};

export default AIHelper;

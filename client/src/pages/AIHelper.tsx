import './AIHelper.css'

import React, { useState } from 'react';
import TokenomicsHelper from '../components/TokenomicsHelper';
import FundraisingRounds from '../components/FundraisingRounds';
import FundraisingRecommendation from '../components/FundraisingRecommendation';
import RoadmapBuilder from '../components/RoadmapBuilder';
import ToolSection from '../components/ToolSection';

interface Member {
  name: string;
  role: string;
  description: string;
}

const generateDescription = (name: string, role: string): string => {
  const roleLower = role.toLowerCase();

  if (roleLower.includes('ceo')) {
    return `${name} is the strategic leader of the company, overseeing vision, operations, and fundraising.`;
  } else if (roleLower.includes('engineer') || roleLower.includes('developer')) {
    return `${name} is responsible for developing and maintaining the technical foundation of the startup.`;
  } else if (roleLower.includes('growth')) {
    return `${name} drives user acquisition, community engagement, and strategic partnerships.`;
  } else if (roleLower.includes('marketing')) {
    return `${name} leads marketing campaigns to grow brand awareness and customer engagement.`;
  } else if (roleLower.includes('product')) {
    return `${name} defines and manages the product roadmap to align with user needs and business goals.`;
  }

  return `${name} plays a critical role in the startup, contributing their expertise as ${role}.`;
};

const TeamGenerator: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [team, setTeam] = useState<Member[]>([]);

  const handleGenerate = () => {
    const members = inputText.split('\n').map((line) => {
      const [name, role] = line.split(':').map((s) => s.trim());
      return {
        name,
        role,
        description: generateDescription(name, role),
      };
    }).filter((m) => m.name && m.role);

    setTeam(members);
  };

  return (
    <div className="ai-helper-page">
      <header className="page-header">
        <h1>AI Helper</h1>
        <p>Use powerful AI tools to build your crypto startup faster.</p>
      </header>

            <div className="tools-container">
                  <ToolSection
                    title="Website Helper"
                    description="Generate a team section and other website components using AI."
                    renderContent={() => (
                      <>
                        <p>Enter team members in format: <code>Name: Role</code></p>
                        <textarea
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          placeholder={`Alan Starobinski: CEO\nSarah Dahan: Smart Contract Engineer`}
                        />
                        <button className="tool-button" onClick={handleGenerate}>Generate Section</button>
                        {team.length > 0 && (
                          <section className="team-section">
                            <h3 className="team-title">Meet the Team</h3>
                            <div className="team-list">
                              {team.map((member) => (
                                <div className="team-card" key={member.name}>
                                  <div className="avatar-placeholder" />
                                  <h4>{member.name}</h4>
                                  <p className="team-role">{member.role}</p>
                                  <p className="team-description">{member.description}</p>
                                </div>
                              ))}
                            </div>
                          </section>
                        )}
                      </>
                    )}
                  />

                  <ToolSection
                    title="Tokenomics Helper"
                    description="Design smart token allocations and utility models with AI."
                    renderContent={() => <TokenomicsHelper />}
                  />

                  <ToolSection
                    title="Fundraising Rounds"
                    description="Plan your raise and token distribution strategy with AI-assisted guidance."
                    renderContent={() => <FundraisingRounds />}
                  />

                  <ToolSection
                    title="Fundraising Recommendations"
                    description="Use AI to generate ideal raise amounts, prices, and token allocation."
                    renderContent={() => <FundraisingRecommendation />}
                  />

                  <ToolSection
                    title="Roadmap Builder"
                    description="Create a startup roadmap tailored to your project stage and vision."
                    renderContent={() => <RoadmapBuilder />}
                  />

                  <ToolSection
                    title="Whitepaper Assistant"
                    description="Generate a high-quality whitepaper draft with the help of AI."
                    renderContent={() => <p style={{ color: '#64748b' }}>Coming soon...</p>}
                    />
              </div>

     
    </div>
  );
};

export default TeamGenerator;
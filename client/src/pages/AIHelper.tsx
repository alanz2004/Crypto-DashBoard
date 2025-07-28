import React, { useState } from 'react';
import TokenomicsHelper from '../components/TokenomicsHelper';
import FundraisingRounds from '../components/FundraisingRounds';
import FundraisingRecommendation from '../components/FundraisingRecommendation';
import RoadmapBuilder from '../components/RoadmapBuilder';

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
        {/* Website Helper with Live Team Generator */}
        <div className="tool-card tool-website">
          <h2>Website Helper</h2>
          <p>Generate a team section and other website components using AI.</p>
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
        </div>

        {/* Other cards - Coming soon */}
        <div className="tool-card tool-funding"  onClick={() => {
  const section = document.getElementById('funding-rounds');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}}>
          <h2>Funding Helper</h2>
          <p>Plan fundraising rounds and get AI-generated pitch suggestions.</p>
          <span className="coming-soon">Plan Fundraising Rounds</span>
        </div>

        <div className="tool-card tool-tokenomics" onClick={() => {
  const section = document.getElementById('tokenomics-helper');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}}>
          <h2>Tokenomics Helper</h2>
          <p>Design smart token allocations and utility models with AI.</p>
          <span className="coming-soon">Create Me Tokenomics</span>
        </div>

        <div className="tool-card tool-roadmap"  onClick={() => {
  const section = document.getElementById('roadmap-container');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}}>
          <h2>Roadmap Builder</h2>
          <p>Create a startup roadmap tailored to your stage and vision.</p>
          <span className="coming-soon">Create Road Map</span>
        </div>

        <div className="tool-card tool-whitepaper">
          <h2>Whitepaper Assistant</h2>
          <p>Generate a structured, high-quality whitepaper using AI.</p>
          <span className="coming-soon">Coming Soon</span>
        </div>
      </div>


      <div className='tools-ai-container'>
             <TokenomicsHelper />

            <FundraisingRounds />

            <FundraisingRecommendation />

            <RoadmapBuilder />
      </div>
     
    </div>
  );
};

export default TeamGenerator;
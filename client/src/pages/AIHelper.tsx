import React, { useState } from 'react';

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
    <div className="ai-helper-container">
      <h1>👥 AI Team Section Generator</h1>
      <p>Enter team members in format: <code>Name: Role</code></p>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Alan Starobinski: CEO\nSarah Dahan: Smart Contract Engineer"
      />
      <button onClick={handleGenerate}>Generate Section</button>

      {team.length > 0 && (
        <section className="team-section">
          <h2 className="team-title">Meet the Team</h2>
          <div className="team-list">
            {team.map((member) => (
              <div className="team-card" key={member.name}>
                <div className="avatar-placeholder" />
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-description">{member.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default TeamGenerator;
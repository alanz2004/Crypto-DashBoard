import React, { useState } from 'react';

const AIHelperPage: React.FC = () => {
  const [teamInput, setTeamInput] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  const handleGenerate = () => {
    const members = teamInput
      .split('\n')
      .map((line) => {
        const [name, role] = line.split(':').map((s) => s.trim());
        return { name, role };
      })
      .filter((m) => m.name && m.role);

    const jsx = `
<div className="team-section">
  <h2>Meet the Team</h2>
  <div className="team-list">
    ${members
      .map(
        (member) => `
      <div className="team-card">
        <div className="avatar-placeholder"></div>
        <h3>${member.name}</h3>
        <p>${member.role}</p>
      </div>
    `
      )
      .join('')}
  </div>
</div>`;

    setGeneratedCode(jsx);
  };

  return (
    <div className="ai-helper-container">
      <h1>🧠 AI Startup Helper</h1>

      <div className="tool-box">
        <h2>👥 Team Section Generator</h2>
        <p>Enter your team members in this format: <code>Name: Role</code></p>
        <textarea
          value={teamInput}
          onChange={(e) => setTeamInput(e.target.value)}
          placeholder="Alan Starobinski: CEO\nSarah Dahan: Engineer"
        ></textarea>
        <button onClick={handleGenerate}>Generate Team Section</button>

        {generatedCode && (
          <div className="generated-output">
            <h3>💻 Generated Code:</h3>
            <pre>{generatedCode}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIHelperPage;
import React, { useState } from 'react';
import { FaCalendarAlt, FaUsers, FaRocket, FaClipboardList } from 'react-icons/fa';

type RoadmapItem = {
  phase: string;
  goals: string[];
};

const RoadmapBuilder: React.FC = () => {
  const [teamSize, setTeamSize] = useState('');
  const [projectStage, setProjectStage] = useState('');
  const [launchDate, setLaunchDate] = useState('');
  const [roadmap, setRoadmap] = useState<RoadmapItem[]>([]);
  const [loading, setLoading] = useState(false);

  const generateRoadmap = async () => {
    setLoading(true);
    const prompt = `
You are an AI startup advisor helping a crypto project build a roadmap.
Given:
- Team size: ${teamSize}
- Stage: ${projectStage}
- Target launch date: ${launchDate}

Create a roadmap split into 3–5 phases (e.g. Q3, Q4, Mainnet Launch).
Each phase should contain 2–4 concise goals/tasks.

Respond only as a JSON array like:
[
  {
    "phase": "Q3 2025",
    "goals": ["Build MVP", "Design landing page", "Launch beta with testnet"]
  },
  ...
]
`;

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
        }),
      });

      const data = await res.json();
      const content = data.choices[0].message.content;
      const parsed: RoadmapItem[] = JSON.parse(content);
      setRoadmap(parsed);
    } catch (err) {
      alert('Failed to generate roadmap.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="roadmap-container" id='roadmap-container'>
      <h2><FaClipboardList /> AI Project Roadmap Builder</h2>

      <div className="form-section-roadmap">
        <div className="form-group-roadmap">
          <label><FaUsers /> Team Members</label>
          <input
            type="number"
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
            placeholder="e.g. 5"
          />
        </div>

        <div className="form-group-roadmap">
          <label><FaRocket /> Project Stage</label>
          <input
            type="text"
            value={projectStage}
            onChange={(e) => setProjectStage(e.target.value)}
            placeholder="e.g. idea, MVP, testnet"
          />
        </div>

        <div className="form-group-roadmap">
          <label><FaCalendarAlt /> Target Launch Date</label>
          <input
            type="date"
            value={launchDate}
            onChange={(e) => setLaunchDate(e.target.value)}
          />
        </div>

        <button onClick={generateRoadmap} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Roadmap'}
        </button>
      </div>

      {roadmap.length > 0 && (
        <div className="roadmap-list">
          <h3>📅 Roadmap Output</h3>
          {roadmap.map((item, index) => (
            <div key={index} className="roadmap-phase">
              <h4>{item.phase}</h4>
              <ul>
                {item.goals.map((goal, i) => (
                  <li key={i}>✅ {goal}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoadmapBuilder;

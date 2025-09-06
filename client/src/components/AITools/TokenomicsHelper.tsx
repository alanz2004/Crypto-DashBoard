import React, { useState } from 'react';
import './TokenomicsHelper.css'
import { FaCoins, FaUsers, FaChartPie, FaRobot } from 'react-icons/fa';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

type Allocation = {
  name: string;
  value: number;
};

const COLORS = ['#4f46e5', '#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe'];

const TokenomicsHelper: React.FC = () => {
  const [startupName, setStartupName] = useState('');
  const [tokenSupply, setTokenSupply] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [tokenUtility, setTokenUtility] = useState('');
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const prompt = `
Design a tokenomics model for a crypto startup.
Startup name: ${startupName}
Total token supply: ${tokenSupply}
Team size: ${teamSize}
Token utility: ${tokenUtility}

Respond with a JSON array of token allocation breakdown like:
[
  { "name": "Team", "value": 20 },
  { "name": "Investors", "value": 25 },
  { "name": "Staking Rewards", "value": 30 },
  { "name": "Ecosystem", "value": 15 },
  { "name": "Treasury", "value": 10 }
]`;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      const content = data.choices[0].message.content;

      const parsed = JSON.parse(content);
      setAllocations(parsed);
    } catch (err) {
      alert('Failed to fetch tokenomics model from OpenAI.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tokenomics-container" id="tokenomics-helper">
      <div className="tokenomics-header">
        <FaRobot className="icon" />
        <h2>Tokenomics AI Helper</h2>
        <p>Design smart token allocations and utility models with the help of AI.</p>
      </div>

      <form className="tokenomics-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label><FaCoins className="form-icon" /> Startup Name</label>
          <input type="text" value={startupName} onChange={(e) => setStartupName(e.target.value)} required />
        </div>

        <div className="form-group">
          <label><FaChartPie className="form-icon" /> Total Token Supply</label>
          <input type="number" value={tokenSupply} onChange={(e) => setTokenSupply(e.target.value)} required />
        </div>

        <div className="form-group">
          <label><FaUsers className="form-icon" /> Team Size</label>
          <input type="number" value={teamSize} onChange={(e) => setTeamSize(e.target.value)} required />
        </div>

        <div className="form-group">
          <label><FaCoins className="form-icon" /> Token Utility</label>
          <input type="text" value={tokenUtility} onChange={(e) => setTokenUtility(e.target.value)} required />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Tokenomics'}
        </button>
      </form>

      {allocations.length > 0 && (
        <div className="result-box">
          <h3>📊 Token Allocation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={allocations} dataKey="value" nameKey="name" outerRadius={100}>
                {allocations.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <ul className="allocation-list">
            {allocations.map((item, index) => (
              <li key={index}>
                <strong>{item.name}:</strong> {item.value}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TokenomicsHelper;
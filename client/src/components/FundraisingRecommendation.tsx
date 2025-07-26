import React, { useState } from 'react';
import { FaWandMagicSparkles } from 'react-icons/fa6';

type Recommendation = {
  name: string;
  raise: number;
  price: number;
  tokenPercent: number;
  cliff: string;
  vesting: string;
};

const FundraisingRecommendation: React.FC = () => {
  const [teamSize, setTeamSize] = useState('');
  const [tokenSupply, setTokenSupply] = useState('');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);

    const prompt = `
You are a crypto fundraising strategist. 
Given the following startup:
- Team size: ${teamSize}
- Total token supply: ${tokenSupply}

Recommend 2–3 fundraising rounds.
For each round, return:
- name
- raise (USD)
- tokenPercent
- price (USD/token)
- cliff (e.g. 6 months)
- vesting (e.g. 24 months)

Respond only as a JSON array like:
[
  {
    "name": "Seed",
    "raise": 300000,
    "tokenPercent": 5,
    "price": 0.005,
    "cliff": "6 months",
    "vesting": "24 months"
  }
]
`;

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.6,
        }),
      });

      const data = await res.json();
      const raw = data.choices[0].message.content;
      const parsed: Recommendation[] = JSON.parse(raw);
      setRecommendations(parsed);
    } catch (err) {
      alert('Error fetching recommendation');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recommendation-container">
      <h2><FaWandMagicSparkles className="icon" /> AI Fundraising Recommendations</h2>

      <div className="input-grid">
        <div>
          <label>Team Size</label>
          <input
            type="number"
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
            placeholder="e.g. 5"
          />
        </div>
        <div>
          <label>Total Token Supply</label>
          <input
            type="number"
            value={tokenSupply}
            onChange={(e) => setTokenSupply(e.target.value)}
            placeholder="e.g. 1000000000"
          />
        </div>
        <button onClick={handleGenerate} disabled={loading}>
          {loading ? 'Generating...' : 'Get Recommendations'}
        </button>
      </div>

      {recommendations.length > 0 && (
        <div className="recommendations-list">
          <h3>🔍 Suggested Fundraising Rounds</h3>
          <ul>
            {recommendations.map((rec, index) => (
              <li key={index} className="rec-card">
                <strong>{rec.name}</strong>
                <p>Raise: ${rec.raise.toLocaleString()}</p>
                <p>Token %: {rec.tokenPercent}%</p>
                <p>Price: ${rec.price}</p>
                <p>Cliff: {rec.cliff}</p>
                <p>Vesting: {rec.vesting}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FundraisingRecommendation;
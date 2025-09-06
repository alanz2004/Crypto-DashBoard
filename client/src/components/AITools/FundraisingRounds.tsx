import React, { useState } from 'react';
import './FundrasingRounds.css'
import { FaDollarSign, FaPercentage, FaPlus, FaTrash, FaCoins, FaClock } from 'react-icons/fa';

type Round = {
  name: string;
  amount: number;
  tokenPercent: number;
  price: number;
  cliff: string;
  vesting: string;
};

const FundraisingRounds: React.FC = () => {
  const [rounds, setRounds] = useState<Round[]>([
    { name: 'Seed', amount: 0, tokenPercent: 0, price: 0, cliff: '', vesting: '' }
  ]);

  const addRound = () => {
    setRounds([
      ...rounds,
      { name: '', amount: 0, tokenPercent: 0, price: 0, cliff: '', vesting: '' }
    ]);
  };

  const updateRound = (index: number, key: keyof Round, value: string | number) => {
    const updated = [...rounds];
    (updated[index][key] as any) = value;
    setRounds(updated);
  };

  const removeRound = (index: number) => {
    const updated = [...rounds];
    updated.splice(index, 1);
    setRounds(updated);
  };

  const totalRaise = rounds.reduce((sum, r) => sum + Number(r.amount), 0);
  const totalPercent = rounds.reduce((sum, r) => sum + Number(r.tokenPercent), 0);

  return (
    <div className="rounds-container" id='funding-rounds'>
      <h2 className="rounds-title">💰 Fundraising Rounds</h2>
      {rounds.map((round, index) => (
        <div key={index} className="round-card">
          <div className="round-row">
            <label>Round Name</label>
            <input
              type="text"
              value={round.name}
              onChange={(e) => updateRound(index, 'name', e.target.value)}
              placeholder="e.g. Seed, Private A"
            />
          </div>

          <div className="round-row">
            <label><FaDollarSign /> Raise Amount ($)</label>
            <input
              type="number"
              value={round.amount}
              onChange={(e) => updateRound(index, 'amount', Number(e.target.value))}
            />
          </div>

          <div className="round-row">
            <label><FaPercentage /> Token %</label>
            <input
              type="number"
              value={round.tokenPercent}
              onChange={(e) => updateRound(index, 'tokenPercent', Number(e.target.value))}
            />
          </div>

          <div className="round-row">
            <label><FaCoins /> Price per Token</label>
            <input
              type="number"
              value={round.price}
              onChange={(e) => updateRound(index, 'price', Number(e.target.value))}
            />
          </div>

          <div className="round-row">
            <label><FaClock /> Cliff</label>
            <input
              type="text"
              value={round.cliff}
              onChange={(e) => updateRound(index, 'cliff', e.target.value)}
              placeholder="e.g. 6 months"
            />
          </div>

          <div className="round-row">
            <label><FaClock /> Vesting</label>
            <input
              type="text"
              value={round.vesting}
              onChange={(e) => updateRound(index, 'vesting', e.target.value)}
              placeholder="e.g. 24 months"
            />
          </div>

          <button className="delete-btn" onClick={() => removeRound(index)}>
            <FaTrash /> Remove
          </button>
        </div>
      ))}

      <div className="summary-row">
        <button className="add-btn" onClick={addRound}><FaPlus /> Add Round</button>
        <div className="totals">
          <p><strong>Total Raised:</strong> ${totalRaise.toLocaleString()}</p>
          <p><strong>Total Token %:</strong> {totalPercent}%</p>
        </div>
      </div>
    </div>
  );
};

export default FundraisingRounds;
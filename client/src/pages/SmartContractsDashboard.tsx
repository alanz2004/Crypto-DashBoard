import React, { useState } from 'react';
import './SmartContractsDashboard.css'


import OpenAI from 'openai';


const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // required in frontend (React)
});

const features = [
  'Smart Contract Generator',
  'AI Contract Auditor',
  'Contract Explainer',
  'Template Selector',
];

const SmartContractsDashboard: React.FC = () => {

 const [selectedFeature, setSelectedFeature] = useState(features[0]);
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const buildPrompt = () => {
    switch (selectedFeature) {
      case 'Smart Contract Generator':
        return `Generate a secure and optimized Solidity smart contract for: ${inputText}`;
      case 'AI Contract Auditor':
        return `Audit this Solidity smart contract and list potential vulnerabilities:\n${inputText}`;
      case 'Contract Explainer':
        return `Explain what this Solidity smart contract does in simple terms:\n${inputText}`;
      case 'Template Selector':
        return `Suggest a Solidity contract template for this use case: ${inputText}`;
      default:
        return '';
    }
  };

  const handleRun = async () => {
    setLoading(true);
    setResult('Loading...');

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are an expert Solidity and Web3 smart contract assistant.' },
          { role: 'user', content: buildPrompt() },
        ],
        temperature: 0.7,
      });

      setResult(completion.choices[0]?.message?.content || 'No result.');
    } catch (error) {
      console.error(error);
      setResult('Error fetching response.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sc-dashboard-container">
      <div className="sc-main-area">
        <h2>{selectedFeature}</h2>
        <div className="sc-text-box">
          <textarea
            className="sc-textarea"
            placeholder="Paste contract or write prompt..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button className="sc-run-button" onClick={handleRun} disabled={loading}>
            {loading ? 'Running...' : `Run ${selectedFeature}`}
          </button>
          {result && (
            <div className="sc-output-box">
              <pre>{result}</pre>
            </div>
          )}
        </div>
      </div>

      <div className="sc-feature-menu">
        <h3>Features</h3>
        <ul>
          {features.map((feature) => (
            <li
              key={feature}
              className={selectedFeature === feature ? 'active' : ''}
              onClick={() => {
                setSelectedFeature(feature);
                setResult('');
              }}
            >
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SmartContractsDashboard;

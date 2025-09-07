import React, { useState } from 'react';
import './SmartContractsDashboard.css';
import OpenAI from 'openai';
import axios from 'axios';

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

const SmartContractsDashboard: React.FC<{ projectId: string }> = ({ projectId }) => {
  const [selectedFeature, setSelectedFeature] = useState(features[0]);
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

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
        model: 'gpt-3.5-turbo',
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

  const handleSave = async () => {
    if (!result.trim()) return;

    setSaving(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/files/${projectId}/files`,
        {
          fileName: 'SmartContract.sol',
          content: result,
          language: 'solidity',
        },
        { withCredentials: true }
      );
      alert('✅ Contract saved successfully');
    } catch (error) {
      console.error(error);
      alert('❌ Failed to save contract');
    } finally {
      setSaving(false);
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

              {selectedFeature === 'Smart Contract Generator' && (
                <button className="sc-save-button" onClick={handleSave} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Contract'}
                </button>
              )}
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

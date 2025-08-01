import React from 'react';
import './FeaturesSection.css';
import { FaCoins, FaCode, FaShieldAlt, FaChartLine, FaMapMarkedAlt, FaRobot } from 'react-icons/fa';

const FeaturesSection: React.FC = () => {
  return (
    <section className="features-section-home">
      <h2 className="features-titl-home">🚀 Platform Features</h2>
      <div className="features-grid-home">
        <div className="feature-card-home slide-in">
          <FaCoins className="icon" />
          <h3>Tokenomics Generator</h3>
          <p>Generate optimized token distribution models with just a few inputs.</p>
        </div>

        <div className="feature-card-home slide-in delay-1">
          <FaCode className="icon" />
          <h3>Smart Contract Builder</h3>
          <p>Describe your contract in plain English and get ready-to-deploy Solidity code.</p>
        </div>

        <div className="feature-card-home slide-in delay-2">
          <FaShieldAlt className="icon" />
          <h3>AI Contract Auditor</h3>
          <p>Paste code and get AI-powered security reviews and gas optimization tips.</p>
        </div>

        <div className="feature-card-home slide-in delay-3">
          <FaChartLine className="icon" />
          <h3>Fundraising Planner</h3>
          <p>Plan pre-seed, seed, and public rounds with dynamic AI-based recommendations.</p>
        </div>

        <div className="feature-card-home slide-in delay-4">
          <FaMapMarkedAlt className="icon" />
          <h3>Roadmap Builder</h3>
          <p>Create startup roadmaps with milestones, timelines, and team planning support.</p>
        </div>

        <div className="feature-card-home slide-in delay-5">
          <FaRobot className="icon" />
          <h3>AI Assistant Tools</h3>
          <p>From pitch deck generation to documentation writing — all done with AI.</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
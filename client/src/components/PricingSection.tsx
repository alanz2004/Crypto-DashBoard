import React from 'react';
import './PricingSection.css';

const PricingSection: React.FC = () => {
  return (
    <section className="pricing-section">
      <h2 className="pricing-title">🚀 Choose your plan and start building smarter</h2>
      <p className="pricing-subtext">
        Whether you’re just starting or scaling a Web3 project, we’ve got you covered with AI-powered tools for tokenomics, smart contracts, and more.
      </p>

      <div className="pricing-grid">
        <div className="pricing-card">
          <h3>Starter</h3>
          <p className="price">$0/month</p>
          <ul>
            <li>Access to 1 tool</li>
            <li>Basic tokenomics templates</li>
            <li>Community Discord</li>
          </ul>
          <button>Get Started</button>
        </div>

        <div className="pricing-card">
          <h3>Builder</h3>
          <p className="price">$19/month</p>
          <ul>
            <li>Unlimited AI generations</li>
            <li>Smart contract builder</li>
            <li>Tokenomics visual charts</li>
          </ul>
          <button>Choose Plan</button>
        </div>

        <div className="pricing-card">
          <h3>Pro Team</h3>
          <p className="price">$49/month</p>
          <ul>
            <li>Team collaboration tools</li>
            <li>Fundraising advisor AI</li>
            <li>Advanced roadmap planner</li>
          </ul>
          <button>Choose Plan</button>
        </div>

        <div className="pricing-card">
          <h3>Enterprise</h3>
          <p className="price">Custom</p>
          <ul>
            <li>Custom integrations</li>
            <li>Private onboarding</li>
            <li>24/7 premium support</li>
          </ul>
          <button>Contact Us</button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

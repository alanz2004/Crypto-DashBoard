import React from 'react';
import './HomePage.css';

import FeaturesSection from '../components/FeaturesSection';
import ContactUs from '../components/ContactUs';

const HomePage: React.FC = () => {
  return (
    <div className="homepage-container">
      {/* Placeholder for Navbar */}
      <header className="navbar-placeholder">
        {/* You can replace this with <Navbar /> later */}
      </header>

      {/* Main Content */}
      <main className="hero-section">
        <div className="hero-content">
          <h1>AI Tools for Crypto Startups</h1>
          <p>
            Launch smarter with our AI-powered platform for tokenomics, smart contracts,
            fundraising planning, and more. Designed for builders in the Web3 universe.
          </p>
        </div>
      </main>

      <FeaturesSection />

      <ContactUs />

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} CosmosAI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
import React from 'react';
import './HomePage.css';

import NavBarHome from '../components/NavBarHome';
import CryptoStatsSection from '../components/CryptoStatsSection';
import FeaturesSection from '../components/FeaturesSection';
import PricingSection from '../components/PricingSection';
import SocialMediaBar from '../components/SocialMediaBar';
import ContactUs from '../components/ContactUs';


import RocketImage from '../assets/rocket.svg'; // Put your rocket image in public or src/assets


const HomePage: React.FC = () => {
  return (
    <div className="homepage-container">
     <NavBarHome />

      {/* Main Content */}
      <main className="hero-section">
      <div className="hero-content">
        <h1>AI Tools for Crypto Startups</h1>
        <p>
          Launch smarter with our AI-powered platform for tokenomics, smart contracts,
          fundraising planning, and more. Designed for builders in the Web3 universe.
        </p>
      </div>

      <div className="hero-rocket">
          <img src={RocketImage} alt="Rocket Launch" className="rocket-image" />
      </div>
    </main>

      <FeaturesSection />

      <CryptoStatsSection />

      <PricingSection />

      <SocialMediaBar />

      <ContactUs />

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} CRAIS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
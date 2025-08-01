import React from 'react';
import './SocialMediaBar.css';
import {
  FaTwitter,
  FaLinkedin,
  FaDiscord,
  FaInstagram,
  FaTelegramPlane,
} from 'react-icons/fa';

const SocialMediaBar: React.FC = () => {
  return (
    <section className="social-section">
      <h2 className="social-title">🌐 You can find us at:</h2>
      <div className="social-bar">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-item">
          <FaTwitter className="social-icon" />
          <span>Twitter</span>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-item">
          <FaLinkedin className="social-icon" />
          <span>LinkedIn</span>
        </a>
        <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="social-item">
          <FaDiscord className="social-icon" />
          <span>Discord</span>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-item">
          <FaInstagram className="social-icon" />
          <span>Instagram</span>
        </a>
        <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="social-item">
          <FaTelegramPlane className="social-icon" />
          <span>Telegram</span>
        </a>
      </div>
    </section>
  );
};

export default SocialMediaBar;


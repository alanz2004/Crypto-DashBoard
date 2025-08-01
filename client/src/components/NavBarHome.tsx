import React from 'react';
import './NavBarHome.css';
import { FaRocket } from 'react-icons/fa';

const NavBarHome: React.FC = () => {
  return (
    <nav className="navbar-home">
      <div className="navbar-left">
        <FaRocket className="project-icon" />
        <span className="project-name">CRAIS</span>
      </div>

      <div className="navbar-right">
        <a href="/login" className="nav-link">Sign In</a>
        <a href="#get-started" className="cta-button">Get Started</a>
      </div>
    </nav>
  );
};

export default NavBarHome;

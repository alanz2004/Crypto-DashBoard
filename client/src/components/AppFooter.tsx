import React from 'react';
import './AppFooter.css';
import { Link } from 'react-router-dom';

const AppFooter: React.FC = () => {
  return (
    <footer className="app-footer">
      <span className="footer-left">© {new Date().getFullYear()} CRAIS. All rights reserved.</span>
      <Link to="/home" className="footer-right">Home</Link>
    </footer>
  );
};

export default AppFooter;

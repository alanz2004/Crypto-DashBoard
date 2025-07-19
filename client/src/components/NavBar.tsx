import React from 'react';
import { Link } from "react-router-dom";

interface NavbarProps {
  username: string;
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {
  return (
    <div className="navbar">
      <div className='navbar-row'>
        <p>welcome back, <span className='navbar-username'>{username}</span></p>
      </div>

      <div className='navbar-row'>
        <Link to="/" className="navbar-link">DashBoard</Link>
        <Link to="/team" className="navbar-link">Team</Link>
        <Link to="/wallet" className="navbar-link">Wallet</Link>
        <Link to="/helper" className="navbar-link">AI Helper</Link>
      </div>
    </div>
  );
};

export default Navbar;
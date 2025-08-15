import React from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

import './NavBar.css'

interface NavbarProps {
  username: string;
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {
  const { user} = useAuth();
  return (
    <div className="navbar">
      <div className='navbar-row'>
        <p>welcome back, <span className='navbar-username'> {user ? (user.username || user.email) : 'Guest'}</span></p>
      </div>

      <div className='navbar-row'>
        <Link to="/" className="navbar-link">DashBoard</Link>
        <Link to="/team" className="navbar-link">Team</Link>
        <Link to="/wallet" className="navbar-link">Wallet</Link>
        <Link to="/helper" className="navbar-link">AI Helper</Link>
        <Link to="/smartcontracts" className='navbar-link'>Smart Contracts</Link>
      </div>
    </div>
  );
};

export default Navbar;
import React from 'react';
import { Link } from "react-router-dom";

interface NavbarProps {
  username: string;
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {
  return (
    <div className="navbar">
      <div className='navbar-row'>
        <p>welcome back, {username}</p>
      </div>

      <div className='navbar-row'>
       <Link to="/" className="text-gray-700 hover:text-indigo-600 transition">DashBoard</Link>
        <Link to="/team" className="text-gray-700 hover:text-indigo-600 transition">Team</Link>
        <a>AI Helper</a>
      </div>
    </div>
  );
};

export default Navbar;
import React from 'react';

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
        <a>DashBoard</a>
        <a>Team</a>
        <a>AI Helper</a>
      </div>
    </div>
  );
};

export default Navbar;
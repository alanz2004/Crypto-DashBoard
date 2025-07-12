import React from 'react';

interface NavbarProps {
  username: string;
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {
  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Left: Username */}
      <div className="flex items-center space-x-3">
        <span className="text-gray-700 font-semibold text-lg">{username}</span>
      </div>

      {/* Right: Links */}
      <div className="flex space-x-6 pr-4">
        <a href="#home" className="text-gray-600 hover:text-indigo-600 transition">
          Home
        </a>
        <a href="#about" className="text-gray-600 hover:text-indigo-600 transition">
          About
        </a>
        <a href="#contact" className="text-gray-600 hover:text-indigo-600 transition">
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
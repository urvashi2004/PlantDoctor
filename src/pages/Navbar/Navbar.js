import React from 'react';
import './Navbar.css';
import LogoImage from './LogoImage.png'; // Ensure you have a logo image in the same directory

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={LogoImage} alt="Logo" className="logo-image" />
      </div>
      <div className="navbar-links">
        <a href="/" className="navbar-link">Home</a>
        <a href="/identify" className="navbar-link">Identify Plant</a>
        <a href="/disease" className="navbar-link">Check Disease</a>
      </div>
    </nav>
  );
};

export default Navbar;

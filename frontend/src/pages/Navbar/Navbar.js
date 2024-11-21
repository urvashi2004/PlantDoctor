import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import LogoImage from './LogoImage.png'; // Ensure you have a logo image in the same directory

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={LogoImage} alt="Logo" className="logo-image" />
      </div>
      <ul>
          <li><Link to="/" smooth={true} duration={500}>Home</Link></li>
          <li><Link to="/identify-plant" smooth={true} duration={500}>Identify Plant</Link></li>
          <li><Link to="/check-disease" smooth={true} duration={500}>Check Disease</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import the CSS file for styling

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li><Link to="/">Department Selection</Link></li>
          <li><Link to="/year">Year Selection</Link></li>
          <li><Link to="/section">Section Selection</Link></li>
          <li><Link to="/subject">Subject Selection</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

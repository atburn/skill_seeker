import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css"

function Header() {
  return (
    <div className="global-header">
      <div style={{ width: "50%" }}>
        <h2>Skill Seeker</h2>
      </div>

      <div style={{ width: "50%", textAlign: 'right' }}>
        <nav className='header-nav'>
          <Link to="/">Notifications</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </div>
    </div>
  );
}

export default Header;
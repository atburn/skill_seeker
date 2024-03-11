import React from 'react';
import { Link } from 'react-router-dom';


function Header() {
  return (
    <div className="global-header">
      <div className="brand">
        <h2>Skill Seeker</h2>
         
      </div>

      <div style={{ width: "50%", textAlign: 'right' }}>
      <nav className='header-nav'>
        <Link to="/">Home</Link>
        <Link to="/loginregister">Login/Register</Link>
        <Link to="/view-profile">Profile</Link>
       
        <Link to="/jobs">Jobs Posting</Link>  
        <Link to="/company">Company</Link>
        
        <Link to="/aboutus">About Us</Link>
        <Link to="/logout">Log Out</Link>
        
      </nav>
      </div>
    </div>
  );
}

export default Header;
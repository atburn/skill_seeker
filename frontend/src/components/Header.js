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
        <Link to="/signup">SignUp</Link>
        <Link to="/jobs">Jobs Posting</Link>  
        <Link to="/profile">Profile</Link>
        <Link to="/signin">SignIn</Link>
        <Link to="/employer">For Employers</Link>
      </nav>
      </div>
    </div>
  );
}

export default Header;
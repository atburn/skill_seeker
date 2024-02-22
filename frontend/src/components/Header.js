import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="global-header">
      <div style={{ width: "50%" }}>
        <h2>Skill Seeker</h2>  
      </div>

      <div style={{ width: "50%", textAlign: 'right' }}>
        <nav className='header-nav'>
          <Link to="/">Home</Link>
          <Link to="/Signup">SignUp</Link> 
        </nav>
      </div>
    </div>
  );
}

export default Header;
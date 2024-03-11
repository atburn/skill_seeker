import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FirebaseAuthHandler from './FirebaseAuthHandler';


function Header() {

	const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

	useEffect(() => {
        const handleStorageChange = () => {
            setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);
	return (
		<div className="global-header">
			<div className="brand">
				<h2>Skill Seeker</h2>

			</div>

			<div style={{ width: "50%", textAlign: 'right' }}>
				<nav className='header-nav'>
					<Link to="/">Home</Link>
					<Link to="/view-profile">Profile</Link>
					<Link to="/jobs">Jobs Posting</Link>
					<Link to="/company">Company</Link>
					<Link to="/aboutus">About Us</Link>

					{
						isLoggedIn ? <Link to="/logout">Log Out</Link> : <Link to="/loginregister">Login/Register</Link>
					}


				</nav>
			</div>
		</div>
	);
}

export default Header;
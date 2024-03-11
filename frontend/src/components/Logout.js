import React from 'react';
const Logout = () => {

  const handleLogout = () => {
   
    localStorage.removeItem('uid');

   
    localStorage.setItem('isLoggedIn', 'false');

    
    window.location.href = '/';
  };

  const buttonStyle = {
    padding: '10px 20px', 
    fontSize: '16px', 
  };

  return (
    <button style={buttonStyle} onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;

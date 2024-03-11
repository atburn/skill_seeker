import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('uid');
    navigate('/');
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
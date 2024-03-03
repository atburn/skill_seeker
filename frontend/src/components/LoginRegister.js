import React, { useState } from 'react';
import './LoginRegister.css'; // Make sure to create a CSS file for styles

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true); // To switch between Login and Register

  return (
    <div className="login-register-container">
      <div className="login-register-card">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        {!isLogin && <input type="text" placeholder="Confirm Password" />} {/* Only for Register */}
        <button>{isLogin ? 'Login' : 'Register'}</button>
        {isLogin ? (
          <p>New User? <span onClick={() => setIsLogin(false)}>Register here!</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setIsLogin(true)}>Login here!</span></p>
        )}
      </div>
    </div>
  );
};

export default LoginRegister;

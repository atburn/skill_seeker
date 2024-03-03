import React, { useState, useEffect } from 'react';
import FirebaseAuthHandler from './FirebaseAuthHandler'; 
import './LoginRegister.css';

const LoginRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Switch between Login and Register

  useEffect(() => {
    // Initialize Firebase when the component mounts
    FirebaseAuthHandler.start();
}, []);

const handleLogin = async () => {
  try {
      const uid = await FirebaseAuthHandler.signInUser(email, password);
      if (uid) {
          console.log('Logged in with UID:', uid);
          // Redirect user or show dashboard
      } else {
          console.error('Login failed');
          // Show error message
      }
  } catch (error) {
      console.error('Login error:', error.message);
      // Show error message
  }
};

const handleRegister = async () => {
  try {
      const uid = await FirebaseAuthHandler.createUser(email, password);
      if (uid) {
          console.log('Registered with UID:', uid);
          // Redirect user or show welcome message
      } else {
          console.error('Registration failed');
          // Show error message
      }
  } catch (error) {
      console.error('Registration error:', error.message);
      // Show error message
  }
};

  const handleForgotPassword = async () => {
    if (email) {
        await FirebaseAuthHandler.sendPasswordResetEmail(email);
        alert('Please check your email to reset your password.');
    } else {
        alert('Please enter your email address.');
    }
};

  return (
    <div className="login-register-container">
            <div className="login-register-card">
                <h2>{isLogin ? 'Login' : 'Register'}</h2>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                {!isLogin && <input type="password" placeholder="Confirm Password" />}
                <button onClick={isLogin ? handleLogin : handleRegister}>{isLogin ? 'Login' : 'Register'}</button>
                {isLogin ? (
                    <div>
                        <p>New user? <span onClick={() => setIsLogin(false)}>Register here!</span></p>
                        <p><span onClick={handleForgotPassword}>Forgot Password?</span></p>
                    </div>
                ) : (
                    <p>Already have an account? <span onClick={() => setIsLogin(true)}>Log in!</span></p>
                )}
            </div>
        </div>
  );
};

export default LoginRegister;

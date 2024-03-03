import React, { useState } from 'react';
import FirebaseAuthHandler from './FirebaseAuthHandler'; 
import './LoginRegister.css';

const LoginRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Switch between Login and Register

  // Initialize Firebase on component mount
  FirebaseAuthHandler.start();

  const handleLogin = async () => {
    const uid = await FirebaseAuthHandler.signInUser(email, password);
    if (uid) {
      console.log('Logged in with UID:', uid);
      // Redirect user or show dashboard
    } else {
      console.error('Login failed');
      // Show error message
    }
  };

  const handleRegister = async () => {
    const uid = await FirebaseAuthHandler.createUser(email, password);
    if (uid) {
      console.log('Registered with UID:', uid);
      // Redirect user or show welcome message
    } else {
      console.error('Registration failed');
      // Show error message
    }
  };

  return (
    <div className="login-register-container">
            <div className="login-register-card">
                <h2>{isLogin ? 'Login' : 'Register'}</h2>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                />
                {!isLogin && (
                    <input 
                        type="text" 
                        placeholder="Confirm Password"
                    />
                )}
                <button onClick={isLogin ? handleLogin : handleRegister}>
                    {isLogin ? 'Login' : 'Register'}
                </button>
                {isLogin ? (
                    <p>New user? <span onClick={() => setIsLogin(false)}>Register here!</span></p>
                ) : (
                    <p>Already have an account? <span onClick={() => setIsLogin(true)}>LogIn!</span></p>
                )}
            </div>
        </div>
  );
};

export default LoginRegister;

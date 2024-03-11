import React, { useState, useEffect } from 'react';
import FirebaseAuthHandler from './FirebaseAuthHandler';
import './LoginRegister.css';
import axios from "axios";

const LoginRegister = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true); // Switch between Login and Register

    useEffect(() => {
        // Initialize Firebase when the component mounts
        FirebaseAuthHandler.start();
    }, []);

    const handleLogin = async () => {
        try {
            const uid = await FirebaseAuthHandler.signInUser(email, password);
            if (uid) {
                localStorage.setItem('uid', uid);

                try {
                    // Check if the user is valid
                    await axios.get("http://localhost:2000/users/" + uid);
                    window.location.href = '/view-profile';
                } catch (error) {
                    // Check if company is valid
                    await axios.get("http://localhost:2000/companies/" + uid);
                    window.location.href = '/companies/' + uid;

                }

            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error.message);
        }
    };

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            console.error('Passwords do not match');
            // Show error message
            return;
        }

        try {
            const uid = await FirebaseAuthHandler.createUser(email, password);
            if (uid) {
                localStorage.setItem('uid', uid);
                window.location.href = '/profile'; // Redirect to the profile page
            } else {
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error.message);
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
                <h2>{isLogin ? 'Login to Skill Seeker' : 'Join Skill Seeker'}</h2>
                {!isLogin && (
                    <div className="name-fields">
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
                    </div>
                )}
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (6+ characters)" />
                {!isLogin && (
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
                )}


                <div className="agreement-text">
                    By clicking "{isLogin ? 'Login' : 'Register'}", you agree to the Skill Seeker <a href="#" className="legal-link">User Agreement</a>, <a href="#" className="legal-link">Privacy Policy</a>, and <a href="#" className="legal-link">Cookie Policy</a>.
                </div>

                <button className="main-action-button" onClick={isLogin ? handleLogin : handleRegister}>{isLogin ? 'Login' : 'Register'}</button>

                {isLogin ? (
                    <div className="redirect-section">
                        <p>New to Skill Seeker? <span onClick={() => setIsLogin(false)}>Register here!</span></p>
                        <p><span onClick={handleForgotPassword}>Forgot Password?</span></p>
                    </div>
                ) : (
                    <p className="redirect-section">Already have an account? <span onClick={() => setIsLogin(true)}>Log in!</span></p>
                )}
            </div>
        </div>
    );

}

export default LoginRegister;

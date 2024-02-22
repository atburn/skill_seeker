import React, { useState } from 'react';
import './CommonStyles.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted with:', { email, password });
    setEmail('');
    setPassword('');
  };

  return (
    <>
    <div className="form-container">
      <form className="form-group" onSubmit={handleSubmit}>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label htmlFor="email">Email Address</label>
          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="Enter Email"
            value={email}
            onChange={handleInputChange}
            aria-label="Email Address"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="Enter Password"
            value={password}
            onChange={handleInputChange}
            aria-label="Password"
          />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember Me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">Password?</a>
        </p>
      </form>
      </div>
    </>
  )
}

export default SignIn;

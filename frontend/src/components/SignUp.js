import React, { useState } from 'react';

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('SignUp data:', { firstName, lastName, email, password });
  };

  return (
    <>
    <div className="form-container">
      <form className="form-group" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            placeholder="First Name"
            value={firstName}
            onChange={handleInputChange}
            required
            aria-label="First Name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            placeholder="Last Name"
            value={lastName}
            onChange={handleInputChange}
            required
            aria-label="Last Name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter Email"
            value={email}
            onChange={handleInputChange}
            required
            aria-label="Email Address"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter Password"
            value={password}
            onChange={handleInputChange}
            required
            aria-label="Password"
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already Registered? <a href="/sign-in">Sign In</a>
        </p>
      </form>
      </div>
    </>
  );
}

export default SignUp;

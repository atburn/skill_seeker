import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import JobPosting from './components/JobPosting';
import Employer from './components/Employer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/job-posting" element={<JobPosting />} />
        <Route path="/employer" element={<Employer />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
export default App;

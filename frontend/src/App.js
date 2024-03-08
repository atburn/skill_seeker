import React from 'react';
import './App.css';
import Home from './components/Home';
import Header from './components/Header';
import Jobs from './components/JobPosting';
import Company from './components/Company';
import Profile from './components/Profile';
import LoginRegister from './components/LoginRegister';
import AboutUs from './components/AboutUs';
import JobDetailsPage from './components/JobDetailsPage';
import JobApplication from './components/JobApplication';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:jobId" element={<JobDetailsPage />} />
        <Route path="/jobapplication" element={<JobApplication />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/company" element={<Company />} />
        <Route path="/loginregister" element={<LoginRegister />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
    </>
  ) 
}
export default App;
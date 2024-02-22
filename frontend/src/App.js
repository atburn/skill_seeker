import React from 'react';
import './App.css';
import Home from './components/Home';
import Header from './components/Header';
import SignUp from './components/SignUp';
import Jobs from './components/JobPosting';
import Profile from './components/Profile';
import SignIn from './components/SignIn';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
            
        <Route path="/signup" element={<SignUp />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  ) 
}
export default App;
import React from 'react';
import './App.css';
import Home from './components/Home';
import Header from './components/Header';
import Jobs from './components/JobPosting';
import Profile from './components/Profile';
import LoginRegister from './components/LoginRegister';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/loginregister" element={<LoginRegister />} />
      </Routes>
    </>
  ) 
}
export default App;
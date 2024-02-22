import React from 'react';
import './App.css';
import Home from './components/Home';
import Header from './components/Header';
import SignUp from './components/SignUp';
import Login from './components/Login';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
            
        <Route path="/signup" element={<SignUp />} />
            
      </Routes>
    </>
  ) 
}
export default App;
import React from 'react';
import './App.css';
import Home from './components/Home';
import Header from './components/Header';
import SignUp from './components/SignUp';
import Login from './components/Login';
import axios from 'axios';

function App() {
  return (
    <>
      <Header />
      <Home />
      <SignUp />
      <Login />
      <button onClick={testBackend}>Test</button>

    </>
  );
}
export default App;

async function testBackend() {
  await axios.get("http://localhost:2000/");
}

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import JobPosting from './components/JobPosting';
import Employer from './components/Employer';

function App() {
  return (
    <Home />
    // <Router>
    //   <Switch>
    //     <Route exact path="/" component={Home}/> 
    //     <Route path="/login" component={Login} />
    //     <Route path="/signup" component={SignUp} />
    //     <Route path="/profile" component={Profile} />
    //     <Route path="/job-posting" component={JobPosting} />
    //     <Route path="/employer" component={Employer} />
        
    //   </Switch>
    // </Router>
  );
}
export default App;

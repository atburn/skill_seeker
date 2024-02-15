import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Profile from './Profile';
import JobPosting from './JobPosting';
import Employer from './Employer';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/profile" component={Profile} />
        <Route path="/job-posting" component={JobPosting} />
        <Route path="/employer" component={Employer} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}
export default App;

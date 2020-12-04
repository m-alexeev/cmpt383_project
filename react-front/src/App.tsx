import React from 'react';
import './App.css';
import LoginPage from './components/login/login';
import RegisterPage from './components/register/register';
import Friends from './components/home/friends/friends';
import Profile from './components/home/Profile/profile';
//Router 
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from 'react-router-dom';
import HomePage from './components/home/home';

function App() {
  return (
    <div className="app-routes">
      
      <Router>
        <Switch>
          <Route  path="/login" >
            <LoginPage/>
          </Route>
          <Route  path="/register"  >
            <RegisterPage/>
          </Route>
          <Route path ="/reminder">
            <Friends/>
          </Route>
          <Route path = "/profile">
            <Profile/>
          </Route>
          <Route  path="/"  >
            <HomePage/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

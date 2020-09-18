import React from 'react';
import './App.css';
import LoginPage from './components/login/login'
import RegisterPage from './register/register';

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
          <Route  path="/login"  >
            <LoginPage/>
          </Route>
          <Route  path="/register"  >
            <RegisterPage/>
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

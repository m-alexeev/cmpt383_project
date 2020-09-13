import React from 'react';
import './App.css';
import HomePage from './components/home/home';
import LoginPage from './components/login/login'
import NotFound from './components/404page/404';
import RegisterPage from './register/register';

//Router 
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom';

function App() {
  return (
    <div className="app-routes">
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/" component={HomePage} />
          <Route component={NotFound}/> 
        </Switch>
      </Router>
    </div>
  );
}

export default App;

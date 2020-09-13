import React from 'react';
import './App.css';
import HomePage from './pages/home';
import LoginPage from './pages/login'

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
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>

      </div>
      <Switch>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/login">
          <LoginPage/>
        </Route >
      </Switch>
    </Router>
  );
}

export default App;

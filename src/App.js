import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

import Game from "./Containers/Game";
import Login from "./Containers/Login";
import Profile from "./Containers/Profile";
import SignUp from "./Containers/SignUp";
import GlobalStats from "./Containers/GlobalStats";
import Logout from "./Containers/Logout";
import PrivateRoute from "./Containers/PrivateRoute";
// import withAuth from "./Containers/withAuth";
// const Auth = new AuthService();

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/game">Game</Link>
            </li>
            <li>
              <Link to="/stats">Leaderboard</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        </nav>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/game" component={Game} />
        <PrivateRoute exact path="/stats" component={GlobalStats} />
        <PrivateRoute exact path="/logout" component={Logout} />
      </div>
    </Router>
  );
}

export default App;

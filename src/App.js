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

////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time

function AuthApp() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/login">Home</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
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
        </ul>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/profile" component={Profile} />
        <Route path="/game" component={Game} />
        <Route path="/stats" component={GlobalStats} />
      </nav>
    </Router>
  );
}

export default AuthApp;

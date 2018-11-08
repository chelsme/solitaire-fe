import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Game from './Containers/Game'

const Index = () => <h2>Home</h2>;
const SignUp = () => <h2>Sign Up</h2>;
const Profile = () => <h2>Profile</h2>;
const GlobalStats = () => <h2>Global Stats</h2>;

const AppRouter = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signup/">Sign Up</Link>
          </li>
          <li>
            <Link to="/profile/">Profile</Link>
          </li>
          <li>
            <Link to="/game/">Game</Link>
          </li>
          <li>
            <Link to="/globalstats/">Global Stats</Link>
          </li>
        </ul>
      </nav>

      <Route path="/" exact component={Index} />
      <Route path="/signup/" component={SignUp} />
      <Route path="/profile/" component={Profile} />
      <Route path="/game/" component={Game} />
      <Route path="/globalstats/" component={GlobalStats} />
    </div>
  </Router>
);

export default AppRouter;
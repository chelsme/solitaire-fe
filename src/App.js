import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Index from './Containers/Home'
import Profile from './Containers/Profile'
import Game from './Containers/Game'
import SignUp from './Containers/SignUp'
import GlobalStats from './Containers/GlobalStats'

const AppRouter = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* if logged in ? */}
          <li>
            <Link to="/profile/">Profile</Link>
          </li>
          {/* : */}
          <li>
            <Link to="/signup/">Sign Up</Link>
          </li>
          {/*  */}
          <li>
            <Link to="/game/" onClick="window.location.reload()">Play</Link>
          </li>
          <li>
            <Link to="/globalstats/">Stats</Link>
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
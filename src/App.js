import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from "react-router-dom";

import Game from "./Containers/Game";
import Login from "./Containers/Login";
import Profile from "./Containers/Profile";
import GlobalStats from "./Containers/GlobalStats";
import PrivateRoute from "./Containers/PrivateRoute";
import AuthService from "./Containers/AuthService";
import bgmusic from "./images/bg.mp3";
const bgmusicAudio = new Audio(bgmusic);
const Auth = new AuthService();
let isPlaying = false;

const TogglePlayButton = () =>
  Auth.loggedIn() ? (
    <button
      onClick={() => {
        bgmusicAudio.paused ? bgmusicAudio.play() : bgmusicAudio.pause();
      }}
    >
      Music
    </button>
  ) : (
    <button
      onClick={() => {
        bgmusicAudio.pause();
      }}
    >
      Music
    </button>
  );

const AuthButton = withRouter(({ history }) =>
  Auth.loggedIn() ? (
    <button
      onClick={() => {
        Auth.logout(() => history.push("/"));
      }}
    >
      Sign out
    </button>
  ) : null
);

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
              <AuthButton />
            </li>
            <li>
              <TogglePlayButton />
            </li>
          </ul>
        </nav>
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/game" component={Game} />
        <PrivateRoute exact path="/stats" component={GlobalStats} />
      </div>
    </Router>
  );
}

export default App;

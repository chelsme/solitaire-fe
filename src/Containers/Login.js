import React from "react";
import AuthService from "./AuthService";

export default class Login extends React.Component {
  constructor() {
    super();
    this.Auth = new AuthService();
    this.state = { username: "", password: "" };
  }

  handleSubmit = e => {
    e.preventDefault();

    this.Auth.login(this.state.username, this.state.password)
      .then(res => {
        this.props.history.replace("/game");
      })
      .catch(err => {
        alert(err);
        this.props.history.replace("/");
      });
  };

  componentWillMount() {
    if (this.Auth.loggedIn()) this.props.history.replace("/game");
  }

  handleChange = e => {
    // console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSignUp = e => {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    username &&
      password &&
      fetch("https://skull-solitaire-be.herokuapp.com/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          user: {
            username,
            password
          }
        })
      })
        .then(() => this.Auth.login(this.state.username, this.state.password))
        .then(() => this.props.history.replace("/game"))
        .catch(err => {
          alert(err);
          this.props.history.replace("/");
        });
  };

  render() {
    return (
      <div className="center">
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <input
              className="form-item"
              placeholder="Username goes here..."
              name="username"
              type="text"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Password goes here..."
              name="password"
              type="password"
              onChange={this.handleChange}
            />
            <button>Login</button>
          </form>
          <button onClick={this.handleSignUp}>Sign Up</button>
        </div>
      </div>
    );
  }
}

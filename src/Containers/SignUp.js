import React from "react";
import AuthService from "./AuthService";

export default class SignUp extends React.Component {
  constructor() {
    super();
    this.state = { username: "", password: "" };
  }

  handleSubmit = e => {
    const Auth = new AuthService();
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    username &&
      password &&
      fetch("http://localhost:3000/api/v1/users", {
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
        .then(r => this.props.history.replace("/game"))
        .catch(err => {
          alert(err);
          this.props.history.replace("/signup");
        });
  };
  handleChange = e => {
    console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div className="center">
        <div className="form">
          <h1>Sign Up</h1>
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
            <button>Sign Up</button>
          </form>
        </div>
      </div>
    );
  }
}

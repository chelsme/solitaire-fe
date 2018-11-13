import React from "react";
import AuthService from "../Components/AuthService";

export default class Login extends React.Component {
  constructor() {
    super();
    this.Auth = new AuthService();
    this.state = { username: "", password: "", token: "" };
  }

  handleSubmit = e => {
    e.preventDefault();

    // console.log(e.target.username.value, e.target.password.value, this.state);

    this.Auth.login(this.state.username, this.state.password)
      .then(res => {
        this.props.history.replace("/");
      })
      .catch(err => alert(err));
  };

  componentWillMount() {
    if (this.Auth.loggedIn()) this.props.history.replace("/");
  }

  handleChange = e => {
    console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    console.log(this.props);
    return (
      <div className="forms">
        <form onSubmit={this.handleSubmit}>
          Username:{" "}
          <input
            type="text"
            name="username"
            placeholder="type in your username..."
            value={this.state.value}
            onChange={this.handleChange}
          />
          Password:{" "}
          <input
            type="password"
            name="password"
            placeholder="type in your password..."
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button>Login</button>
        </form>
        <button>Sign Up</button>
      </div>
    );
  }
}

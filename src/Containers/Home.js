import React from "react";
const login_api = "http://localhost:3000/api/v1/login";
export default class Home extends React.Component {
  state = { username: "", password: "", token: "" };

  handleLogin = e => {
    e.preventDefault();

    // console.log(e.target.username.value, e.target.password.value, this.state);

    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user: {
          username: e.target.username.value,
          password: e.target.password.value
        }
      })
    })
      .then(r => r.json())
      .then(r => {
        this.props.history.push("/game");
      });
  };

  handleChange = e => {
    console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    console.log(this.props);
    return (
      <div className="forms">
        <form onSubmit={this.handleLogin}>
          Username:{" "}
          <input
            type="text"
            name="username"
            value={this.state.value}
            onChange={this.handleChange}
          />
          Password:{" "}
          <input
            type="password"
            name="password"
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

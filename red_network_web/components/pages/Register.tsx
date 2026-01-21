import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../style/login.css";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      mobile: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { username, email, mobile, password } = this.state;
    fetch("https://fair-cyan-catfish-cape.cyclic.app/api/auth/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username,
        email,
        mobile,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {});
  }
  render() {
    return (
      <div className="login-page">
        <form onSubmit={this.handleSubmit}>
          <h2>Register</h2>
          <input
            type="text"
            required
            placeholder="Name"
            onChange={(e) => this.setState({ username: e.target.value })}
          />

          <input
            type="email"
            required
            placeholder="Email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />

          <input
            type="number"
            required
            placeholder="Phone Number"
            onChange={(e) => this.setState({ mobile: e.target.value })}
          />

          <input
            type="password"
            name="password"
            required
            placeholder="Enter Password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <div className="row">
            <button type="submit">Register</button>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    );
  }
}

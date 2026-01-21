"use client";

import React, { useState } from "react";
import Link from "next/link";
import { login } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state: any) => state.user);

  const handleClick = (e: any) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };
  return (
    <div className="login-page">
      <form>
        <h2>Login</h2>
        <input
          type="email"
          required
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Email"
        />

        <input
          type="password"
          required
          autoComplete="on"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <div className="row">
          <button type="submit" onClick={handleClick} disabled={isFetching}>
            Login
          </button>
          {error && (
            <span style={{ color: "red" }}>
              Please check the details you entered...
            </span>
          )}
          <Link href="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;

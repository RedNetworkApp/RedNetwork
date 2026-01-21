"use client";
import React, { useState } from "react";
import Link from "next/link";
import "../../styles/login.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetch("https://fair-cyan-catfish-cape.cyclic.app/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // "Access-Control-Allow-Origin": "*", // Not needed in client fetch usually, handled by CORS on server
      },
      body: JSON.stringify({
        username,
        email,
        mobile,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Handle success/fail
        console.log(data);
      });
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          required
          placeholder="Name"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          required
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="number"
          required
          placeholder="Phone Number"
          onChange={(e) => setMobile(e.target.value)}
        />

        <input
          type="password"
          name="password"
          required
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="row">
          <button type="submit">Register</button>
          <Link href="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}

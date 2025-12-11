import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", { username, email, password });
      alert("Account created successfully");
      navigate("/login");
    } catch (error) {
      alert("Signup failed, try different email");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Create Account</h2>

      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          className="auth-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-btn" type="submit">Sign Up</button>

        <a className="auth-link" onClick={() => navigate("/login")}>
          Already have an account? Login
        </a>
      </form>
    </div>
  );
};

export default Signup;

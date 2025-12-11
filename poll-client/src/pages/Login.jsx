import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post("/auth/login", { email, password });
    const { token, user } = res.data;

    localStorage.setItem("pv_token", token);
    localStorage.setItem("pv_user", JSON.stringify(user));

    
    navigate("/dashboard"); // redirect to homepage or admin page
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.error || "Login failed");
  }
};



  return (
    <div className="auth-container">
      <h2 className="auth-title">Welcome Back</h2>

      <form onSubmit={handleLogin}>
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

        <button className="auth-btn" type="submit">Login</button>

        <a className="auth-link" onClick={() => navigate("/signup")}>
          Don't have an account? Sign up
        </a>
      </form>
    </div>
  );
};

export default Login;

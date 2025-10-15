// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiService } from "../api/apiService";
import "../App.css";
import vvcoeLogo from "../assets/vvcoe_logo.jpg";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const roles = ["Student", "Faculty", "Alumni", "HOD", "Principal", "Staff"];

  const handleLogin = async () => {
    if (!email || !password || !role) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    const data = await ApiService.login(email, password, role);
    setLoading(false);

    if (data && data.access_token) {
      localStorage.setItem("token", data.access_token);
      alert("Login successful!");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials or role");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src={vvcoeLogo} alt="VVCOE Logo" className="logo" />
        <h2 className="auth-title">Login</h2>

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
        <select
          className="auth-input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          {roles.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>

        <button
          className="auth-button"
          disabled={loading}
          onClick={handleLogin}
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <p className="auth-link">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </div>
  );
}

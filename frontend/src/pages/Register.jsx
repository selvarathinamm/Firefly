import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiService } from "../api/apiService";
import "../App.css";
import vvcoeLogo from "../assets/vvcoe_logo.jpg";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    const success = await ApiService.register(name, email, password);
    setLoading(false);

    if (success) {
      alert("Registration successful!");
      navigate("/login");
    } else {
      alert("Registration failed!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src={vvcoeLogo} alt="VVCOE Logo" className="logo" />
        <h2 className="auth-title">Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="auth-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

        <button
          className="auth-button"
          disabled={loading}
          onClick={handleRegister}
        >
          {loading ? "Loading..." : "Register"}
        </button>

        <p className="auth-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function validate() {
    if (!email) return "Email is required";
    // simple email check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email";
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    const msg = validate();
    setError(msg);
    if (!msg) {
      // placeholder for real auth
      alert(`Logging in as ${email}`);
    }
  }

  return (
    <div className="login-root">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Sign in</h2>
        {error && <div className="login-error">{error}</div>}

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            autoComplete="current-password"
          />
        </label>

        <button className="login-btn" type="submit">Sign in</button>

        <div className="login-footer">
          <small>No account? <a href="#">Create one</a></small>
        </div>
      </form>
    </div>
  );
}

export default Login;

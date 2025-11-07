import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import vvcoeLogo from "../assets/vvcoe_logo.jpg";
import { useNavigate } from "react-router-dom";
import { login } from "../api/apiService"; // ✅ Centralized API service
import "../styles/Login.css"; // ✅ External CSS file for styling

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const data = await login(email, password);

      if (data?.access_token) {
        localStorage.setItem("token", data.access_token);
        navigate("/welcome");
      } else {
        alert("Invalid login credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="login-background">
      <Paper elevation={10} className="login-card">
        {/* ===== Logo & Header ===== */}
        <Box className="login-header">
          <img src={vvcoeLogo} alt="VVCOE Logo" className="login-logo" />
          <Typography variant="h6" className="login-title">
            VVCOE Connect
          </Typography>
          <Typography variant="body2" className="login-subtitle">
            Use your credentials to log in
          </Typography>
        </Box>

        {/* ===== Email Input ===== */}
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />

        {/* ===== Password Input ===== */}
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  aria-label="toggle password visibility"
                  className="eye-icon"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          className="login-input"
        />

        {/* ===== Login Button ===== */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleLogin}
          disabled={loading}
          className="login-button"
        >
          {loading ? "Authenticating..." : "Login"}
        </Button>
      </Paper>
    </Box>
  );
}

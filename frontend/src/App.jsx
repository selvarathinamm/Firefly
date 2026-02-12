// src/App.jsx
import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function App() {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">VV Firefly Portal</h1>
        <p style={{ color: "var(--text-light)", marginBottom: "24px" }}>
          A secure and smart result analysis system for institutions.
        </p>

        <Button
          variant="contained"
          onClick={() => navigate("/login")}
          sx={{
            width: "100%",
            backgroundColor: "var(--primary)",
            "&:hover": { backgroundColor: "#900f13" },
            color: "white",
            borderRadius: "8px",
            padding: "12px",
            fontSize: "16px",
            fontWeight: 600,
            textTransform: "none",
          }}
        >
          Go to Login
        </Button>
      </div>
    </div>
  );
}

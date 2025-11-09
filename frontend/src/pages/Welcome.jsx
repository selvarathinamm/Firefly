// src/pages/Welcome.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "../App.css";

export default function Welcome() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    // ✅ Redirect to login if no token
    if (!token) {
      navigate("/login");
      return;
    }

    // ✅ Get stored email (optional if you saved during login)
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Welcome Tester!</h1>
        <p style={{ color: "var(--text-light)", marginBottom: "20px" }}>
          Hello {email || "tester@gmail.com"},  
          you are successfully logged into the VV Firefly Portal.
        </p>

        <div
          style={{
            backgroundColor: "var(--background)",
            borderRadius: "8px",
            padding: "10px",
            width: "100%",
            marginBottom: "24px",
            fontSize: "14px",
            color: "var(--text-light)",
            boxShadow: "inset 0 0 4px rgba(0,0,0,0.1)",
          }}
        >
           Access Level: Tester Account
        </div>

        <Button
          variant="contained"
          onClick={handleLogout}
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
          Logout
        </Button>
      </div>
    </div>
  );
}

// completed
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "./LoginForm.css";

const AdminLogin = ({ onAdminLoginSuccess }) => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        emailOrUsername,
        password,
      });

      if (response.data.Details.role === "ADMIN") {
        localStorage.setItem("token", response.data.Token); 
        localStorage.setItem("email", response.data.Details.email); 
        localStorage.setItem("role", response.data.Details.role); 
        if (onAdminLoginSuccess) onAdminLoginSuccess(); 
    } else {
        setError("You do not have admin privileges.");
    }
    
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error(error);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <div className="logo-container">
            <img src="#" alt="Logo" className="logo" />
          </div>

          <h2>Admin Login</h2>
          <p className="subheading">Please log in to continue</p>

          {error && <div className="error-message">{error}</div>}

          <div className="input-group">
            <input
              type="text"
              className="input-field"
              placeholder="Email"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Login
          </button>

          <div className="footer">
            <p>
              Forgot your password? <a href="/reset-password">Reset it</a> 
            </p>
            <br/>
            <p>
              Back to User Login?  <a href="/">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

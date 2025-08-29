import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./LoginPage.css";

import AuthImage from '../assets/auth.svg'; // Put your rocket image in public or src/assets


interface LoginPageProps {
  setLoggedIn: (status: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setLoggedIn }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(email, password); // Calls backend via context
      setLoggedIn(true); // Only runs if login succeeds
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-image">
         <img src={AuthImage} alt="Auth Image" />
      </div>

      <div className="login-form-container">
        <div className="login-box">
          <h2>Welcome Back 👋</h2>
          <p className="subtitle">Login to your account</p>

          {error && <p className="error-message">{error}</p>}

          <form className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="email">📧 Email</label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">🔒 Password</label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="extra-links">
            <a href="#">Forgot password?</a>
            <a href="#">
              Don't have an account? <strong>Sign up</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

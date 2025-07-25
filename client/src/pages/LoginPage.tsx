import React from "react";

const LoginPage: React.FC = () => {
  return (
    <div className="login-page">
      {/* Left Side - Image Placeholder */}
      <div className="login-image">
        {/* You can set background-image via CSS later */}
        <span className="image-text">Your image here</span>
      </div>

      {/* Right Side - Form */}
      <div className="login-form-container">
        <div className="login-box">
          <h2>Welcome Back 👋</h2>
          <p className="subtitle">Login to your account</p>

          <form className="login-form">
            <div className="input-group">
              <label htmlFor="email">📧 Email</label>
              <input type="email" id="email" placeholder="you@example.com" />
            </div>

            <div className="input-group">
              <label htmlFor="password">🔒 Password</label>
              <input type="password" id="password" placeholder="••••••••" />
            </div>

            <button type="submit" className="login-button">Login</button>
          </form>

          <div className="extra-links">
            <a href="#">Forgot password?</a>
            <a href="#">Don't have an account? <strong>Sign up</strong></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
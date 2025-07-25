import React from "react";


interface LoginPageProps {
  setLoggedIn: (status: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setLoggedIn }) => {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // You can add real auth here
    setLoggedIn(true); // <- Logs user in
  };

  return (
    <div className="login-page">
      <div className="login-image">
        <span className="image-text">Your image here</span>
      </div>

      <div className="login-form-container">
        <div className="login-box">
          <h2>Welcome Back 👋</h2>
          <p className="subtitle">Login to your account</p>

          <form className="login-form" onSubmit={handleLogin}>
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
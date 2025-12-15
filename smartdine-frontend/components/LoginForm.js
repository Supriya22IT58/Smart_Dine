import React, { useState } from "react";
import { apiLogin } from "../api";

function LoginForm({ onLoginSuccess, goToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await apiLogin(email, password);
      onLoginSuccess(data);
    } catch (err) {
      setError("Unable to contact server. Is backend running on 8000?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page fade-in">
      <div className="auth-card">
        <h2>Welcome back 👋</h2>
        <p className="auth-subtitle">
          Login to access your personalized food recommendations.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="auth-label">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label className="auth-label">
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          {error && <div className="error-message">{error}</div>}

          <button
            className="primary-btn auth-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-footer-text">
          New here?{" "}
          <button className="link-button" type="button" onClick={goToSignup}>
            Create an account
          </button>
        </p>
      </div>

      <div className="auth-side-image">
        <div className="auth-side-overlay">
          <h3>Food made simple</h3>
          <p>Tell SmartDine your mood, budget & cravings. We handle the rest.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

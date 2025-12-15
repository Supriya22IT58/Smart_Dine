import React, { useState } from "react";
import { apiSignup } from "../api";

function SignupForm({ onSignupSuccess, goToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await apiSignup(name, email, password);
      onSignupSuccess(data);
    } catch (err) {
      setError("Could not sign up. Check backend or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page fade-in">
      <div className="auth-card">
        <h2>Create your SmartDine account ✨</h2>
        <p className="auth-subtitle">
          Save your favourite searches and get tailored food suggestions.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="auth-label">
            Name
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Supriya"
            />
          </label>

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
              minLength={4}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
            />
          </label>

          {error && <div className="error-message">{error}</div>}

          <button
            className="primary-btn auth-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="auth-footer-text">
          Already have an account?{" "}
          <button className="link-button" type="button" onClick={goToLogin}>
            Login
          </button>
        </p>
      </div>

      <div className="auth-side-image auth-side-image-right">
        <div className="auth-side-overlay">
          <h3>Discover food around campus</h3>
          <p>From budget-friendly canteens to cozy cafés, all in one place.</p>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;

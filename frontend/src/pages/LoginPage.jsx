import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiLock, FiUser } from "react-icons/fi";

import { login } from "../services/authApi";

import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await login(username, password);

      if (remember) {
        localStorage.setItem("darzidesk-token", result.token);
        localStorage.setItem("darzidesk-owner", result.owner);
      } else {
        sessionStorage.setItem("darzidesk-token", result.token);
        sessionStorage.setItem("darzidesk-owner", result.owner);
      }

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  }

  return (
    <div className="login-page">

      <div className="login-card shadow">

        <img
          src="/logo/darzidesk-logo.png"
          alt="DarziDesk"
          className="login-logo"
        />

        <h2>DarziDesk</h2>

        <p className="text-muted mb-4">
          Tailor Shop Management System
        </p>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <label className="form-label">
              Username
            </label>

            <div className="input-group">

              <span className="input-group-text">
                <FiUser />
              </span>

              <input
                className="form-control"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                required
              />

            </div>

          </div>

          <div className="mb-3">

            <label className="form-label">
              Password
            </label>

            <div className="input-group">

              <span className="input-group-text">
                <FiLock />
              </span>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                className="form-control"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <FiEyeOff />
                ) : (
                  <FiEye />
                )}
              </button>

            </div>

          </div>

          <div className="form-check mb-3">

            <input
              className="form-check-input"
              type="checkbox"
              checked={remember}
              onChange={(e) =>
                setRemember(e.target.checked)
              }
              id="remember"
            />

            <label
              className="form-check-label"
              htmlFor="remember"
            >
              Remember Me
            </label>

          </div>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <button
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default LoginPage;
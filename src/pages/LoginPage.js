import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/api";
import { FaEnvelope, FaLock } from "react-icons/fa";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err); // Log error for debugging
      setError(err.response?.data?.error || "Invalid credentials or user not found");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100 justify-content-center">

        {/* Left: Login Form */}
        <div className="col-lg-4 col-md-6 col-12 d-flex align-items-center justify-content-center">
          <div className="card shadow-lg rounded p-4" style={{ width: "100%", maxWidth: "450px" }}>
            <h2 className="text-primary fw-bold text-center mb-4">THE APP</h2>
            <h3 className="text-center mb-3">Sign In to The App</h3>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label" htmlFor="email">E-mail</label>
                <div className="input-group">
                  <span className="input-group-text"><FaEnvelope /></span>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-describedby="emailHelp"
                    aria-label="Email"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="password">Password</label>
                <div className="input-group">
                  <span className="input-group-text"><FaLock /></span>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    aria-label="Password"
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <input
                    type="checkbox"
                    id="remember"
                    className="form-check-input"
                  />
                  <label htmlFor="remember" className="form-check-label ms-2">
                    Remember me
                  </label>
                </div>
                <Link to="/forgot-password" className="text-primary">Forgot password?</Link>
              </div>

              {/* Smaller submit button with hover effect */}
              <button type="submit" className="btn btn-primary w-100 py-2 shadow-sm transition-all duration-200 hover:shadow-lg focus:outline-none">
                Sign In
              </button>
            </form>

            <p className="mt-3 text-center">
              Don't have an account? <Link to="/register" className="text-primary">Sign up</Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;

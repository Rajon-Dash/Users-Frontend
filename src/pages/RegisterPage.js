import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/api";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setSuccess(""); // Reset success message

    try {
      await axios.post("/auth/register", { name, email, password });
      setSuccess("Registration successful! Redirecting to login...");

      // Clear input fields
      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      if (err.response?.status === 409) {
        setError("Email or name already exists. Please use a different one.");
      } else if (err.response?.status === 400) {
        setError("All fields are required.");
      } else {
        setError(err.response?.data?.error || "Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100 justify-content-center">

        {/* Left: Registration Form */}
        <div className="col-lg-4 col-md-6 col-12 d-flex align-items-center justify-content-center">
          <div className="card shadow-lg rounded p-4" style={{ width: "100%", maxWidth: "450px" }}>
            <h2 className="text-primary fw-bold text-center mb-4">THE APP</h2>
            <h3 className="text-center mb-3">Create an Account</h3>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label className="form-label" htmlFor="name">Full Name</label>
                <div className="input-group">
                  <span className="input-group-text"><FaUser /></span>
                  <input
                    id="name"
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    aria-label="Full Name"
                  />
                </div>
              </div>

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

              {/* Submit Button with Hover Effect */}
              <button
                type="submit"
                className="btn btn-primary w-100 py-2 shadow-sm transition-all duration-200 hover:shadow-lg focus:outline-none"
              >
                Sign Up
              </button>
            </form>

            <p className="mt-3 text-center">
              Already have an account? <Link to="/login" className="text-primary">Sign in</Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;

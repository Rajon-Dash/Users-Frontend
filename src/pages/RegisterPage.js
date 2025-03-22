
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
    <div className="container-fluid vh-100">
      <div className="row h-100">
        
        {/* Left: Registration Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="w-75">
            <h2 className="text-primary fw-bold text-center">THE APP</h2>
            <h3 className="text-center">Create an Account</h3>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <div className="input-group">
                  <span className="input-group-text"><FaUser /></span>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter your name"
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">E-mail</label>
                <div className="input-group">
                  <span className="input-group-text"><FaEnvelope /></span>
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Enter your email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <span className="input-group-text"><FaLock /></span>
                  <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Enter your password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100">Sign Up</button>
            </form>

            <p className="mt-3 text-center">
              Already have an account? <Link to="/login" className="text-primary">Sign in</Link>
            </p>
          </div>
        </div>

        {/* Right: Image Section */}
        <div className="col-md-6 d-none d-md-block p-0">
          <div 
            className="h-100 w-100" 
            style={{ 
              backgroundImage: `url("/assets/undraw_login_weas.png")`, 
              // backgroundImage: "none",
              backgroundSize: "contain", 
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center"
            }}
          ></div>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;


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
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        
        {/* Left: Login Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="w-75">
            <h2 className="text-primary fw-bold text-center">THE APP</h2>
            <h3 className="text-center">Sign In to The App</h3>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleLogin}>
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

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <input type="checkbox" id="remember" className="form-check-input" />
                  <label htmlFor="remember" className="form-check-label ms-2">Remember me</label>
                </div>
                <Link to="/forgot-password" className="text-primary">Forgot password?</Link>
              </div>

              <button type="submit" className="btn btn-primary w-100">Sign In</button>
            </form>

            <p className="mt-3 text-center">
              Don't have an account? <Link to="/register" className="text-primary">Sign up</Link>
            </p>
          </div>
        </div>

        {/* Right: Image Section */}
        <div className="col-md-6 d-none d-md-block p-0">
          <div 
            className="h-100 w-100" 
            style={{ 
              backgroundImage: `url("/assets/undraw_login_weas.png")`, 
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

export default LoginPage;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SignInWithGoogle from "./SignInWithGoogle";
import Navbar from "./Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(""); // State for email error message
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Email format validation
    const emailRegex = /\S+@\S+\.\S+/;

    if (!newEmail) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(newEmail)) {
      setEmailError("Enter a valid email address (e.g., example@example.com)");
    } else {
      setEmailError("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if email and password are filled and email format is valid
    if (!email || !password || emailError) {
      toast.error("Please fill all fields correctly!", {
        position: "bottom-center",
      });
      return;
    }

    // Simulate successful login by storing user info in session storage
    sessionStorage.setItem('user', JSON.stringify({ email }));
    // Redirect to home page or another page after login
    navigate('/home');
  };

  return (
    <>
    <Navbar></Navbar>
    <div>
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow p-3 mb-5 bg-body rounded">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                  {emailError && (
                    <div style={{ color: "red" }}>{emailError}</div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={!email || !password || emailError}
                  >
                    Login
                  </button>
                </div>
                <p className="forgot-password text-right">
                  New user <a href="/signup">Register Here</a>
                </p>
              </form>
              <SignInWithGoogle />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default Login;

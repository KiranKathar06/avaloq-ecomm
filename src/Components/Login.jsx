import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import SignInWithGoogle from "./SignInWithGoogle";
import Navbar from "./Navbar";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
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
        position: "top-center",
      });
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
       // Simulate successful login by storing user info in session storage
    sessionStorage.setItem("user", JSON.stringify({ email }));
    // Redirect to home page or another page after login
    navigate("/home");
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);

      toast.error('Incorrect passowrd', {
        position: "top-center",
      });
    }

   
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
                      />
                    </div>
                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Login
                      </button>
                    </div>
                    <p className="forgot-password text-right">
                      New user <Link to="/signup">Register Here</Link>
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

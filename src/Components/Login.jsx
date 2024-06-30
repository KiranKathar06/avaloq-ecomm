import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./Firebase";
import { toast } from "react-toastify";
import SignInWithGoogle from "./SignInWithGoogle";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User Register succeefully');
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
      navigate("/home");
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
      });
      console.error("Error logging in", error);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-3 mb-5 bg-body rounded">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-block">
                    Login
                  </button>
                </div>
                <p className="forgot-password text-right">
                  New user <a href="/signup">Register Here</a>
                </p>
              </form>

              <SignInWithGoogle/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
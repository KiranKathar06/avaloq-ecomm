import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./Firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import SignInWithGoogle from "./SignInWithGoogle";
import Navbar from "./Navbar";

const SignUp = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fnameError, setFnameError] = useState("");
  const [lnameError, setLnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const handleFnameChange = (e) => {
    const newFname = e.target.value;
    setFname(newFname);

    const numbers = /\d/;

    if (numbers.test(newFname)) {
      setFnameError("First name should not contain numbers!");
    } else if (!newFname) {
      setFnameError("First name is required");
    } else {
      setFnameError("");
    }
  };

  const handleLnameChange = (e) => {
    const newLname = e.target.value;
    setLname(newLname);

    const numbers = /\d/;

    if (numbers.test(newLname)) {
      setLnameError("Last name should not contain numbers!");
    } else if (!newLname) {
      setLnameError("Last name is required");
    } else {
      setLnameError("");
    }
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (!newEmail) {
      setEmailError("Email is required");
    } else if (!newEmail.includes("@") || !newEmail.endsWith("@gmail.com")) {
      setEmailError("Enter a valid Gmail address (e.g., example@gmail.com)");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const lowerCase = /[a-z]/g;
    const upperCase = /[A-Z]/g;
    const numbers = /[0-9]/g;

    if (!newPassword.match(lowerCase)) {
      setPasswordError("Password should contain lowercase letters!");
    } else if (!newPassword.match(upperCase)) {
      setPasswordError("Password should contain uppercase letters!");
    } else if (!newPassword.match(numbers)) {
      setPasswordError("Password should contain numbers!");
    } else if (newPassword.length < 10) {
      setPasswordError("Password should be at least 10 characters long.");
    } else {
      setPasswordError("");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (
      !fname ||
      !lname ||
      !email ||
      !password ||
      passwordError ||
      fnameError ||
      lnameError ||
      emailError
    ) {
      toast.error("Please fill all fields correctly!", {
        position: "bottom-center",
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User registered successfully", user);

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
        });
      }

      sessionStorage.setItem("authenticatedUser");
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
      navigate("/login");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error registering user:", errorCode, errorMessage);
      toast.error(errorMessage, {
        position: "bottom-center",
      });
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Signup</h2>
                <form onSubmit={handleSignup}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="fname"
                      placeholder="Enter first name"
                      value={fname}
                      onChange={handleFnameChange}
                      required
                    />
                    {fnameError && (
                      <div style={{ color: "red" }}>{fnameError}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="lname"
                      placeholder="Enter last name"
                      value={lname}
                      onChange={handleLnameChange}
                      required
                    />
                    {lnameError && (
                      <div style={{ color: "red" }}>{lnameError}</div>
                    )}
                  </div>
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
                      onChange={handlePasswordChange}
                      required
                    />
                    {passwordError && (
                      <div style={{ color: "red" }}>{passwordError}</div>
                    )}
                  </div>
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      disabled={
                        !fname ||
                        !lname ||
                        !email ||
                        !password ||
                        passwordError ||
                        fnameError ||
                        lnameError ||
                        emailError
                      }
                    >
                      Signup
                    </button>
                  </div>
                </form>

                <SignInWithGoogle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

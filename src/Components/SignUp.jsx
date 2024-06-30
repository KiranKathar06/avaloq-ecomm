import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth,db } from "./Firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import SignInWithGoogle from "./SignInWithGoogle";

const SignUp = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
       const user = userCredential.user;
       console.log('User Register succeefully',user);
       if (user) {
         setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
        });
      }
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
      navigate("/login");
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    toast.error(error.message, {
      position: "bottom-center",
    });
  });
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-3 mb-5 bg-body rounded">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Signup</h2>
              <form onSubmit={handleSignup}>
              <div className="mb-3">
                 <input
                    type="fname"
                    className="form-control"
                    id="fname"
                    placeholder="enter first name"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                 <input
                   type="lname"
                   className="form-control"
                   id="lname"
                    placeholder="enter last name"
                   value={lname}
                   onChange={(e) => setLname(e.target.value)}
                   required
                 />
               </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                     placeholder="enter email"
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
                    placeholder="Enter the password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-block">
                    Signup
                  </button>
                </div>
              </form>

              <SignInWithGoogle/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
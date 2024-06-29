import React from 'react'
import '../assets/google.png';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from './Firebase';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
const SignInWithGoogle = () => {

    const googleLogin =()=>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then(async (result) => {
          console.log(result);
          const user = result.user;
          if (result.user) {
            await setDoc(doc(db, "Users", user.uid), {
              email: user.email,
              firstName: user.displayName,
              lastName: "",
            });
            toast.success("User logged in Successfully", {
              position: "top-center",
            });
            window.location.href = "/profile";
          }
        });
    }
  return (
    <div>
    <p className="continue-p">--Or continue with--</p>
    <div
      style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
      onClick={googleLogin}
    >
      <img src={require("../assets/google.png")} width={"60%"} />
    </div>
  </div>
  )
}

export default SignInWithGoogle
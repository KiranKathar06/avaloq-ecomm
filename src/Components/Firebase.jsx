// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBE7OUTFJd60Ac7uDCBhNWs8G5qA9hBFoM",
  authDomain: "avaloq-ecommerse.firebaseapp.com",
  projectId: "avaloq-ecommerse",
  storageBucket: "avaloq-ecommerse.appspot.com",
  messagingSenderId: "292885691127",
  appId: "1:292885691127:web:e799b671a4d7560480f1f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
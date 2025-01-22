// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {  signInWithEmailAndPassword, createUserWithEmailAndPassword ,updateProfile} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClS0_um-j_7S09SIIPv5iaeceuOQfswvs",
  authDomain: "dr-appointment-65162.firebaseapp.com",
  projectId: "dr-appointment-65162",
  storageBucket: "dr-appointment-65162.firebasestorage.app",
  messagingSenderId: "538667676524",
  appId: "1:538667676524:web:409526a89581958952f949",
  measurementId: "G-Q3ZP16V34V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword,updateProfile };
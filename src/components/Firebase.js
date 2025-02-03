// Import Firebase modules
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile ,sendPasswordResetEmail} from 'firebase/auth';
import { getDatabase, ref, set, push, get, onValue, remove } from 'firebase/database';  // <-- Add push here

// Firebase config (use your actual config)
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
const database = getDatabase(app);  // Initialize Firebase Database

// Export required functions
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, database, ref, set, push, get, onValue, remove ,sendPasswordResetEmail};

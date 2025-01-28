// Import necessary Firebase functions from the SDK
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDatabase, ref, set, push, update } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClS0_um-j_7S09SIIPv5iaeceuOQfswvs",
  authDomain: "dr-appointment-65162.firebaseapp.com",
  projectId: "dr-appointment-65162",
  storageBucket: "dr-appointment-65162.firebasestorage.app",
  messagingSenderId: "538667676524",
  appId: "1:538667676524:web:409526a89581958952f949",
  measurementId: "G-Q3ZP16V34V",
  databaseURL: "https://dr-appointment-65162-default-rtdb.firebaseio.com",  // Realtime Database URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const database = getDatabase(app);
const analytics = getAnalytics(app);  // If you're using analytics in your app

// Export Firebase services for use in your app
export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, database, ref, set, push, update, analytics };

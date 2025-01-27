import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup"; // User signup page component
import DrLogin from "./components/Dr.Login"; // Doctor login page
import DrSignup from "./components/Dr.Signup"; // Doctor signup page
import Home from "./components/Home"; // Home page
import DoctorHome from "./components/DoctorHome.js"; // Doctor home page
import DoctorDetails from "./DoctorDetails"; // Doctor details page component
import { auth } from "./components/Firebase"; // Firebase auth
import { onAuthStateChanged } from "firebase/auth"; // Listen for auth state changes

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsAuthenticated(true);
        setUser(currentUser);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <Routes>
        {/* User Login Route */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/home" /> : <Login />}
        />

        {/* User Signup Route */}
        <Route
          path="/sign-up"
          element={isAuthenticated ? <Navigate to="/home" /> : <Signup />}
        />

        {/* Doctor Login Route */}
        <Route
          path="/dr-login"
          element={isAuthenticated ? <Navigate to="/doctor-home" /> : <DrLogin />}
        />

        {/* Doctor Signup Route */}
        <Route
          path="/dr-signup"
          element={isAuthenticated ? <Navigate to="/doctor-home" /> : <DrSignup />}
        />

        {/* Home Page (protected route) */}
        <Route
          path="/home"
          element={isAuthenticated ? <Home user={user} /> : <Navigate to="/login" />}
        />

        {/* Doctor Home Page (protected route) */}
        <Route
          path="/doctor-home"
          element={isAuthenticated ? <DoctorHome user={user} /> : <Navigate to="/dr-login" />}
        />

        {/* Doctor Details Page */}
        <Route
          path="/doctor-details"
          element={isAuthenticated ? <DoctorDetails /> : <Navigate to="/dr-login" />}
        />
      </Routes>
    </div>
  );
}

export default App;

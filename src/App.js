import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import DoctorDetails from "./DoctorDetails"; // Import DoctorDetails component
import { auth } from "./components/Firebase"; // Import auth from Firebase
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
        {/* If the user is authenticated, navigate to home, otherwise redirect to login */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/home" /> : <Login />}
        />
        <Route
          path="/sign-up"
          element={isAuthenticated ? <Navigate to="/home" /> : <Signup />}
        />
        <Route
          path="/home"
          element={isAuthenticated ? <Home user={user} /> : <Navigate to="/login" />}
        />
        {/* Doctor details page */}
        <Route
          path="/doctor-details"
          element={isAuthenticated ? <DoctorDetails /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import DrLogin from './components/Dr.Login';
import DrSignup from './components/Dr.Signup';
import Home from './components/Home';
import DoctorHome from './components/DoctorHome';
import DoctorDetails from './DoctorDetails';
import { auth, database, ref, get } from './components/Firebase'; // Import required Firebase methods
import { onAuthStateChanged } from 'firebase/auth';
import { AppointmentsProvider } from './components/AppointmentsContext';  // Import the provider

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsAuthenticated(true);
        setUser(currentUser);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setLoading(false); // Set loading to false once auth state is checked
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optional loading message or spinner
  }

  return (
    <AppointmentsProvider>  {/* Wrap your app with the provider */}
      <div className="App">
        <Routes>
          {/* User Login and Signup */}
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="/sign-up"
            element={isAuthenticated ? <Navigate to="/home" /> : <Signup />}
          />

          {/* Doctor Login and Signup */}
          <Route
            path="/dr-login"
            element={isAuthenticated ? <Navigate to="/doctor-home" /> : <DrLogin />}
          />
          <Route
            path="/dr-signup"
            element={isAuthenticated ? <Navigate to="/doctor-home" /> : <DrSignup />}
          />

          {/* Home for User */}
          <Route
            path="/home"
            element={isAuthenticated ? <Home user={user} /> : <Navigate to="/login" />}
          />

          {/* Doctor Home */}
          <Route
            path="/doctor-home"
            element={isAuthenticated ? <DoctorHome user={user} /> : <Navigate to="/dr-login" />}
          />

          {/* Doctor Details */}
          <Route
            path="/doctor-details"
            element={isAuthenticated ? <DoctorDetails /> : <Navigate to="/home" />}
          />
        </Routes>
      </div>
    </AppointmentsProvider>
  );
}

export default App;

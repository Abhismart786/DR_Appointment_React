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
  const [role, setRole] = useState(null); // To store user role (doctor or patient)
  const [loading, setLoading] = useState(true); // To handle loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsAuthenticated(true);
        setUser(currentUser);
        
        // Check user role in Firebase Realtime Database
        const userRef = ref(database, 'users/' + currentUser.uid);
        get(userRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              setRole(snapshot.val().role); // Set the user's role from Firebase
            } else {
              console.log("No role found in the database");
              setRole(null); // In case no role is found
            }
          })
          .catch((error) => {
            console.error("Error fetching user role:", error);
            setRole(null);
          })
          .finally(() => {
            setLoading(false); // Set loading to false once role is fetched
          });
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setRole(null); // Reset the role when user logs out
        setLoading(false); // Reset loading state when logged out
      }
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
            element={isAuthenticated ? <Navigate to={role === "doctor" ? "/doctor-home" : "/home"} /> : <Login />}
          />
          <Route
            path="/sign-up"
            element={isAuthenticated ? <Navigate to={role === "doctor" ? "/doctor-home" : "/home"} /> : <Signup />}
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
            element={isAuthenticated && role !== "doctor" ? <Home user={user} /> : <Navigate to={role === "doctor" ? "/doctor-home" : "/login"} />}
          />

          {/* Doctor Home */}
          <Route
            path="/doctor-home"
            element={isAuthenticated && role === "doctor" ? <DoctorHome user={user} /> : <Navigate to="/dr-login" />}
          />

          {/* Doctor Details */}
          <Route
            path="/doctor-details"
            element={isAuthenticated && role === "doctor" ? <DoctorDetails /> : <Navigate to="/dr-login" />}
          />
        </Routes>
      </div>
    </AppointmentsProvider>
  );
}

export default App;

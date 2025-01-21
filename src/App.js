import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import SignUp from './components/Signup';

// Mock users database
const mockUsers = [
  { username: 'admin', email: 'admin@example.com', password: 'password' }
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(mockUsers); // Array of users

  const loginUser = (username, password) => {
    // Authenticate by checking the username and password
    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
    } else {
      alert('Invalid username or password');
    }
  };

  const signUpUser = (username, email, password) => {
    // Check if username already exists
    const userExists = users.some((user) => user.username === username);
    if (userExists) {
      alert('Username already exists');
      return;
    }

    // Add new user to the mock "database"
    const newUser = { username, email, password };
    setUsers([...users, newUser]);
    setUser(newUser);
    setIsAuthenticated(true); // Auto-login after sign up
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={<Login loginUser={loginUser} />}
        />
        <Route
          path="/sign-up"
          element={<SignUp signUpUser={signUpUser} />}
        />
        <Route
          path="/home"
          element={isAuthenticated ? <Home user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={<Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;

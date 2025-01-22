import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Signup from './components/Signup';

// Mock users database
const mockUsers = [
  { username: 'admin', email: 'admin@example.com', password: 'password' }
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(mockUsers);

  const loginUser = (username, password) => {
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
    const userExists = users.some((user) => user.username === username);
    if (userExists) {
      alert('Username already exists');
      return;
    }

    const newUser = { username, email, password };
    setUsers([...users, newUser]);
    setUser(newUser);
    setIsAuthenticated(true); // Auto-login after sign up
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login loginUser={loginUser} />} />
        <Route path="/sign-up" element={<Signup signUpUser={signUpUser} />} />
        <Route
          path="/home"
          element={isAuthenticated ? <Home user={user} /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;

// Dr.Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "./Firebase"; // Firebase auth imports
import { Link } from "react-router-dom";

const DrLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Error handling
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      // Sign in the doctor using Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);

      // Redirect to the doctor home page on successful login
      navigate("/doctor-home");
    } catch (error) {
      console.error("Error signing in doctor:", error);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      <h2>Dr. Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <button type="submit">Login</button>

        <p>
          Don't have an account?{" "}
          <Link to="/dr-signup">Sign up here</Link>
        </p>
      </form>
    </div>
  );
};

export default DrLogin;

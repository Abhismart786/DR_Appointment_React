import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword, database, ref, get } from "./Firebase"; // Correct imports
import { Link } from "react-router-dom"; // Import Link for navigation

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To handle errors
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      // Sign in the user using Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user data from Firebase to get the role
      const userRef = ref(database, "users/" + user.uid);
      const snapshot = await get(userRef);
      
      if (!snapshot.exists()) {
        setError("User data not found.");
        return;
      }

      const userData = snapshot.val();
      const userRole = userData.role;

      // Redirect based on the user's role
      if (userRole === "doctor") {
        navigate("/doctor-home");
      } else {
        navigate("/patient-home");
      }

    } catch (error) {
      console.error("Error signing in:", error);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
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
          Don't have an account? <Link to="/sign-up">Sign up here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

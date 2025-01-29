import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Make sure you have useNavigate
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"; // Correct imports for Firebase
import { auth, database, ref, set } from "./Firebase"; // Firebase imports
import { Link } from "react-router-dom"; // Import Link for navigation

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For displaying error messages
  const navigate = useNavigate();  // For navigation

  // Default role is "patient", no need to select role from the form
  const role = "patient"; // Hardcoded as "patient"

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      // Create a new user using Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Set the displayName to the user's name
      await updateProfile(user, {
        displayName: name,
      });

      // Save user data and role in Firebase Realtime Database
      const userRef = ref(database, "users/" + user.uid);
      await set(userRef, {
        email: user.email,
        role: role,  // Store user role (hardcoded as "patient")
      });

      // Redirect to the correct page (home page for patient)
      navigate("/home");  // Redirect to User Home if role is "patient"
    } catch (error) {
      console.error("Error creating user:", error);
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already in use.");
      } else {
        setError("Failed to create an account. Please try again.");
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}

        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />

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

        <button type="submit">Sign Up</button>

        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;

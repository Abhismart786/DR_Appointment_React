// Dr.Signup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, createUserWithEmailAndPassword, updateProfile } from "./Firebase"; // Firebase auth imports
import { Link } from "react-router-dom";

const DrSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState(""); // Doctor's specialization
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !specialization) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      // Create doctor user using Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Set the displayName and specialization for the doctor
      await updateProfile(user, {
        displayName: name,
      });

      // Optionally, you can save the specialization info to Firestore or Realtime Database

      // Redirect to the doctor home page
      navigate("/doctor-home");
    } catch (error) {
      console.error("Error creating doctor account:", error);
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already in use.");
      } else {
        setError("Failed to create an account. Please try again.");
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Dr. Signup</h2>
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

        <label htmlFor="specialization">Specialization</label>
        <input
          type="text"
          id="specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          placeholder="Enter your specialization"
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
          Already have an account?{" "}
          <Link to="/dr-login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default DrSignup;

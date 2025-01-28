import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { auth, createUserWithEmailAndPassword, updateProfile } from "./Firebase"; // Firebase auth imports
import { Link } from "react-router-dom"; // For linking to login page

const DrSignup = () => {
  // State for storing user inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState(""); // Doctor's specialization
  const [error, setError] = useState(""); // To store error messages
  const navigate = useNavigate();  // Hook for navigation after successful signup

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!name || !email || !password || !specialization) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      // Create a doctor user using Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Set the displayName to the doctor's name
      await updateProfile(user, {
        displayName: name,
      });

      // Save doctor's additional information (like specialization) to Firebase Database (optional)
      // Assuming you use Firebase Realtime Database or Firestore
      // You can add this line to save specialization (if you're using Realtime Database)
      // const userRef = ref(database, "doctors/" + user.uid);
      // await set(userRef, { specialization: specialization });

      // Redirect doctor to the doctor home page after successful signup
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

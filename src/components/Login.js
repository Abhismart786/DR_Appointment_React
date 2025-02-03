// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth, signInWithEmailAndPassword, database, ref, get } from "./Firebase"; // Correct imports
// import { Link } from "react-router-dom"; // Import Link for navigation

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(""); // To handle errors
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setError("Please fill out all fields.");
//       return;
//     }

//     try {
//       // Sign in the user using Firebase Authentication
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Fetch user data from Firebase to get the role
//       const userRef = ref(database, "users/" + user.uid);
//       const snapshot = await get(userRef);
      
//       if (!snapshot.exists()) {
//         setError("User data not found.");
//         return;
//       }

//       const userData = snapshot.val();
//       const userRole = userData.role;

//       // Redirect based on the user's role
//       if (userRole === "doctor") {
//         navigate("/doctor-home");
//       } else {
//         navigate("/patient-home");
//       }

//     } catch (error) {
//       console.error("Error signing in:", error);
//       setError("Invalid email or password.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         {error && <p className="error-message">{error}</p>}

//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter your email"
//         />

//         <label htmlFor="password">Password</label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Enter your password"
//         />

//         <button type="submit">Login</button>

//         <p>
//           Don't have an account? <Link to="/sign-up">Sign up here</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword, sendPasswordResetEmail } from "./Firebase"; // Correct imports
import { Link } from "react-router-dom"; // Import Link for navigation

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To handle errors
  const [resetEmail, setResetEmail] = useState(""); // For password reset email
  const [isResetMode, setIsResetMode] = useState(false); // To toggle between login and reset modes
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
      
      // Redirect based on user role
      navigate(user.emailVerified ? "/home" : "/verify-email");

    } catch (error) {
      console.error("Error signing in:", error);
      setError("Invalid email or password.");
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (!resetEmail) {
      setError("Please enter your email.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert("Password reset email sent!");
      setIsResetMode(false); // Close the reset mode
    } catch (error) {
      console.error("Error resetting password:", error);
      setError("Error sending password reset email.");
    }
  };

  return (
    <div className="login-container">
      <h2>{isResetMode ? "Reset Password" : "Login"}</h2>
      <form onSubmit={isResetMode ? handlePasswordReset : handleSubmit}>
        {error && <p className="error-message">{error}</p>}

        {isResetMode ? (
          <>
            <label htmlFor="resetEmail">Email</label>
            <input
              type="email"
              id="resetEmail"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <button type="submit">Send Reset Email</button>
          </>
        ) : (
          <>
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
          </>
        )}

        {!isResetMode ? (
          <p>
            Forgot your password?{" "}
            <span className="forgot-password" onClick={() => setIsResetMode(true)}>
              Reset it here
            </span>
          </p>
        ) : (
          <p>
            Remembered your password?{" "}
            <span className="forgot-password" onClick={() => setIsResetMode(false)}>
              Go back to Login
            </span>
          </p>
        )}

        <p>
          Don't have an account? <Link to="/sign-up">Sign up here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

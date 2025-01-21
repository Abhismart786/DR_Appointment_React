import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp({ signUpUser }) {
  const navigate = useNavigate(); // Hook to navigate after successful signup
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();

    // Dummy validation: In a real-world app, validate email format, etc.
    if (!username || !email || !password) {
      setError('Please fill out all fields.');
      return;
    }

    // Simulate user signup (In a real app, you'd call an API here)
    // Call the signUpUser function passed from App.js to update authentication
    signUpUser(username, email);
    
    // After successful signup, redirect to login page
    navigate('/login');
  };

  return (
    <div className="sign-up-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;

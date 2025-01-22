import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './Firebase';

function Home() {
  const navigate = useNavigate();
  
  // Check if user is authenticated
  const user = auth.currentUser;

  // If user is not authenticated, redirect to login page
  if (!user) {
    navigate('/login');
    return null; // Prevent rendering the rest of the component
  }

  const handleLogout = () => {
    auth.signOut();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <div className="home-container">
      <h1>Welcome, {user.displayName || "User"}!</h1>  {/* Display the user's name or fallback to "User" */}
      <p>Email: {user.email}</p>  {/* Display user's email */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;

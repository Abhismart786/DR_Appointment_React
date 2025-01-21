import React from 'react';

function Home({ user }) {
  return (
    <div className="home-container">
      <h2>Welcome, {user.username}!</h2>
      <p>This is the home page.</p>
    </div>
  );
}

export default Home;

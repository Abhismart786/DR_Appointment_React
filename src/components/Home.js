import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './Firebase';

// Expanded sample doctors data
const doctors = {
  'Cardiology': [
    { name: 'Dr. John Smith', specialization: 'Cardiologist', phone: '123-456-7890' },
    { name: 'Dr. Alice Brown', specialization: 'Cardiologist', phone: '987-654-3210' }
  ],
  'Dermatology': [
    { name: 'Dr. Emily White', specialization: 'Dermatologist', phone: '555-555-5555' },
    { name: 'Dr. James Green', specialization: 'Dermatologist', phone: '333-333-3333' }
  ],
  'Orthopedics': [
    { name: 'Dr. Sarah Lee', specialization: 'Orthopedist', phone: '444-444-4444' },
    { name: 'Dr. Mark Taylor', specialization: 'Orthopedist', phone: '666-666-6666' }
  ],
  'Pediatrics': [
    { name: 'Dr. Lily Adams', specialization: 'Pediatrician', phone: '789-123-4560' },
    { name: 'Dr. Thomas King', specialization: 'Pediatrician', phone: '123-789-4561' }
  ],
  'Neurology': [
    { name: 'Dr. Robert Stone', specialization: 'Neurologist', phone: '111-222-3333' },
    { name: 'Dr. Jessica Collins', specialization: 'Neurologist', phone: '444-555-6666' }
  ],
  'Gynecology': [
    { name: 'Dr. Rachel Ford', specialization: 'Gynecologist', phone: '888-222-5555' },
    { name: 'Dr. Monica Park', specialization: 'Gynecologist', phone: '777-888-9999' }
  ],
  'Ophthalmology': [
    { name: 'Dr. Daniel Cooper', specialization: 'Ophthalmologist', phone: '555-333-4444' },
    { name: 'Dr. Olivia Young', specialization: 'Ophthalmologist', phone: '444-222-1111' }
  ],
  'Dentistry': [
    { name: 'Dr. Mary Adams', specialization: 'Dentist', phone: '666-111-3333' },
    { name: 'Dr. Richard Hall', specialization: 'Dentist', phone: '333-555-4444' }
  ],
  'Psychiatry': [
    { name: 'Dr. William Evans', specialization: 'Psychiatrist', phone: '777-333-2222' },
    { name: 'Dr. Nancy Wright', specialization: 'Psychiatrist', phone: '888-444-6666' }
  ],
  'Gastroenterology': [
    { name: 'Dr. Steven Rogers', specialization: 'Gastroenterologist', phone: '999-000-1234' },
    { name: 'Dr. Karen Lewis', specialization: 'Gastroenterologist', phone: '666-777-8888' }
  ],
  // Add more specializations as needed...
};

function Home() {
  const navigate = useNavigate();
  
  // Initialize the state hooks first (unconditionally)
  const [recommendedDoctors, setRecommendedDoctors] = useState([]);
  const [user, setUser] = useState(null);

  // Fetch the current user using useEffect (this will run once when the component mounts)
  useEffect(() => {
    const currentUser = auth.currentUser;
    setUser(currentUser);
  }, []);

  // If the user is not authenticated, redirect to the login page
  if (!user) {
    navigate('/login');
    return null; // Prevent rendering the rest of the component
  }

  const handleLogout = () => {
    auth.signOut();
    navigate('/login'); // Redirect to login after logout
  };

  // Handle body part specialization click
  const handleSpecializationClick = (specialization) => {
    setRecommendedDoctors(doctors[specialization] || []);
  };

  return (
    <div className="home-container">
      <h1>Welcome, {user.displayName || "User"}!</h1>
      <p>Email: {user.email}</p>
      
      {/* Specializations List (Clickable) */}
      <div className="specializations">
        <button onClick={() => handleSpecializationClick('Cardiology')}>Cardiology</button>
        <button onClick={() => handleSpecializationClick('Dermatology')}>Dermatology</button>
        <button onClick={() => handleSpecializationClick('Orthopedics')}>Orthopedics</button>
        <button onClick={() => handleSpecializationClick('Pediatrics')}>Pediatrics</button>
        <button onClick={() => handleSpecializationClick('Neurology')}>Neurology</button>
        <button onClick={() => handleSpecializationClick('Gynecology')}>Gynecology</button>
        <button onClick={() => handleSpecializationClick('Ophthalmology')}>Ophthalmology</button>
        <button onClick={() => handleSpecializationClick('Dentistry')}>Dentistry</button>
        <button onClick={() => handleSpecializationClick('Psychiatry')}>Psychiatry</button>
        <button onClick={() => handleSpecializationClick('Gastroenterology')}>Gastroenterology</button>
        {/* Add more buttons for other specializations if necessary */}
      </div>

      {/* Recommended Doctors List */}
      <div className="recommended-doctors">
        {recommendedDoctors.length > 0 ? (
          <ul>
            {recommendedDoctors.map((doctor, index) => (
              <li key={index}>
                <h3>{doctor.name}</h3>
                <p>Specialization: {doctor.specialization}</p>
                <p>Contact: {doctor.phone}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Click on a specialization to see recommended doctors.</p>
        )}
      </div>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;

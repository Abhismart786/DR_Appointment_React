import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './Firebase';
import './Home.css';

const doctors = {
  'Cardiology': [
    { name: 'Dr. John Smith', specialization: 'Cardiologist', phone: '123-456-7890', description: 'Expert in heart health and cardiology.' },
    { name: 'Dr. Alice Brown', specialization: 'Cardiologist', phone: '987-654-3210', description: 'Specializes in heart diseases and treatments.' }
  ],
  'Dermatology': [
    { name: 'Dr. Emily White', specialization: 'Dermatologist', phone: '555-555-5555', description: 'Specializes in skin care and dermatological treatments.' },
    { name: 'Dr. James Green', specialization: 'Dermatologist', phone: '333-333-3333', description: 'Experienced in treating various skin conditions.' }
  ],
  // Add more specializations...
};

function Home() {
  const navigate = useNavigate();
  
  const [recommendedDoctors, setRecommendedDoctors] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    setUser(currentUser);
  }, []);

  if (!user) {
    navigate('/login');
    return null; 
  }

  const handleLogout = () => {
    auth.signOut();
    navigate('/login');
  };

  const handleSpecializationClick = (specialization) => {
    setRecommendedDoctors(doctors[specialization] || []);
  };

  const handleDoctorClick = (doctor) => {
    navigate('/doctor-details', { state: { doctor } });
  };

  return (
    <div className="home-container">
      <header className="header">
        <h1>Welcome, {user.displayName || "User"}!</h1>
        <p className="email">Email: {user.email}</p>
      </header>
      
      <div className="specializations">
        {Object.keys(doctors).map((specialization, index) => (
          <div 
            key={index} 
            className="specialization-card" 
            onClick={() => handleSpecializationClick(specialization)}
          >
            <h3>{specialization}</h3>
            <p>Click to see recommended doctors</p>
          </div>
        ))}
      </div>

      <div className="recommended-doctors">
        {recommendedDoctors.length > 0 ? (
          <ul>
            {recommendedDoctors.map((doctor, index) => (
              <li key={index} className="doctor-card" onClick={() => handleDoctorClick(doctor)}>
                <h4>{doctor.name}</h4>
                <p><strong>Specialization:</strong> {doctor.specialization}</p>
                <p><strong>Contact:</strong> {doctor.phone}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-doctors">Click on a specialization to see recommended doctors.</p>
        )}
      </div>

      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;

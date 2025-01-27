import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './Firebase';

// Doctor's data
const doctors = {
  'Cardiology': [
    { name: 'Dr. John Smith', specialization: 'Cardiologist', phone: '123-456-7890', description: 'Expert in heart health and cardiology.', rating: 4.5, fee: 150 },
    { name: 'Dr. Alice Brown', specialization: 'Cardiologist', phone: '987-654-3210', description: 'Specializes in heart diseases and treatments.', rating: 4.8, fee: 180 }
  ],
  'Dermatology': [
    { name: 'Dr. Emily White', specialization: 'Dermatologist', phone: '555-555-5555', description: 'Specializes in skin care and dermatological treatments.', rating: 4.2, fee: 120 },
    { name: 'Dr. James Green', specialization: 'Dermatologist', phone: '333-333-3333', description: 'Experienced in treating various skin conditions.', rating: 4.6, fee: 140 }
  ],
  'Orthopedics': [
    { name: 'Dr. Sarah Lee', specialization: 'Orthopedist', phone: '444-444-4444', rating: 4.7, fee: 160 },
    { name: 'Dr. Mark Taylor', specialization: 'Orthopedist', phone: '666-666-6666', rating: 4.3, fee: 140 }
  ],
  'Pediatrics': [
    { name: 'Dr. Lily Adams', specialization: 'Pediatrician', phone: '789-123-4560', rating: 4.8, fee: 110 },
    { name: 'Dr. Thomas King', specialization: 'Pediatrician', phone: '123-789-4561', rating: 4.6, fee: 100 }
  ],
  'Neurology': [
    { name: 'Dr. Robert Stone', specialization: 'Neurologist', phone: '111-222-3333', rating: 4.4, fee: 180 },
    { name: 'Dr. Jessica Collins', specialization: 'Neurologist', phone: '444-555-6666', rating: 4.7, fee: 200 }
  ],
  'Gynecology': [
    { name: 'Dr. Rachel Ford', specialization: 'Gynecologist', phone: '888-222-5555', rating: 4.5, fee: 150 },
    { name: 'Dr. Monica Park', specialization: 'Gynecologist', phone: '777-888-9999', rating: 4.3, fee: 160 }
  ],
  'Ophthalmology': [
    { name: 'Dr. Daniel Cooper', specialization: 'Ophthalmologist', phone: '555-333-4444', rating: 4.6, fee: 130 },
    { name: 'Dr. Olivia Young', specialization: 'Ophthalmologist', phone: '444-222-1111', rating: 4.8, fee: 140 }
  ],
  'Dentistry': [
    { name: 'Dr. Mary Adams', specialization: 'Dentist', phone: '666-111-3333', rating: 4.9, fee: 100 },
    { name: 'Dr. Richard Hall', specialization: 'Dentist', phone: '333-555-4444', rating: 4.4, fee: 120 }
  ],
  'Psychiatry': [
    { name: 'Dr. William Evans', specialization: 'Psychiatrist', phone: '777-333-2222', rating: 4.6, fee: 160 },
    { name: 'Dr. Nancy Wright', specialization: 'Psychiatrist', phone: '888-444-6666', rating: 4.5, fee: 170 }
  ],
  'Gastroenterology': [
    { name: 'Dr. Steven Rogers', specialization: 'Gastroenterologist', phone: '999-000-1234', rating: 4.7, fee: 180 },
    { name: 'Dr. Karen Lewis', specialization: 'Gastroenterologist', phone: '666-777-8888', rating: 4.6, fee: 160 }
  ],
  
  // Include all your other specialties here...
};

function DoctorHome() {
  const navigate = useNavigate();
  const [recommendedDoctors, setRecommendedDoctors] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    setUser(currentUser);
  }, []);

  if (!user) {
    navigate('/dr-login');
    return null;
  }

  const handleLogout = () => {
    auth.signOut();
    navigate('/dr-login');
  };

  const handleSpecializationClick = (specialization) => {
    setRecommendedDoctors(doctors[specialization] || []);
  };

  const handleDoctorClick = (doctor) => {
    navigate('/doctor-details', { state: { doctor } });
  };

  return (
    <div className="doctor-home-container">
      <header className="header">
        <h1>Welcome, Dr. {user.displayName || "Doctor"}!</h1>
        <p className="email">Email: {user.email}</p>
      </header>
      <h1>Here are some specializations with recommended doctors</h1>
      <br />
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
                <p><strong>Rating:</strong> {doctor.rating} ⭐</p>
                <p><strong>Fee:</strong> ${doctor.fee}</p>
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

export default DoctorHome;

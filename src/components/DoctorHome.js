import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './Firebase';

const doctors = {
  Cardiology: [
    { name: 'Dr. John Smith', specialization: 'Cardiologist', phone: '123-456-7890', rating: 4.5, fee: 150 },
    { name: 'Dr. Alice Brown', specialization: 'Cardiologist', phone: '987-654-3210', rating: 4.8, fee: 180 },
  ],
  // Add more specializations...
};

function DoctorHome() {
  const navigate = useNavigate();
  const [recommendedDoctors, setRecommendedDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);  // Holds appointments
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
    navigate('/doctor-details', { state: { doctor, setAppointments } }); // Passing setAppointments
  };

  return (
    <div className="doctor-home-container">
      <header className="header">
        <h1>Welcome, Dr. {user.displayName || 'Doctor'}!</h1>
        <p className="email">Email: {user.email}</p>
      </header>

      <h1>Here are some specializations with recommended doctors</h1>
      <div className="specializations">
        {Object.keys(doctors).map((specialization, index) => (
          <div key={index} className="specialization-card" onClick={() => handleSpecializationClick(specialization)}>
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
          <p>No doctors available for this specialization.</p>
        )}
      </div>

      <h2>Upcoming Appointments:</h2>
      <ul>
        {appointments.length > 0 ? (
          appointments.map((appointment, index) => (
            <li key={index}>
              <p><strong>Patient:</strong> {appointment.patientName}</p>
              <p><strong>Doctor:</strong> {appointment.doctor}</p>
              <p><strong>Time:</strong> {appointment.slot}</p>
            </li>
          ))
        ) : (
          <p>No appointments booked yet.</p>
        )}
      </ul>

      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default DoctorHome;

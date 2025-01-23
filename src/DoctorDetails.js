// DoctorDetails.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './DoctorDetails.css'; // Add styling for doctor details page

function DoctorDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctor } = location.state; // Get doctor data passed via state

  // You can replace this with a more sophisticated scheduling/availability logic
  const [availableSlots, setAvailableSlots] = useState([]);
  
  // Simulated schedule data
  useEffect(() => {
    // Fetch doctor schedule from an API or database here
    const schedule = [
      'Mon 9:00 AM - 12:00 PM',
      'Tue 2:00 PM - 5:00 PM',
      'Wed 9:00 AM - 12:00 PM',
      'Fri 10:00 AM - 1:00 PM'
    ];
    setAvailableSlots(schedule);
  }, []);

  const handleBookAppointment = (slot) => {
    // Here you can add functionality to book an appointment
    alert(`Appointment booked for ${doctor.name} on ${slot}`);
  };

  return (
    <div className="doctor-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back to Home
      </button>

      <div className="doctor-profile">
        <h2>{doctor.name}</h2>
        <p><strong>Specialization:</strong> {doctor.specialization}</p>
        <p>{doctor.description}</p>
      </div>

      <div className="doctor-schedule">
        <h3>Availability</h3>
        <ul>
          {availableSlots.map((slot, index) => (
            <li key={index}>
              {slot} 
              <button className="book-button" onClick={() => handleBookAppointment(slot)}>
                Book Appointment
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DoctorDetails;

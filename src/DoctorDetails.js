import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { database, ref, set, push } from './components/Firebase';  // Import database-related functions
import './DoctorDetalis.css';

function DoctorDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctor, setAppointments } = location.state;

  const [availableSlots, setAvailableSlots] = useState([]);
  const [patientName, setPatientName] = useState('');

  useEffect(() => {
    const schedule = [
      'Mon 9:00 AM - 12:00 PM',
      'Tue 2:00 PM - 5:00 PM',
      'Wed 9:00 AM - 12:00 PM',
      'Fri 10:00 AM - 1:00 PM'
    ];
    setAvailableSlots(schedule);
  }, []);

  const handleBookAppointment = (slot) => {
    if (!patientName) {
      alert('Please enter your name!');
      return;
    }

    const appointment = {
      doctor: doctor.name,
      patientName: patientName,
      slot: slot,
      createdAt: new Date().toISOString(),  // Store the time of appointment creation
    };

    // Reference to the appointments node in Firebase Realtime Database
    const appointmentsRef = ref(database, 'appointments/');  // "appointments" node
    const newAppointmentRef = push(appointmentsRef);  // Use push() to generate a unique key

    // Write the new appointment to the database
    set(newAppointmentRef, appointment)
      .then(() => {
        alert('Appointment booked and saved in Firebase!');
        setAppointments((prevAppointments) => [...prevAppointments, appointment]); // Update local state
        navigate('/doctor-home'); // Navigate back to DoctorHome page
      })
      .catch((error) => {
        alert('Error booking appointment: ' + error.message);
      });
  };

  return (
    <div className="doctor-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>&larr; Back to Home</button>

      <div className="doctor-profile">
        <h2>{doctor.name}</h2>
        <p><strong>Specialization:</strong> {doctor.specialization}</p>
        <p>{doctor.description}</p>
      </div>

      <div className="doctor-schedule">
        <h3>Availability</h3>
        <input 
          type="text" 
          placeholder="Enter your name" 
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)} 
        />
        <ul>
          {availableSlots.map((slot, index) => (
            <li key={index}>
              {slot} 
              <button onClick={() => handleBookAppointment(slot)}>Book Appointment</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DoctorDetails;

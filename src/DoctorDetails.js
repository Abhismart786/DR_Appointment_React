import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { database, ref, push, set } from './components/Firebase';  // Import push
import './DoctorDetalis.css';
function DoctorDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctor, setAppointments } = location.state;  // Destructure correctly

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
      createdAt: new Date().toISOString(), // Adding a timestamp for sorting
      status: 'pending', // Default status for new appointments
    };

    // Push the new appointment to the Firebase database under 'appointments'
    const appointmentsRef = ref(database, 'appointments');
    const newAppointmentRef = push(appointmentsRef);  // Generates a unique ID
    set(newAppointmentRef, appointment)
      .then(() => {
        alert('Appointment booked successfully!');
        navigate('/doctor-home');
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

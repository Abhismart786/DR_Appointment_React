import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, database, ref, onValue, set, remove } from './Firebase';  // Firebase imports
import './DoctorHome.css';

function DoctorHome() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);  // Holds appointments from Firebase
  const [user, setUser] = useState(null);

  // Fetch the current logged-in doctor
  useEffect(() => {
    const currentUser = auth.currentUser;
    setUser(currentUser);
  }, []);

  // Fetch appointments for the logged-in doctor
  useEffect(() => {
    if (user) {
      console.log('Current doctor:', user.displayName); // Debugging: Check doctor displayName

      const appointmentsRef = ref(database, 'appointments/');
      onValue(appointmentsRef, (snapshot) => {
        const data = snapshot.val();
        console.log('Fetched appointments data:', data); // Debugging: log fetched data

        if (data) {
          // Filter appointments for the current doctor
          const doctorAppointments = Object.entries(data)
            .filter(([key, appointment]) => {
              // Normalize doctor names to compare them case-insensitively and trim spaces
              const doctorName = appointment.doctor ? appointment.doctor.toLowerCase().trim() : '';
              const userName = user.displayName ? user.displayName.toLowerCase().trim() : '';
              console.log('Appointment:', appointment); // Debugging: log individual appointments
              return doctorName === userName;  // Compare normalized names
            })
            .map(([key, appointment]) => ({ id: key, ...appointment }));

          console.log('Doctor-specific appointments:', doctorAppointments); // Debugging: log filtered appointments

          setAppointments(doctorAppointments);  // Update the appointments state
        } else {
          setAppointments([]);
        }
      });
    }
  }, [user]);  // Re-run when user changes

  // Redirect if no doctor is logged in
  if (!user) {
    navigate('/dr-login');
    return null;
  }

  // Logout handler
  const handleLogout = () => {
    auth.signOut();
    navigate('/dr-login');
  };

  // Handle accepting an appointment
  const handleAcceptAppointment = (appointmentId) => {
    const updatedAppointments = [...appointments];
    const appointment = updatedAppointments.find(app => app.id === appointmentId);
    const appointmentRef = ref(database, `appointments/${appointmentId}`);

    // Update the status in Firebase
    set(appointmentRef, { ...appointment, status: 'accepted' })
      .then(() => {
        // Update the local state to reflect the accepted status
        appointment.status = 'accepted';
        setAppointments(updatedAppointments); // Trigger re-render with the updated status

        // Alert with full information of doctor and patient
        alert(`Appointment Accepted!\n\nDoctor: ${appointment.doctor}\nPatient: ${appointment.patientName}\nTime: ${appointment.slot}\nStatus: Accepted`);
      })
      .catch((error) => {
        alert('Error accepting appointment: ' + error.message);
      });
  };

  // Handle rejecting an appointment
  const handleRejectAppointment = (appointmentId) => {
    const updatedAppointments = [...appointments];
    const appointment = updatedAppointments.find(app => app.id === appointmentId);
    const appointmentRef = ref(database, `appointments/${appointmentId}`);

    remove(appointmentRef)  // Remove the appointment
      .then(() => {
        // Remove the appointment from the local state
        setAppointments(updatedAppointments.filter(app => app.id !== appointmentId));

        // Alert with full information of doctor and patient
        alert(`Appointment Rejected!\n\nDoctor: ${appointment.doctor}\nPatient: ${appointment.patientName}\nTime: ${appointment.slot}\nStatus: Rejected`);
      })
      .catch((error) => {
        alert('Error rejecting appointment: ' + error.message);
      });
  };

  return (
    <div className="doctor-home-container">
      <header className="header">
        <h1>Welcome,  {user.displayName || 'Doctor'}!</h1>
        <p className="email">Email: {user.email}</p>
      </header>

      <h1>Upcoming Appointments:</h1>
      <ul>
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <li key={appointment.id}>
              <p><strong>Patient:</strong> {appointment.patientName}</p>
              <p><strong>Doctor:</strong> {appointment.doctor}</p>
              <p><strong>Time:</strong> {appointment.slot}</p>
              <p><strong>Status:</strong> {appointment.status}</p> {/* Display current status */}
              <button 
                onClick={() => handleAcceptAppointment(appointment.id)} 
                disabled={appointment.status === 'accepted'} // Disable if already accepted
              >
                {appointment.status === 'accepted' ? 'Accepted' : 'Accept'}
              </button>
              <button 
                onClick={() => handleRejectAppointment(appointment.id)} 
                disabled={appointment.status === 'rejected'} // Disable if already rejected
              >
                {appointment.status === 'rejected' ? 'Rejected' : 'Reject'}
              </button>
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
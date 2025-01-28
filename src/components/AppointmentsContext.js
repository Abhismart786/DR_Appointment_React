import React, { createContext, useState, useContext } from 'react';

// Create a context for the appointment data
const AppointmentsContext = createContext();

// Create a provider component
export const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  // Function to add an appointment to the context
  const bookAppointment = (appointment) => {
    setAppointments((prevAppointments) => [...prevAppointments, appointment]);
  };

  return (
    <AppointmentsContext.Provider value={{ appointments, bookAppointment }}>
      {children}
    </AppointmentsContext.Provider>
  );
};

// Custom hook to use the appointment context
export const useAppointments = () => {
  return useContext(AppointmentsContext);
};

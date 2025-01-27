// DoctorHome.js
import React from "react";

const DoctorHome = ({ user }) => {
  return (
    <div>
      <h2>Welcome, Dr. {user.displayName}</h2>
      <p>Specialization: {user.specialization}</p>
      {/* You can add additional content specific to doctors here */}
    </div>
  );
};

export default DoctorHome;

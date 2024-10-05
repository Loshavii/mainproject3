
// // src/components/CoachDashboard.js
// import React from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
// import '../CSS/CoachDashboard.css';

// const CoachDashboard = () => {
//   const navigate = useNavigate(); // Initialize the useNavigate hook

//   const goToProfile = () => {
//     navigate('/coach-profile'); // Navigate to the CoachProfile page
//   };

//   return (
//     <div className="dashboard-container">
//       <aside className="sidebar">
//         <div className="profile-section">
//           <img src="profile-pic-url" alt="Profile" className="profile-pic" />
//           <h3>Jane Cooper</h3>
//         </div>
//         <nav className="nav-links">
//           <a href="/dashboard" className="active">Dashboard</a>
//           <a href="/members">My Members</a>
//         </nav>
//       </aside>
//       <main className="main-content">
//         <header className="dashboard-header">
//           <h2>My Dashboard</h2>
//         </header>
//         <section className="onboarding-section">
//           <div className="onboarding-text">
//             <h3>Coach Onboarding</h3>
//             <p>
//               You’re a few steps away from getting started as a coach!
//               Make sure to fill out your assessment to ensure you get the best possible matches with new alumni.
//             </p>
//           </div>
//           <div className="onboarding-buttons">
//             <button className="btn complete-profile" onClick={goToProfile}>Complete Your Profile</button> {/* Button triggers navigation */}
//             <button className="btn take-assessment">Take Assessment</button>
//           </div>
//         </section>
//         <section className="stats-section">
//           <div className="stat-card">
//             <h4>Pending Connections</h4>
//             <p>1</p>
//           </div>
//           <div className="stat-card">
//             <h4>Current Connections</h4>
//             <p>14</p>
//           </div>
//           <div className="stat-card">
//             <h4>Closed Connections</h4>
//             <p>3</p>
//           </div>
//           <div className="stat-card">
//             <h4>Average Coaching Time</h4>
//             <p>12 Days</p>
//           </div>
//           <div className="stat-card">
//             <h4>Organization Connections Made</h4>
//             <p>15</p>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default CoachDashboard;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/CoachDashboard.css';

const CoachDashboard = () => {
  const [coach, setCoach] = useState(null); // State to hold coach details
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoachData = async () => {
      try {
        const coachId = sessionStorage.getItem('id'); // Get coach ID from sessionStorage
        const token = sessionStorage.getItem('token'); // Get token from sessionStorage
        if (coachId && token) {
          const response = await axios.get(`http://localhost:2003/api/coaches/coaches/${coachId}`, {
            headers: {
              Authorization: `Bearer ${token}` // Pass token in headers
            }
          });
          setCoach(response.data); // Set coach data from API response
        } else {
          navigate('/login'); // If no ID or token, redirect to login
        }
      } catch (error) {
        console.error('Error fetching coach data:', error);
      }
    };

    fetchCoachData();
  }, [navigate]);

  const goToProfile = () => {
    navigate('/coach-profile');
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="profile-section">
          {/* Show coach's name and email if data is available */}
          {coach && (
            <>
              <img src="profile-pic-url" alt="Profile" className="profile-pic" />
              <h3>{`${coach.firstName} ${coach.lastName}`}</h3>
              <p>{coach.email}</p>
            </>
          )}
        </div>
        <nav className="nav-links">
          <a href="/dashboard" className="active">Dashboard</a>
          <a href="/members">My Members</a>
        </nav>
      </aside>
      <main className="main-content">
        <header className="dashboard-header">
          <h2>My Dashboard</h2>
        </header>
        <section className="onboarding-section">
          <div className="onboarding-text">
            <h3>Coach Onboarding</h3>
            <p>
              You’re a few steps away from getting started as a coach!
              Make sure to fill out your assessment to ensure you get the best possible matches with new alumni.
            </p>
          </div>
          <div className="onboarding-buttons">
            <button className="btn complete-profile" onClick={goToProfile}>Complete Your Profile</button>
            <button className="btn take-assessment">Take Assessment</button>
          </div>
        </section>
        <section className="stats-section">
          {/* Your stat cards */}
        </section>
      </main>
    </div>
  );
};

export default CoachDashboard;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/CoachDashboard.css';

const CoachDashboard = () => {
  const [user, setUser] = useState(null); // State to hold coach details
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoachData = async () => {
      try {
        const userId = sessionStorage.getItem('id'); // Get coach ID from sessionStorage
        const token = sessionStorage.getItem('token'); // Get token from sessionStorage
        if (userId && token) {
          const response = await axios.get(`http://localhost:2003/api/users/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}` // Pass token in headers
            }
          });
          setUser(response.data); // Set coach data from API response
        } else {
          navigate('/loginuser'); // If no ID or token, redirect to login
        }
      } catch (error) {
        console.error('Error fetching coach data:', error);
      }
    };

    fetchCoachData();
  }, [navigate]);

  const goToProfile = () => {
    navigate('/profile-setup');
  };

  const goToCoachcard = () => {
    navigate('/coach');
  };
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="profile-section">
          {/* Show coach's name and email if data is available */}
          {user && (
            <>
              <img src="profile-pic-url" alt="Profile" className="profile-pic" />
              <h3>{`${user.firstName} ${user.lastName}`}</h3>
              <p>{user.email}</p>
            </>
          )}
        </div>
        <nav className="nav-links">
          <a href="/dashboard" className="active">Dashboard</a>
          {/* <a href="/members">My Members</a> */}
        </nav>
      </aside>
      <main className="main-content">
        <header className="dashboard-header">
          <h2>My Dashboard</h2>
        </header>
        <section className="onboarding-section">
          <div className="onboarding-text">
            <h3>🌟 Welcome to Your User Dashboard! 🌟

</h3>
            <p>
            You're just a few steps away from achieving your fitness goals! To get the best possible matches with coaches, please take a moment to fill out your assessment. This will help us understand your needs and connect you with the right coach to support your journey.
            </p>
            <p>
            Let’s get started on your path to success! 💪✨
            </p>
          </div>
          <div className="onboarding-buttons">
            <button className="btn complete-profile" onClick={goToProfile}>Complete Your Profile</button>
            <button className="btn take-assessment" onClick={goToCoachcard}>Find the Coach</button>
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

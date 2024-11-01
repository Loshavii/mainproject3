import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../CSS/CoachDashboard.css';

const CoachDashboard = () => {
  const [user, setUser] = useState(null); // State to hold basic user details
  const [profileData, setProfileData] = useState(null); // State to hold full profile data
  const navigate = useNavigate();
  const handleMakePayment = () => {
    // Logic for navigating to the payment page or initiating the payment process
    navigate('/payment'); // Navigate to the Payment page
    // You could redirect or call an API for creating the payment intent here
  };
  
  useEffect(() => {
    const fetchCoachData = async () => {
      try {
        const userId = sessionStorage.getItem('id'); // Get user ID from sessionStorage
        const token = sessionStorage.getItem('token'); // Get token from sessionStorage
        if (userId && token) {
          const userResponse = await axios.get(`http://localhost:2003/api/users/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}` // Pass token in headers
            }
          });
          const userData = userResponse.data;
          setUser(userData);

          // Fetch profile data using email
          const profileResponse = await axios.get(`http://localhost:2003/api/profiles/${userData.email}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setProfileData(profileResponse.data); // Set profile data from API response

        } else {
          navigate('/loginuser'); // If no ID or token, redirect to login
        }
      } catch (error) {
        console.error('Error fetching data:', error);
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
          {user && (
            <>
              <img src="profile-pic-url" alt="Profile" className="profile-pic" />
              <h3>{`${user.username}`}</h3>
              <p>{user.email}</p>
            </>
          )}
        </div>
      </aside>
      <main className="main-content">
        <header className="dashboard-header">
          <h2>My Dashboard</h2>
        </header>
        <section className="onboarding-section">
          <div className="onboarding-text">
            <h3>🌟 Welcome to Your User Dashboard! 🌟</h3>
            <p>
              You're just a few steps away from achieving your fitness goals! To get the best possible matches with coaches, please take a moment to fill out your assessment.
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
        <section className="status-section">
          {/* Display profile data and status */}
          {profileData && (
            <div>
              {profileData.status === 'approved' ? (
                <div className="status-message congratulation">
                  <h3>🎉 Congratulations! Your profile has been approved! 🎉</h3>
                  <p>You are now ready to start connecting with coaches. Best of luck on your fitness journey!</p>
                  <button className="make-payment-button" onClick={handleMakePayment}>Make a Payment</button>
                </div>
              ) : profileData.status === 'declined' ? (
                <div className="status-message rejection">
                  <h3>❌ Unfortunately, your profile has been rejected. ❌</h3>
                  <p>Please review your information and try again. We're here to help!</p>
                </div>
              ) : profileData.status === 'pending' ? (
                <div className="status-message pending">
                  <h3>⏳ Your profile is currently pending approval. ⏳</h3>
                  <p>Thank you for your patience! We will notify you once the review process is complete.</p>
                </div>
              ) : null}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default CoachDashboard;

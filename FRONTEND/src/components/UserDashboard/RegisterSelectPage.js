
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/RegisterSelectPage.css'; // Assuming a custom CSS file for styling

function RegisterSelectPage() {
  const navigate = useNavigate();

  const navigateToCoachDetail = () => {
    navigate('/coach');
  };

  const handleCoachLogin = () => {
    navigate('/register-coach');
  };

  const handleUserLogin = () => {
    navigate('/register-user');
  };

  return (
    <div className="landing-container">
      <div className="left-content">
        <h1>Welcome to Fitaybl</h1>
        <p>
          Track your fitness journey with personalized workout plans, virtual coaches, 
          and advanced analytics designed to help you achieve your goals. Whether you're 
          a beginner or a fitness expert, Fitaybl offers everything you need to stay on 
          top of your progress.
        </p>
        <button className="find-coach-button" onClick={navigateToCoachDetail}>
          Find a Coach
        </button>
      </div>

     
      <div className="right-content">
        <div className="top-right">
          <button className="user-login-button" onClick={handleUserLogin}>
            Login
          </button>
        </div>

        <div className="bottom-right">
          <div className="coachi-card">
            <p>
              Ready to help others reach their fitness goals? Join our platform and become a coach today!
            </p>
            <button className="coach-login-button" onClick={handleCoachLogin}>
              Register Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterSelectPage;

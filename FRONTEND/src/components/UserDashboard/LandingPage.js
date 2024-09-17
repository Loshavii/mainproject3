

import React from 'react';
import '../CSS/Landing.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom'; 

import img from '../sign.png';

const Landing = () => {
  const navigate = useNavigate(); 

  const handleStartToday = () => {
    navigate('/register-select'); 
  };

  return (
    <div className="land-container">
      <Link to="/loginuser" className="profile-icon">
        <FontAwesomeIcon icon={faUserCircle} size="2x" />
      </Link>
      <div className="text-left">
        <h1 className="app-title">FitAYBL</h1>
        <h2 className="subtitle">#1 workout tracking app</h2>
        <h1 className="main-heading">Your Fitness Your Way</h1>
        <p className="heading">with MyFitAYBL</p>
        <p className="description">
          Personalized plans, Social interaction, and insights - All in one app.
        </p>
        <button className="start-button" onClick={handleStartToday}>START TODAY</button>
      </div>
      <div className="phone-preview">
        <img src={img} alt="App Preview" className="phone-image" />
      </div>
    </div>
  );
};

export default Landing;



import "../CSS/CoachDetail.css";
import profile from '../profile.jpg';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

    function CoachDetail() {
      const navigate = useNavigate();
      const [showForm, setShowForm] = useState(false);
    
      const handleSendRequest = () => {
        navigate('/profile-setup'); 
      };
    return (
      <div className="profile-card">
      <div className="profile-container">
        <div className="left-side">
          <div className="profile-picture">
            <img src={profile} alt="Profile" />
          </div>
          <h2>John Doe</h2>
          <h3>Fitness Coach</h3>
          <div className="details">
            <p><strong>Age:</strong> 35</p>
            <p><strong>Education:</strong> B.S. in Sports Science</p>
            <p><strong>Location:</strong> Los Angeles, CA</p>
          </div>
          <div className="buttons-row">
          <button className="follow-button">Follow</button>
          <button className="send-request-button" onClick={handleSendRequest}>Send Request</button>
        </div>
        
        </div>
        <div className="right-side">
          <div className="card">
            <h4>Bio</h4>
            <p>John Doe is a certified fitness coach with over 10 years of experience in helping clients achieve their health and fitness goals. He specializes in weight training, cardio, and nutrition planning.</p>
          </div>
          <div className="card">
            <h4>Qualifications</h4>
            <p>Certified Strength and Conditioning Specialist (CSCS), NASM Certified Personal Trainer, and Nutrition Specialist.</p>
          </div>
          <div className="card">
            <h4>Coaching Style</h4>
            <p>John focuses on personalized workout plans tailored to individual needs, with an emphasis on sustainable lifestyle changes and holistic health.</p>
          </div>
          <div className="card">
            <h4>Availability</h4>
            <p>Available for one-on-one coaching sessions during weekdays and weekends, both in-person and online.</p>
          </div>
        </div>
      </div>
      </div>
    );
  }
  
 

export default CoachDetail;


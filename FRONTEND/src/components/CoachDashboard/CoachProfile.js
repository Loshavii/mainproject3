
import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/CoachProfile.css';

const CoachProfile = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    nickName: '',
    gender: '',
    age: '',
    education: '',
    country: '',
    location: '',
    language: '',
    timeZone: '',
    email: 'alexarowles@gmail.com', 
    bio: '',
    qualification: '',
    coachingStyle: '',
    availability: ''
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2003/api/coaches/profile', profile);
      console.log('Profile saved:', response.data);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <div className="coach-profile">
      <h1>Welcome, Amanda</h1>
      <div className="profile-header">
        <img src="/path/to/profile/image" alt="Profile" className="profile-image" />
        <div className="profile-name">
          <h2>Alexa Rowles</h2>
          <p>{profile.email}</p>
        </div>
        <button className="edit-button">Edit</button>
      </div>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Your Full Name"
              value={profile.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nickName">Nick Name</label>
            <input
              type="text"
              id="nickName"
              name="nickName"
              placeholder="Your Nick Name"
              value={profile.nickName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={profile.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              placeholder="Your Age"
              value={profile.age}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="education">Education</label>
            <input
              type="text"
              id="education"
              name="education"
              placeholder="Your Education"
              value={profile.education}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="qualification">Qualification</label>
            <input
              type="text"
              id="qualification"
              name="qualification"
              placeholder="Your Qualification"
              value={profile.qualification}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            placeholder="Your Bio"
            value={profile.bio}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="coachingStyle">Coaching Style</label>
          <textarea
            id="coachingStyle"
            name="coachingStyle"
            placeholder="Your Coaching Style"
            value={profile.coachingStyle}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="availability">Availability</label>
          <textarea
            id="availability"
            name="availability"
            placeholder="Your Availability"
            value={profile.availability}
            onChange={handleChange}
          />
        </div>
        <div className="form-group email-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            disabled
          />
        </div>
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default CoachProfile;




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

// import React, { useState } from 'react';
// import '../CSS/CoachDetail.css';

// const CoachDetail = () => {
//   const [profile, setProfile] = useState({
//     fullName: '',
//     nickName: '',
//     gender: '',
//     country: '',
//     language: '',
//     timeZone: '',
//     email: 'alexarowles@gmail.com'
//   });

//   const handleChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="coach-profile">
//       <h1>Welcome, Amanda</h1>
//       <div className="profile-header">
//         <img src="/api/placeholder/100/100" alt="Profile" className="profile-image" />
//         <div className="profile-name">
//           <h2>Alexa Rowles</h2>
//           <p>alexarowles@gmail.com</p>
//         </div>
//         <button className="edit-button">Edit</button>
//       </div>
//       <form className="profile-form">
//         <div className="form-row">
//           <div className="form-group">
//             <label htmlFor="fullName">Full Name</label>
//             <input
//               type="text"
//               id="fullName"
//               name="fullName"
//               placeholder="Your Full Name"
//               value={profile.fullName}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="nickName">Nick Name</label>
//             <input
//               type="text"
//               id="nickName"
//               name="nickName"
//               placeholder="Your Nick Name"
//               value={profile.nickName}
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//         <div className="form-row">
//           <div className="form-group">
//             <label htmlFor="gender">Gender</label>
//             <select
//               id="gender"
//               name="gender"
//               value={profile.gender}
//               onChange={handleChange}
//             >
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="country">Country</label>
//             <select
//               id="country"
//               name="country"
//               value={profile.country}
//               onChange={handleChange}
//             >
//               <option value="">Select Country</option>
//               {/* Add more country options here */}
//             </select>
//           </div>
//         </div>
//         <div className="form-row">
//           <div className="form-group">
//             <label htmlFor="language">Language</label>
//             <select
//               id="language"
//               name="language"
//               value={profile.language}
//               onChange={handleChange}
//             >
//               <option value="">Select Language</option>
//               {/* Add more language options here */}
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="timeZone">Time Zone</label>
//             <select
//               id="timeZone"
//               name="timeZone"
//               value={profile.timeZone}
//               onChange={handleChange}
//             >
//               <option value="">Select Time Zone</option>
//               {/* Add more time zone options here */}
//             </select>
//           </div>
//         </div>
//         <div className="form-group email-group">
//           <label htmlFor="email">My email Address</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={profile.email}
//             onChange={handleChange}
//             disabled
//           />
//           <span className="email-verified">1 month ago</span>
//         </div>
//         <button type="button" className="add-email-button">+ Add Email Address</button>
//       </form>
//     </div>
//   );
// };

// export default CoachDetail;

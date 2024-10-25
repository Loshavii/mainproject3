
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import '../CSS/ProfileCard.css'; // Import your CSS file for styling

// function ProfileCard() {
//   const { email } = useParams(); // Get the email from the route parameter
//   const [profileData, setProfileData] = useState(null);
//   const [errorMessage, setErrorMessage] = useState('');

//   // Fetch profile data based on the email from the URL
//   useEffect(() => {
//     console.log('Email parameter:', email); // Add this line for debugging

//     const fetchProfileData = async () => {
//       try {
//         console.log(`Fetching profile data for email: ${email}`);
//         const response = await axios.get(`http://localhost:2003/api/profiles/${encodeURIComponent(email)}`);
//         console.log('Profile data fetched:', response.data);
//         setProfileData(response.data);
//       } catch (error) {
//         console.error('Error fetching profile data:', error);
//         setErrorMessage('Error fetching profile data.');
//       }
//     };

//     if (email) {
//       fetchProfileData();
//     } else {
//       console.warn('No email provided to fetch the profile data.');
//       setErrorMessage('No email provided.');
//     }
//   }, [email]);

//   // Error message handling
//   if (errorMessage) {
//     return <div className="error-message">{errorMessage}</div>;
//   }

//   // Loading state before profile data is fetched
//   if (!profileData) {
//     return <div className="loading">Loading profile...</div>;
//   }

//   return (
//     <div className="profile-card">
//       {/* Profile Header Section */}
//       <div className="profile-header">
//         <h2 className="profile-name">{profileData.name}</h2>
//         <p className="profile-tagline">{profileData.email} | {profileData.phone}</p>
//       </div>

//       {/* Personal Information Section */}
//       <div className="profile-section">
//         <h3>Personal Information</h3>
//         <div className="profile-grid">
//           <div className="profile-item">
//             <strong>Date of Birth:</strong>
//             <span>{profileData.dateOfBirth}</span>
//           </div>
//           <div className="profile-item">
//             <strong>Gender:</strong>
//             <span>{profileData.gender}</span>
//           </div>
//         </div>
//       </div>

//       {/* Health Information Section */}
//       <div className="profile-section">
//         <h3>Health Information</h3>
//         <div className="profile-grid">
//           <div className="profile-item">
//             <strong>Height:</strong>
//             <span>{profileData.height} cm</span>
//           </div>
//           <div className="profile-item">
//             <strong>Weight:</strong>
//             <span>{profileData.weight} kg</span>
//           </div>
//           <div className="profile-item">
//             <strong>Blood Type:</strong>
//             <span>{profileData.bloodType}</span>
//           </div>
//           <div className="profile-item">
//             <strong>Allergies:</strong>
//             <span>{profileData.allergies}</span>
//           </div>
//           <div className="profile-item">
//             <strong>Chronic Conditions:</strong>
//             <span>{profileData.chronicConditions}</span>
//           </div>
//           <div className="profile-item">
//             <strong>Medications:</strong>
//             <span>{profileData.medications}</span>
//           </div>
//         </div>
//       </div>

//       {/* Lifestyle Information Section */}
//       <div className="profile-section">
//         <h3>Lifestyle Information</h3>
//         <div className="profile-grid">
//           <div className="profile-item">
//             <strong>Dietary Preferences:</strong>
//             <span>{profileData.dietaryPreferences}</span>
//           </div>
//           <div className="profile-item">
//             <strong>Exercise Routine:</strong>
//             <span>{profileData.exerciseRoutine}</span>
//           </div>
//           <div className="profile-item">
//             <strong>Sleep Pattern:</strong>
//             <span>{profileData.sleepPattern} hours</span>
//           </div>
//         </div>
//       </div>

//       {/* Fitness Goals Section */}
//       <div className="profile-section">
//         <h3>Fitness Goals</h3>
//         <div className="profile-grid">
//           <div className="profile-item">
//             <strong>Target Weight:</strong>
//             <span>{profileData.targetWeight} kg</span>
//           </div>
//           <div className="profile-item">
//             <strong>Fitness Objectives:</strong>
//             <span>{profileData.fitnessObjectives}</span>
//           </div>
//         </div>
//       </div>

//       {/* Health Metrics Section */}
//       <div className="profile-section">
//         <h3>Health Metrics</h3>
//         <div className="profile-grid">
//           <div className="profile-item">
//             <strong>Blood Pressure:</strong>
//             <span>{profileData.bloodPressure}</span>
//           </div>
//           <div className="profile-item">
//             <strong>Heart Rate:</strong>
//             <span>{profileData.heartRate} bpm</span>
//           </div>
//           <div className="profile-item">
//             <strong>Blood Sugar Levels:</strong>
//             <span>{profileData.bloodSugarLevels}</span>
//           </div>
//         </div>
//       </div>

//       {/* Contact Option Section */}
//       <div className="profile-section">
//         <h3>Contact Option</h3>
//         <div className="profile-grid">
//           <div className="profile-item">
//             <strong>Contact:</strong>
//             <span>{profileData.contactOption === 'chat' ? '💬 Contact via Chat' : '📹 Contact via Video Interaction'}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProfileCard;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/ProfileCard.css'; // Import your CSS file for styling

function ProfileCard() {
  const [profileData, setProfileData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch profile data based on the coachEmail stored in sessionStorage
  useEffect(() => {
    // Retrieve coachEmail from sessionStorage
    const coachEmail = sessionStorage.getItem('coachEmail');
    
    console.log('Coach email from sessionStorage:', coachEmail); // For debugging

    // Function to fetch profile data
    const fetchProfileData = async () => {
      try {
        // Fetch the profile using the coachEmail
        const response = await axios.get(`http://localhost:2003/api/profiles/coach/${coachEmail}`);
        console.log('Profile data fetched:', response.data);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setErrorMessage('Error fetching profile data.');
      }
    };

    // Check if coachEmail exists and fetch data
    if (coachEmail) {
      fetchProfileData();
    } else {
      console.warn('No coachEmail found in sessionStorage.');
      setErrorMessage('No coachEmail provided.');
    }
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Error message handling
  if (errorMessage) {
    return <div className="error-message">{errorMessage}</div>;
  }

  // Loading state before profile data is fetched
  if (!profileData) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-card">
      {/* Profile Header Section */}
      <div className="profile-header">
        <h2 className="profile-name">{profileData.name}</h2>
        <p className="profile-tagline">{profileData.email} | {profileData.phone}</p>
      </div>

      {/* Personal Information Section */}
      <div className="profile-section">
        <h3>Personal Information</h3>
        <div className="profile-grid">
          <div className="profile-item">
            <strong>Date of Birth:</strong>
            <span>{profileData.dateOfBirth}</span>
          </div>
          <div className="profile-item">
            <strong>Gender:</strong>
            <span>{profileData.gender}</span>
          </div>
        </div>
      </div>

      {/* Health Information Section */}
      <div className="profile-section">
        <h3>Health Information</h3>
        <div className="profile-grid">
          <div className="profile-item">
            <strong>Height:</strong>
            <span>{profileData.height} cm</span>
          </div>
          <div className="profile-item">
            <strong>Weight:</strong>
            <span>{profileData.weight} kg</span>
          </div>
          <div className="profile-item">
            <strong>Blood Type:</strong>
            <span>{profileData.bloodType}</span>
          </div>
          <div className="profile-item">
            <strong>Allergies:</strong>
            <span>{profileData.allergies}</span>
          </div>
          <div className="profile-item">
            <strong>Chronic Conditions:</strong>
            <span>{profileData.chronicConditions}</span>
          </div>
          <div className="profile-item">
            <strong>Medications:</strong>
            <span>{profileData.medications}</span>
          </div>
        </div>
      </div>

      {/* Lifestyle Information Section */}
      <div className="profile-section">
        <h3>Lifestyle Information</h3>
        <div className="profile-grid">
          <div className="profile-item">
            <strong>Dietary Preferences:</strong>
            <span>{profileData.dietaryPreferences}</span>
          </div>
          <div className="profile-item">
            <strong>Exercise Routine:</strong>
            <span>{profileData.exerciseRoutine}</span>
          </div>
          <div className="profile-item">
            <strong>Sleep Pattern:</strong>
            <span>{profileData.sleepPattern} hours</span>
          </div>
        </div>
      </div>

      {/* Fitness Goals Section */}
      <div className="profile-section">
        <h3>Fitness Goals</h3>
        <div className="profile-grid">
          <div className="profile-item">
            <strong>Target Weight:</strong>
            <span>{profileData.targetWeight} kg</span>
          </div>
          <div className="profile-item">
            <strong>Fitness Objectives:</strong>
            <span>{profileData.fitnessObjectives}</span>
          </div>
        </div>
      </div>

      {/* Health Metrics Section */}
      <div className="profile-section">
        <h3>Health Metrics</h3>
        <div className="profile-grid">
          <div className="profile-item">
            <strong>Blood Pressure:</strong>
            <span>{profileData.bloodPressure}</span>
          </div>
          <div className="profile-item">
            <strong>Heart Rate:</strong>
            <span>{profileData.heartRate} bpm</span>
          </div>
          <div className="profile-item">
            <strong>Blood Sugar Levels:</strong>
            <span>{profileData.bloodSugarLevels}</span>
          </div>
        </div>
      </div>

      {/* Contact Option Section */}
      <div className="profile-section">
        <h3>Contact Option</h3>
        <div className="profile-grid">
          <div className="profile-item">
            <strong>Contact:</strong>
            <span>{profileData.contactOption === 'chat' ? '💬 Contact via Chat' : '📹 Contact via Video Interaction'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;

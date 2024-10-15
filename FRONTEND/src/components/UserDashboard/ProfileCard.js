

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../CSS/ProfileCard.css';

// // function ProfileCard() {
// //   const [profileData, setProfileData] = useState(null);
// //   const [errorMessage, setErrorMessage] = useState('');

// //   useEffect(() => {
// //     const fetchProfileData = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:2003/api/profiles/');
// //         setProfileData(response.data);
// //       } catch (error) {
// //         setErrorMessage('Error fetching profile data.');
// //         console.error('There was an error fetching the profile data:', error);
// //       }
// //     };

// //     fetchProfileData();
// //   }, []);

// //   if (!profileData) {
// //     return <div className="loading">Loading profile...</div>;
// //   }

// function ProfileCard({ email }) { // Accept email as a prop
//   const [profileData, setProfileData] = useState(null);
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         // Fetch profile by email
//         const response = await axios.get(`http://localhost:2003/api/profiles/${email}`);
//         setProfileData(response.data);
//       } catch (error) {
//         setErrorMessage('Error fetching profile data.');
//         console.error('There was an error fetching the profile data:', error);
//       }
//     };

//     if (email) {
//       fetchProfileData(); // Fetch the profile only if email is provided
//     }
//   }, [email]); // Re-run the effect if email changes

//   if (!profileData) {
//     return <div className="loading">Loading profile...</div>;
//   }

//   return (
//     <div className="profile-card">
//       {errorMessage && <p className="error-message">{errorMessage}</p>}
      
//       <div className="profile-header">
//         <h2 className="profile-name">{profileData.name}</h2>
//         <p className="profile-tagline">{profileData.email} | {profileData.phone}</p>
//       </div>

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
import '../CSS/ProfileCard.css';

function ProfileCard({ email }) { // Accept email as a prop
  const [profileData, setProfileData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        console.log(`Fetching profile data for email: ${email}`); // Debugging log
        // Fetch profile by email
        const response = await axios.get(`http://localhost:2003/api/profiles/${email}`);
        console.log('Profile data fetched:', response.data); // Log the response data
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error); // Log the error for debugging
        setErrorMessage('Error fetching profile data.');
      }
    };

    if (email) {
      fetchProfileData(); // Fetch the profile only if email is provided
    } else {
      console.warn('No email provided to fetch the profile data.');
      setErrorMessage('No email provided.');
    }
  }, [email]); // Re-run the effect if email changes

  if (errorMessage) {
    return <div className="error-message">{errorMessage}</div>; // Display error message
  }

  if (!profileData) {
    return <div className="loading">Loading profile...</div>; // Loading state
  }

  return (
    <div className="profile-card">
      <div className="profile-header">
        <h2 className="profile-name">{profileData.name}</h2>
        <p className="profile-tagline">{profileData.email} | {profileData.phone}</p>
      </div>

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

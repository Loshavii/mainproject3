
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Search, Settings, MessageCircle } from 'lucide-react';
// import imge from '../personalcoach.jpg';
// import '../CSS/UserDashboard.css';



// const UserDashboard = () => {
//   const [user, setUser] = useState(null); // State to hold user details
//   const [formData, setFormData] = useState({
//     firstName: '',
//     email: '',
//     dateOfBirth: '',
//     age: '',
//     gender: '',
//     phone: '',
//     height: '',
//     weight: '',
//     bloodType: '',
//     allergies: '',
//     chronicConditions: '',
//     medications: '',
//     dietaryPreferences: '',
//     exerciseRoutine: '',
//     sleepPattern: '',
//     targetWeight: '',
//     fitnessObjectives: '',
//     bloodPressure: '',
//     heartRate: '',
//     bloodSugarLevels: ''
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userId = sessionStorage.getItem('id'); // Get user ID from sessionStorage
//         const token = sessionStorage.getItem('token'); // Get token from sessionStorage
//         if (userId && token) {
//           const response = await axios.get(`http://localhost:2003/api/users/users/${userId}`, {
//             headers: {
//               Authorization: `Bearer ${token}` // Pass token in headers
//             }
//           });
//           setUser(response.data); // Set user data from API response
//         } else {
//           navigate('/login'); // If no ID or token, redirect to login
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, [navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:2003/api/profiles/', formData);
//       alert('Profile created successfully!');
//       setUser(response.data); // Show submitted data
//     } catch (error) {
//       console.error('Error creating profile:', error);
//     }
//   };

//   return (
//     <div className="user-profile">
//       <header>
//         <h1>USER PROFILE</h1>
//         <div className="header-right">
//           <div className="search-container">
//             <input type="text" placeholder="Search" />
//             <Search className="search-icon" />
//           </div>
//           <img src="/api/placeholder/40/40" alt="User avatar" className="avatar" />
//         </div>
//       </header>

//       <main>
//       <section className="welcome-section">
//           {user && (
//             <>
//               <h2>Hello {user.firstName} {user.lastName}</h2>
//               <p>{user.email}</p>
//             </>
//           )}
//           <p>This is your profile page. You can see the progress you've made with your work and manage your projects or assigned tasks.</p>
//           <button className="edit-profile-btn">Edit profile</button>
//         </section>


//         <div className="profile-grid">
//           <div className="account-info">
//             <div className="account-header">
//               <h3>My Account</h3>
//               {/* <button className="settings-btn">
//                 <Settings />
//                 <span>Settings</span>
//               </button> */}
//             </div>
//             <div className="user-details">
            
//               <form onSubmit={handleSubmit}>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label className="label">First Name</label>
//                   <input type="text" required onChange={handleChange} />
//                 </div>
//                 <div className="form-group">
//                   <label className="label">Email</label>
//                   <input type="email" required onChange={handleChange} />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label className="label">Date of Birth</label>
//                   <input type="date" required onChange={handleChange} />
//                 </div>
//                 <div className="form-group">
//                   <label className="label">Age</label>
//                   <input type="number" required onChange={handleChange} />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label className="label">Gender</label>
//                   <select required>
//                     <option value="">Select Gender</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label className="label">Phone</label>
//                   <input type="tel" required onChange={handleChange} />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label className="label">Weight (kg)</label>
//                   <input type="number" required onChange={handleChange}/>
//                 </div>
//                 <div className="form-group">
//                   <label className="label">Height (cm)</label>
//                   <input type="number" required onChange={handleChange} />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label className="label">Target Weight (kg)</label>
//                   <input type="number" onChange={handleChange} />
//                 </div>
//                 <div className="form-group">
//                   <label className="label">Blood Type</label>
//                   <input type="text" onChange={handleChange} />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label className="label">Allergies</label>
//                   <input type="text" onChange={handleChange} />
//                 </div>
//                 <div className="form-group">
//                   <label className="label">Chronic Conditions</label>
//                   <input type="text" onChange={handleChange} />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label className="label">Medications</label>
//                   <input type="text" onChange={handleChange} />
//                 </div>
//                 <div className="form-group">
//                   <label className="label">Dietary Preferences</label>
//                   <input type="text" onChange={handleChange} />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label className="label">Exercise Routine</label>
//                   <input type="text" onChange={handleChange} />
//                 </div>
//                 <div className="form-group">
//                   <label className="label">Sleep Pattern (hours)</label>
//                   <input type="number" onChange={handleChange} />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label className="label">Blood Sugar Levels</label>
//                   <input type="text" onChange={handleChange}/>
//                 </div>
//                 <div className="form-group">
//                   <label className="label">Fitness Objectives</label>
//                   <input type="text" onChange={handleChange} />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label className="label">Blood Pressure</label>
//                   <input type="text" onChange={handleChange} />
//                 </div>
//                 <div className="form-group">
//                   <label className="label">Heart Rate</label>
//                   <input type="number" onChange={handleChange} />
//                 </div>
//               </div>

//               <button type="submit" className="btn">Submit</button>
//               </form>
//             </div>
//           </div>

//           <div className="profile-card">
//             <div className="form-row">
//             <img src={imge} alt="Profile" className="profile-image" />
//             </div>
//             <div className="form-row">
//             <div className="coach-section">
//               <p className="coach-info">Find a Coach to help you reach your fitness goals.</p>
//               <button className="next-btn" onClick={() => navigate('/coach')}>
//                 Next
//               </button>
//             </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default UserDashboard;













// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Search, Settings, MessageCircle } from 'lucide-react';
// import imge from '../personalcoach.jpg';
// import '../CSS/UserDashboard.css';

// const UserDashboard = () => {
//   const [user, setUser] = useState(null); // State to hold user details
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     dateOfBirth: '',
//     age: '',
//     gender: '',
//     phone: '',
//     height: '',
//     weight: '',
//     bloodType: '',
//     allergies: '',
//     chronicConditions: '',
//     medications: '',
//     dietaryPreferences: '',
//     exerciseRoutine: '',
//     sleepPattern: '',
//     targetWeight: '',
//     fitnessObjectives: '',
//     bloodPressure: '',
//     heartRate: '',
//     bloodSugarLevels: ''
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userId = sessionStorage.getItem('id'); // Get user ID from sessionStorage
//         const token = sessionStorage.getItem('token'); // Get token from sessionStorage
//         if (userId && token) {
//           const response = await axios.get(`http://localhost:2003/api/users/users/${userId}`, {
//             headers: {
//               Authorization: `Bearer ${token}` // Pass token in headers
//             }
//           });
//           setUser(response.data); // Set user data from API response
//         } else {
//           navigate('/login'); // If no ID or token, redirect to login
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, [navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Form Data being submitted:', formData); // Debugging
//     try {
//       const response = await axios.post('http://localhost:2003/api/profiles/', formData);
//       alert('Profile created successfully!');
//       setUser(response.data); // Show submitted data
//     } catch (error) {
//       console.error('Error creating profile:', error.response?.data || error);
//     }
//   };

//   return (
//     <div className="user-profile">
//       <header>
//         <h1>USER PROFILE</h1>
//         <div className="header-right">
//           <div className="search-container">
//             <input type="text" placeholder="Search" />
//             <Search className="search-icon" />
//           </div>
//           <img src="/api/placeholder/40/40" alt="User avatar" className="avatar" />
//         </div>
//       </header>

//       <main>
//         <section className="welcome-section">
//           {user && (
//             <>
//               <h2>Hello {user.firstName} {user.lastName}</h2>
//               <p>{user.email}</p>
//             </>
//           )}
//           <p>This is your profile page. You can see the progress you've made with your work and manage your projects or assigned tasks.</p>
//           <button className="edit-profile-btn">Edit profile</button>
//         </section>

//         <div className="profile-grid">
//           <div className="account-info">
//             <div className="account-header">
//               <h3>My Account</h3>
//               {/* <button className="settings-btn">
//                 <Settings />
//                 <span>Settings</span>
//               </button> */}
//             </div>
//             <div className="user-details">
//               <form onSubmit={handleSubmit}>
//                 <div className="form-row">
//                   <div className="form-group">
//                     <label className="label">First Name</label>
//                     <input type="text" name="firstName" value={formData.firstName} required onChange={handleChange} />
//                   </div>
//                   <div className="form-group">
//                     <label className="label">Email</label>
//                     <input type="email" name="email" value={formData.email} required onChange={handleChange} />
//                   </div>
//                 </div>

//                 <div className="form-row">
//                   <div className="form-group">
//                     <label className="label">Date of Birth</label>
//                     <input type="date" name="dateOfBirth" value={formData.dateOfBirth} required onChange={handleChange} />
//                   </div>
//                   <div className="form-group">
//                     <label className="label">Age</label>
//                     <input type="number" name="age" value={formData.age} required onChange={handleChange} />
//                   </div>
//                 </div>

//                 <div className="form-row">
//                   <div className="form-group">
//                     <label className="label">Gender</label>
//                     <select name="gender" value={formData.gender} required onChange={handleChange}>
//                       <option value="">Select Gender</option>
//                       <option value="male">Male</option>
//                       <option value="female">Female</option>
//                       <option value="other">Other</option>
//                     </select>
//                   </div>
//                   <div className="form-group">
//                     <label className="label">Phone</label>
//                     <input type="tel" name="phone" value={formData.phone} required onChange={handleChange} />
//                   </div>
//                 </div>

//                 <div className="form-row">
//                   <div className="form-group">
//                     <label className="label">Weight (kg)</label>
//                     <input type="number" name="weight" value={formData.weight} required onChange={handleChange} />
//                   </div>
//                   <div className="form-group">
//                     <label className="label">Height (cm)</label>
//                     <input type="number" name="height" value={formData.height} required onChange={handleChange} />
//                   </div>
//                 </div>

//                 <div className="form-row">
//                   <div className="form-group">
//                     <label className="label">Target Weight (kg)</label>
//                     <input type="number" name="targetWeight" value={formData.targetWeight} onChange={handleChange} />
//                   </div>
//                   <div className="form-group">
//                     <label className="label">Blood Type</label>
//                     <input type="text" name="bloodType" value={formData.bloodType} onChange={handleChange} />
//                   </div>
//                 </div>

//                 <div className="form-row">
//                   <div className="form-group">
//                     <label className="label">Allergies</label>
//                     <input type="text" name="allergies" value={formData.allergies} onChange={handleChange} />
//                   </div>
//                   <div className="form-group">
//                     <label className="label">Chronic Conditions</label>
//                     <input type="text" name="chronicConditions" value={formData.chronicConditions} onChange={handleChange} />
//                   </div>
//                 </div>

//                 <div className="form-row">
//                   <div className="form-group">
//                     <label className="label">Medications</label>
//                     <input type="text" name="medications" value={formData.medications} onChange={handleChange} />
//                   </div>
//                   <div className="form-group">
//                     <label className="label">Dietary Preferences</label>
//                     <input type="text" name="dietaryPreferences" value={formData.dietaryPreferences} onChange={handleChange} />
//                   </div>
//                 </div>

//                 <div className="form-row">
//                   <div className="form-group">
//                     <label className="label">Exercise Routine</label>
//                     <input type="text" name="exerciseRoutine" value={formData.exerciseRoutine} onChange={handleChange} />
//                   </div>
//                   <div className="form-group">
//                     <label className="label">Sleep Pattern (hours)</label>
//                     <input type="number" name="sleepPattern" value={formData.sleepPattern} onChange={handleChange} />
//                   </div>
//                 </div>

//                 <div className="form-row">
//                   <div className="form-group">
//                     <label className="label">Blood Sugar Levels</label>
//                     <input type="text" name="bloodSugarLevels" value={formData.bloodSugarLevels} onChange={handleChange} />
//                   </div>
//                   <div className="form-group">
//                     <label className="label">Fitness Objectives</label>
//                     <input type="text" name="fitnessObjectives" value={formData.fitnessObjectives} onChange={handleChange} />
//                   </div>
//                 </div>

//                 <div className="form-row">
//                   <div className="form-group">
//                     <label className="label">Blood Pressure</label>
//                     <input type="text" name="bloodPressure" value={formData.bloodPressure} onChange={handleChange} />
//                   </div>
//                   <div className="form-group">
//                     <label className="label">Heart Rate</label>
//                     <input type="text" name="heartRate" value={formData.heartRate} onChange={handleChange} />
//                   </div>
//                 </div>

//                 <button type="submit" className="submit-btn">Submit</button>
//               </form>
//             </div>
//           </div>
//           <div className="progress">
//             <img src={imge} alt="Progress" />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default UserDashboard;

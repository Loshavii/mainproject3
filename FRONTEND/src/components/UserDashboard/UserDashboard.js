
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, Settings, MessageCircle } from 'lucide-react';
import imge from '../personalcoach.jpg';
import '../CSS/UserDashboard.css';



const UserDashboard = () => {
  const [user, setUser] = useState(null); // State to hold user details
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = sessionStorage.getItem('id'); // Get user ID from sessionStorage
        const token = sessionStorage.getItem('token'); // Get token from sessionStorage
        if (userId && token) {
          const response = await axios.get(`http://localhost:2003/api/users/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}` // Pass token in headers
            }
          });
          setUser(response.data); // Set user data from API response
        } else {
          navigate('/login'); // If no ID or token, redirect to login
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [navigate]);


  return (
    <div className="user-profile">
      <header>
        <h1>USER PROFILE</h1>
        <div className="header-right">
          <div className="search-container">
            <input type="text" placeholder="Search" />
            <Search className="search-icon" />
          </div>
          <img src="/api/placeholder/40/40" alt="User avatar" className="avatar" />
        </div>
      </header>

      <main>
      <section className="welcome-section">
          {user && (
            <>
              <h2>Hello {user.firstName} {user.lastName}</h2>
              <p>{user.email}</p>
            </>
          )}
          <p>This is your profile page. You can see the progress you've made with your work and manage your projects or assigned tasks.</p>
          <button className="edit-profile-btn">Edit profile</button>
        </section>


        <div className="profile-grid">
          <div className="account-info">
            <div className="account-header">
              <h3>My Account</h3>
              {/* <button className="settings-btn">
                <Settings />
                <span>Settings</span>
              </button> */}
            </div>
            <div className="user-details">
            
              <form>

              <div class="form-row">
                <div class="form-group">
                  <label class="label">First Name</label>
                  <input type="text" required />
                </div>
                <div class="form-group">
                  <label class="label">Email</label>
                  <input type="email" required />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="label">Date of Birth</label>
                  <input type="date" required />
                </div>
                <div class="form-group">
                  <label class="label">Age</label>
                  <input type="number" required />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="label">Gender</label>
                  <select required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="label">Phone</label>
                  <input type="tel" required />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="label">Phone</label>
                  <input type="tel" required />
                </div>
                <div class="form-group">
                  <label class="label">Height (cm)</label>
                  <input type="number" required />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="label">Weight (kg)</label>
                  <input type="number" required />
                </div>
                <div class="form-group">
                  <label class="label">Blood Type</label>
                  <input type="text" />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="label">Allergies</label>
                  <input type="text" />
                </div>
                <div class="form-group">
                  <label class="label">Chronic Conditions</label>
                  <input type="text" />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="label">Medications</label>
                  <input type="text" />
                </div>
                <div class="form-group">
                  <label class="label">Dietary Preferences</label>
                  <input type="text" />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="label">Exercise Routine</label>
                  <input type="text" />
                </div>
                <div class="form-group">
                  <label class="label">Sleep Pattern (hours)</label>
                  <input type="number" />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="label">Target Weight (kg)</label>
                  <input type="number" />
                </div>
                <div class="form-group">
                  <label class="label">Fitness Objectives</label>
                  <input type="text" />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="label">Blood Pressure</label>
                  <input type="text" />
                </div>
                <div class="form-group">
                  <label class="label">Heart Rate</label>
                  <input type="number" />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="label">Blood Sugar Levels</label>
                  <input type="text" />
                </div>
              </div>

              <button type="submit" class="btn">Submit</button>
              </form>
            </div>
          </div>

          <div className="profile-card">
            <div class="form-row">
            <img src={imge} alt="Profile" className="profile-image" />
            </div>
            <div class="form-row">
            <div className="coach-section">
              <p className="coach-info">Find a Coach to help you reach your fitness goals.</p>
              <button className="next-btn" onClick={() => navigate('/coach')}>
                Next
              </button>
            </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;

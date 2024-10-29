// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../CSS/Login.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';

// function Loginuser() {
//     const [passwordShown, setPasswordShown] = useState(false);
//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });
//     const [errors, setErrors] = useState({});
//     const [errorMessage, setErrorMessage] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const navigate = useNavigate();

//     const togglePassword = () => {
//         setPasswordShown(!passwordShown);
//     };

//     const handleInputChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const validateForm = () => {
//         const { email, password } = formData;
//         const newErrors = {};

//         if (!email.trim()) {
//             newErrors.email = 'Email is required';
//         } else if (!/\S+@\S+\.\S+/.test(email)) {
//             newErrors.email = 'Email address is invalid';
//         }
//         if (!password.trim()) {
//             newErrors.password = 'Password is required';
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) return;

//         setIsSubmitting(true);

//         try {
//             const response = await axios.post('http://localhost:2003/api/users/login', formData);
//             const { token, id, role } = response.data;

//             // Save login data to sessionStorage
//             sessionStorage.setItem('token', token);
//             sessionStorage.setItem('id', id);
//             sessionStorage.setItem('role', role);

//             setErrorMessage('');

//             // Conditionally navigate based on user role
//             if (role === 'admin') {
//                 navigate('/admin-dashboard'); // Navigate to Admin Dashboard
//             } else if (role === 'user') {
//                 navigate('/user-dashboard'); // Navigate to Coach Page
//             }
//         } catch (error) {
//             setErrorMessage(error.response?.data?.message || 'Invalid login credentials.');
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <div className="login-container">
//             <div className="login-card">
//                 <h2>Login</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="Email"
//                             value={formData.email}
//                             onChange={handleInputChange}
//                         />
//                         {errors.email && <small className="error">{errors.email}</small>}
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type={passwordShown ? 'text' : 'password'}
//                             name="password"
//                             placeholder="Password"
//                             value={formData.password}
//                             onChange={handleInputChange}
//                         />
//                         <button type="button" onClick={togglePassword} className="password-toggle-button">
//                             <FontAwesomeIcon icon={passwordShown ? faEye : faEyeSlash} />
//                         </button>
//                         {errors.password && <small className="error">{errors.password}</small>}
//                     </div>
//                     {errorMessage && <div className="error-message">{errorMessage}</div>}
//                     <button type="submit" className="login-button" disabled={isSubmitting}>
//                         {isSubmitting ? 'Logging in...' : 'Login'}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Loginuser;

import React, { useState } from 'react';
import { Mail, Lock, Loader, User, Key, Shield, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Login.css';

const Loginuser = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className="login-page">
      {/* Left side - Login Form */}
      <div className="login-form-container">
        <div className="login-form">
          {/* Welcome Text */}
          <div className="welcome-text">
            <h1>Welcome Back!</h1>
            <p>Sign in to continue your journey</p>
          </div>

          {/* Avatar */}
          <div className="avatar">
            <div className="avatar-gradient">
              <div className="avatar-inner">
                <User size={32} className="avatar-icon" />
              </div>
            </div>
            {/* Orbiting dots */}
            {[...Array(3)].map((_, i) => (
              <div key={i} className="orbit-dot" style={{ animationDelay: `${i * 1.2}s` }} />
            ))}
          </div>

          <form onSubmit={handleSubmit} className="form1">
            {/* Email Input */}
            <div className={`form-group1 ${focusedInput === 'email' ? 'focused' : ''}`}>
              <div className="input-wrapper1">
                <Mail className={`input-icon1 ${focusedInput === 'email' ? 'focused' : ''}`} size={20} />
                <input
                  type="email"
                  placeholder="Email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  className="login-input1"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className={`form-group1 ${focusedInput === 'password' ? 'focused' : ''}`}>
              <div className="input-wrapper1">
                <Lock className={`input-icon1 ${focusedInput === 'password' ? 'focused' : ''}`} size={20} />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  className="login-input1"
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`login-submit-button ${isLoading ? 'loading' : ''}`}
            >
              <span className="button-text">LOGIN</span>
              {isLoading && <Loader className="loader" size={20} />}
            </button>
          </form>
        </div>
      </div>

      {/* Right side - Animated Illustration */}
      <div className="illustration">
        {/* Animated circles in background */}
        <div className="circles-background">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="circle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }} />
          ))}
        </div>

        {/* Content */}
        <div className="illustration-content">
          <h2>Secure Access Portal</h2>
          <div className="features">
            {[
              { icon: Shield, title: "Enhanced Security", desc: "Multi-layer protection for your data" },
              { icon: Key, title: "Smart Access", desc: "Intelligent authentication system" },
              { icon: Activity, title: "Real-time Monitoring", desc: "Track activity instantly" },
              { icon: User, title: "User Friendly", desc: "Seamless login experience" }
            ].map((feature, index) => (
              <div key={index} className="feature-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <feature.icon className="feature-icon" />
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom text */}
          <p className="create-account">
            New to our platform?
            <button className="create-account-button" onClick={() => navigate('/register-user')}>
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loginuser;

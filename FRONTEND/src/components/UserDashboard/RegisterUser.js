
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../CSS/RegisterUser.css'; 
// import logo from '../logo.png';
// import sign from '../sign.png';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { IoMdPerson, IoMdMail, IoMdLock } from 'react-icons/io';
// import { FaEyeSlash, FaEye } from 'react-icons/fa';

// const RegisterUser = () => {
//     const navigate = useNavigate();
//     const [showPassword, setShowPassword] = useState(false);
//     const [formData, setFormData] = useState({
//         firstName: '',
//         lastName: '',
//         username: '',
//         email: '',
//         password: ''
//     });

//     const [errors, setErrors] = useState({});
//     const [successMessage, setSuccessMessage] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleInputChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const validateForm = () => {
//         const { email, password, firstName, lastName, username } = formData;
//         const newErrors = {};

//         if (!firstName.trim()) newErrors.firstName = 'First name is required';
//         if (!lastName.trim()) newErrors.lastName = 'Last name is required';
//         if (!username.trim()) newErrors.username = 'Username is required';
//         if (!email.trim()) {
//             newErrors.email = 'Email is required';
//         } else if (!/\S+@\S+\.\S+/.test(email)) {
//             newErrors.email = 'Email address is invalid';
//         }
//         if (!password.trim()) {
//             newErrors.password = 'Password is required';
//         } else if (password.length < 6) {
//             newErrors.password = 'Password must be at least 6 characters';
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) return;

//         try {
//             const response = await axios.post('http://localhost:2003/api/users/register', formData);
//             setSuccessMessage('Account created successfully!');
//             setErrorMessage('');
//             setFormData({
//                 firstName: '',
//                 lastName: '',
//                 username: '',
//                 email: '',
//                 password: ''
//             });
//             navigate('/user-dashboard'); 
//         } catch (error) {
//             setErrorMessage(error.response?.data?.error || 'Something went wrong. Please try again.');
//             setSuccessMessage('');
//         }
//     };

//     return (
//         <div className="register-user-container">
//             <div className="register-user-card">
//                 <div className="form-container">
//                     <h2>Create your account</h2>
//                     <form id="createAccountForm" onSubmit={handleSubmit}>
//                         <div className="form-group">
//                             <IoMdPerson className="icon" />
//                             <input
//                                 type="text"
//                                 id="firstName"
//                                 name="firstName"
//                                 placeholder="First Name"
//                                 value={formData.firstName}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                         <div className="form-group">
//                             <IoMdPerson className="icon" />
//                             <input
//                                 type="text"
//                                 id="lastName"
//                                 name="lastName"
//                                 placeholder="Last Name"
//                                 value={formData.lastName}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                         <div className="form-group">
//                             <IoMdPerson className="icon" />
//                             <input
//                                 type="text"
//                                 id="username"
//                                 name="username"
//                                 placeholder="Username"
//                                 value={formData.username}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                         <div className="form-group">
//                             <IoMdMail className="icon" />
//                             <input
//                                 type="email"
//                                 id="email"
//                                 name="email"
//                                 placeholder="Email"
//                                 value={formData.email}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                         <div className="form-group password-group">
//                             <IoMdLock className="icon" />
//                             <input
//                                 type={showPassword ? "text" : "password"}
//                                 id="password"
//                                 name="password"
//                                 placeholder="Password"
//                                 value={formData.password}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                             {showPassword ? (
//                                 <FaEyeSlash className="icon password-toggle" onClick={togglePasswordVisibility} />
//                             ) : (
//                                 <FaEye className="icon password-toggle" onClick={togglePasswordVisibility} />
//                             )}
//                         </div>
//                         <button type="submit" className="submit-butto">
//                             Create my account
//                         </button>
//                         {successMessage && <p className="success">{successMessage}</p>}
//                         {errorMessage && <p className="error">{errorMessage}</p>}
//                         <p className="login-link">
//                             Already have an account? <Link to="/loginuser">Sign In</Link>
//                         </p>
//                     </form>
//                 </div>
//                 <div className="welcome-container">
//                     <h2>Glad to see you!</h2>
//                     <p>Welcome to our platform.</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RegisterUser;



import React, { useState } from 'react';
import { Mail, Lock, Loader, User, Key, Shield, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import '../CSS/RegisterUser.css'; 

const RegisterPage = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [username, setUsername] = useState('');
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

  const handleLoginRedirect = () => {
    navigate('/loginuser'); // Navigate to /loginuser
  };

  return (
    <div className="register-page">
      {/* Left side - Register Form */}
      <div className="register-form-container">
        <div className="register-form">
          {/* Welcome Text */}
          <div className="welcome-text">
            <h1>Create an Account!</h1>
            <p>Start your journey with us today</p>
          </div>

          {/* Avatar */}
          <div className="avatar">
            <div className="avatar-gradient">
              <div className="avatar-inner">
                <User size={32} className="avatar-icon" />
              </div>
            </div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="orbit-dot" style={{ animationDelay: `${i * 1.2}s` }} />
            ))}
          </div>

          <form onSubmit={handleSubmit} className="form">
            {/* Username Input */}
            <div className={`form-group2 ${focusedInput === 'username' ? 'focused' : ''}`}>
              <div className="input-wrapper2">
                <Edit3 className={`input-icon2 ${focusedInput === 'username' ? 'focused' : ''}`} size={20} />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusedInput('username')}
                  onBlur={() => setFocusedInput(null)}
                  className="register-input"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className={`form-group2 ${focusedInput === 'email' ? 'focused' : ''}`}>
              <div className="input-wrapper2">
                <Mail className={`input-icon2 ${focusedInput === 'email' ? 'focused' : ''}`} size={20} />
                <input
                  type="email"
                  placeholder="Email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  className="register-input"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className={`form-group2 ${focusedInput === 'password' ? 'focused' : ''}`}>
              <div className="input-wrapper2">
                <Lock className={`input-icon2 ${focusedInput === 'password' ? 'focused' : ''}`} size={20} />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  className="register-input"
                />
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`register-submit-button ${isLoading ? 'loading' : ''}`}
            >
              <span className="button-text">REGISTER</span>
              {isLoading && <Loader className="loader" size={20} />}
            </button>
          </form>
        </div>
      </div>

      {/* Right side - Animated Illustration */}
      <div className="illustration">
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

        {/* Feature Content */}
        <div className="illustration-content">
          <h2>Join Our Community</h2>
          <div className="features">
            {[
              { icon: Shield, title: "Account Protection", desc: "Secure registration process" },
              { icon: Key, title: "Easy Login", desc: "Simplified access to your dashboard" },
              { icon: Edit3, title: "Personalized Profile", desc: "Customize your experience" },
              { icon: User, title: "Community Access", desc: "Connect with others" }
            ].map((feature, index) => (
              <div key={index} className="feature-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <feature.icon className="feature-icon" />
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom text */}
          <p className="have-account">
            Already have an account? <button className="login-button" onClick={handleLoginRedirect}>Log In</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

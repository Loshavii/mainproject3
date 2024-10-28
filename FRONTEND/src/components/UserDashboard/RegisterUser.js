
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/RegisterUser.css'; 
import logo from '../logo.png';
import sign from '../sign.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { IoMdPerson, IoMdMail, IoMdLock } from 'react-icons/io';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

const RegisterUser = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const { email, password, firstName, lastName, username } = formData;
        const newErrors = {};

        if (!firstName.trim()) newErrors.firstName = 'First name is required';
        if (!lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!username.trim()) newErrors.username = 'Username is required';
        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email address is invalid';
        }
        if (!password.trim()) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await axios.post('http://localhost:2003/api/users/register', formData);
            setSuccessMessage('Account created successfully!');
            setErrorMessage('');
            setFormData({
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: ''
            });
            navigate('/user-dashboard'); 
        } catch (error) {
            setErrorMessage(error.response?.data?.error || 'Something went wrong. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="register-user-container">
            <div className="register-user-card">
                <div className="form-container">
                    <h2>Create your account</h2>
                    <form id="createAccountForm" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <IoMdPerson className="icon" />
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <IoMdPerson className="icon" />
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <IoMdPerson className="icon" />
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <IoMdMail className="icon" />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group password-group">
                            <IoMdLock className="icon" />
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            {showPassword ? (
                                <FaEyeSlash className="icon password-toggle" onClick={togglePasswordVisibility} />
                            ) : (
                                <FaEye className="icon password-toggle" onClick={togglePasswordVisibility} />
                            )}
                        </div>
                        <button type="submit" className="submit-butto">
                            Create my account
                        </button>
                        {successMessage && <p className="success">{successMessage}</p>}
                        {errorMessage && <p className="error">{errorMessage}</p>}
                        <p className="login-link">
                            Already have an account? <Link to="/loginuser">Sign In</Link>
                        </p>
                    </form>
                </div>
                <div className="welcome-container">
                    <h2>Glad to see you!</h2>
                    <p>Welcome to our platform.</p>
                </div>
            </div>
        </div>
    );
};

export default RegisterUser;

// import React, { useState } from 'react';
// import { Mail, Lock, Loader, User, Key, Shield, Activity, UserPlus, AtSign, CheckCircle } from 'lucide-react';
// import '../CSS/RegisterUser.css'; 

// const RegisterPage = () => {
//     const [formData, setFormData] = useState({
//       username: '',
//       email: '',
//       password: '',
//       confirmPassword: ''
//     });
//     const [isLoading, setIsLoading] = useState(false);
//     const [focusedInput, setFocusedInput] = useState(null);
  
//     const handleChange = (e) => {
//       setFormData((prev) => ({
//         ...prev,
//         [e.target.name]: e.target.value
//       }));
//     };
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       setIsLoading(true);
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       setIsLoading(false);
//     };
  
//     const getPasswordStrength = (password) => {
//       if (!password) return 0;
//       let strength = 0;
//       if (password.length >= 8) strength++;
//       if (/[A-Z]/.test(password)) strength++;
//       if (/[0-9]/.test(password)) strength++;
//       if (/[^A-Za-z0-9]/.test(password)) strength++;
//       return strength;
//     };
  
//     const passwordStrength = getPasswordStrength(formData.password);
  
//     return (
//       <div className="container">
//         <div className="form-container">
//           <div className="form-content">
//             <h1 className="title">Create Account</h1>
//             <p className="subtitle">Join us to start your journey</p>
  
//             <div className="avatar">
//               <UserPlus size={32} className="avatar-icon" />
//               {[...Array(3)].map((_, i) => (
//                 <div key={i} className="orbit-dot" style={{ animationDelay: `${i * 1.2}s` }} />
//               ))}
//             </div>
  
//             <form onSubmit={handleSubmit} className="form">
//               <div className={`input-group ${focusedInput === 'username' ? 'focused' : ''}`}>
//                 <User className={`input-icon ${focusedInput === 'username' ? 'icon-focused' : ''}`} size={20} />
//                 <input
//                   type="text"
//                   name="username"
//                   placeholder="Username"
//                   value={formData.username}
//                   onChange={handleChange}
//                   onFocus={() => setFocusedInput('username')}
//                   onBlur={() => setFocusedInput(null)}
//                   className="input"
//                 />
//               </div>
  
//               <div className={`input-group ${focusedInput === 'email' ? 'focused' : ''}`}>
//                 <AtSign className={`input-icon ${focusedInput === 'email' ? 'icon-focused' : ''}`} size={20} />
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email Address"
//                   value={formData.email}
//                   onChange={handleChange}
//                   onFocus={() => setFocusedInput('email')}
//                   onBlur={() => setFocusedInput(null)}
//                   className="input"
//                 />
//               </div>
  
//               <div className={`input-group ${focusedInput === 'password' ? 'focused' : ''}`}>
//                 <Lock className={`input-icon ${focusedInput === 'password' ? 'icon-focused' : ''}`} size={20} />
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="Password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   onFocus={() => setFocusedInput('password')}
//                   onBlur={() => setFocusedInput(null)}
//                   className="input"
//                 />
//                 {formData.password && (
//                   <div className="password-strength">
//                     {[...Array(4)].map((_, index) => (
//                       <div key={index} className={`strength-bar ${index < passwordStrength ? 'strong' : ''}`} />
//                     ))}
//                   </div>
//                 )}
//               </div>
  
//               <div className={`input-group ${focusedInput === 'confirmPassword' ? 'focused' : ''}`}>
//                 <CheckCircle className={`input-icon ${focusedInput === 'confirmPassword' ? 'icon-focused' : ''}`} size={20} />
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   placeholder="Confirm Password"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   onFocus={() => setFocusedInput('confirmPassword')}
//                   onBlur={() => setFocusedInput(null)}
//                   className="input"
//                 />
//               </div>
  
//               <button type="submit" disabled={isLoading} className="submit-button">
//                 <span className={isLoading ? 'hidden' : ''}>CREATE ACCOUNT</span>
//                 <Loader className={`loading-icon ${isLoading ? '' : 'hidden'}`} size={20} />
//               </button>
//             </form>
  
//             <p className="login-link">
//               Already have an account?{' '}
//               <button className="login-button">Sign in</button>
//             </p>
//           </div>
//         </div>
  
//         <div className="graphics-container">
//           {/* Background graphics */}
//         </div>
//       </div>
//     );
//   };
  
//   export default RegisterPage;


// import React, { useState } from 'react';
// import { Mail, Lock, Loader, User, Key, Shield, Activity } from 'lucide-react';
// import '../CSS/RegisterUser.css'; 


// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [focusedInput, setFocusedInput] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     await new Promise(resolve => setTimeout(resolve, 2000));
//     setIsLoading(false);
//   };

//   return (
//     <div className="login-page">
//       {/* Left side - Login Form */}
//       <div className="login-form-container">
//         <div className="login-form">
//           {/* Welcome Text */}
//           <div className="welcome-text">
//             <h1>Welcome Back!</h1>
//             <p>Sign in to continue your journey</p>
//           </div>

//           {/* Avatar */}
//           <div className="avatar">
//   <div className="avatar-gradient">
//     <div className="avatar-inner">
//       <User size={32} className="avatar-icon" />
//     </div>
//   </div>
//   {/* Orbiting dots */}
//   {[...Array(3)].map((_, i) => (
//     <div key={i} className="orbit-dot" style={{ animationDelay: `${i * 1.2}s` }} />
//   ))}
// </div>


//           <form onSubmit={handleSubmit} className="form">
//             {/* Email Input */}
//             <div className={`form-group ${focusedInput === 'email' ? 'focused' : ''}`}>
//               <div className="input-wrapper">
//                 <Mail className={`icon ${focusedInput === 'email' ? 'focused' : ''}`} size={20} />
//                 <input
//                   type="email"
//                   placeholder="Email ID"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   onFocus={() => setFocusedInput('email')}
//                   onBlur={() => setFocusedInput(null)}
//                   className="input"
//                 />
//               </div>
//             </div>

//             {/* Password Input */}
//             <div className={`form-group ${focusedInput === 'password' ? 'focused' : ''}`}>
//               <div className="input-wrapper">
//                 <Lock className={`icon ${focusedInput === 'password' ? 'focused' : ''}`} size={20} />
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   onFocus={() => setFocusedInput('password')}
//                   onBlur={() => setFocusedInput(null)}
//                   className="input"
//                 />
//               </div>
//             </div>

            
//             {/* Login Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className={`login-button ${isLoading ? 'loading' : ''}`}
//             >
//               <span className="button-text">LOGIN</span>
//               {isLoading && <Loader className="loader" size={20} />}
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Right side - Animated Illustration */}
//       <div className="illustration">
//         {/* Animated circles in background */}
//         <div className="circles-background">
//           {[...Array(8)].map((_, i) => (
//             <div key={i} className="circle" style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${5 + Math.random() * 10}s`
//             }} />
//           ))}
//         </div>

//         {/* Content */}
//         <div className="illustration-content">
//           <h2>Secure Access Portal</h2>
// {          // Updated Feature Cards Section in the LoginPage Component
// }<div className="features">
//   {[
//     { icon: Shield, title: "Enhanced Security", desc: "Multi-layer protection for your data" },
//     { icon: Key, title: "Smart Access", desc: "Intelligent authentication system" },
//     { icon: Activity, title: "Real-time Monitoring", desc: "Track activity instantly" },
//     { icon: User, title: "User Friendly", desc: "Seamless login experience" }
//   ].map((feature, index) => (
//     <div key={index} className="feature-card" style={{ animationDelay: `${index * 0.1}s` }}>
//       <feature.icon className="feature-icon" />
//       <h3>{feature.title}</h3>
//       <p>{feature.desc}</p>
//     </div>
//   ))}
// </div>

//           {/* Bottom text */}
//           <p className="create-account">
//             New to our platform?
//             <button className="create-account-button">Create an account</button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

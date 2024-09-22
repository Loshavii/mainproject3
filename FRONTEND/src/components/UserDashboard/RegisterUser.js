
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
            navigate('/coach'); 
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


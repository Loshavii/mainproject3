

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/RegisterCoach.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { IoMdPerson, IoMdMail, IoMdLock, IoMdStar, IoMdBriefcase } from 'react-icons/io';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

const RegisterCoach = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        specialization: '',
        experience: ''
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
        const { email, password, firstName, lastName, username, specialization, experience } = formData;
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
        if (!specialization.trim()) newErrors.specialization = 'Specialization is required';
        if (!experience.trim()) newErrors.experience = 'Experience is required';
        else if (isNaN(experience) || experience <= 0) newErrors.experience = 'Experience must be a positive number';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await axios.post('http://localhost:2003/api/coaches/register', formData);
            setSuccessMessage('Registration successful. Please wait for admin verification.');
            setErrorMessage('');
            setFormData({
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: '',
                specialization: '',
                experience: ''
            });
        } catch (error) {
            setErrorMessage(error.response?.data?.error || 'Something went wrong. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="register-coach-container">
            <div className="register-coach-card">
                <div className="form-container">
                    <h2>Create your Coach account</h2>
                    <form id="createCoachAccountForm" onSubmit={handleSubmit}>
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
                        <div className="form-group">
                            <IoMdStar className="icon" />
                            <input
                                type="text"
                                id="specialization"
                                name="specialization"
                                placeholder="Specialization"
                                value={formData.specialization}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <IoMdBriefcase className="icon" />
                            <input
                                type="number"
                                id="experience"
                                name="experience"
                                placeholder="Years of Experience"
                                value={formData.experience}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button type="submit" className="submit-button">
                            Create my coach account
                        </button>
                        <p className="login-link">
                            Already have an account? <Link to="/login">Sign In</Link>
                        </p>
                        {successMessage && <p className="success-message">{successMessage}</p>}
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </form>
                </div>
                <div className="welcome-contain">
                    <h2>Glad to see you!</h2>
                    <p>Welcome to our coaching platform.</p>
                </div>
            </div>
        </div>
    );
};

export default RegisterCoach;

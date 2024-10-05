import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Loginuser() {
    const [passwordShown, setPasswordShown] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const { email, password } = formData;
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email address is invalid';
        }
        if (!password.trim()) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const response = await axios.post('http://localhost:2003/api/users/login', formData);
            const { token, id, role } = response.data;

            // Save login data to sessionStorage
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('id', id);
            sessionStorage.setItem('role', role);

            setErrorMessage('');

            // Conditionally navigate based on user role
            if (role === 'admin') {
                navigate('/admin-dashboard'); // Navigate to Admin Dashboard
            } else if (role === 'user') {
                navigate('/coach'); // Navigate to Coach Page
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Invalid login credentials.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <small className="error">{errors.email}</small>}
                    </div>
                    <div className="form-group">
                        <input
                            type={passwordShown ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <button type="button" onClick={togglePassword} className="password-toggle-button">
                            <FontAwesomeIcon icon={passwordShown ? faEye : faEyeSlash} />
                        </button>
                        {errors.password && <small className="error">{errors.password}</small>}
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <button type="submit" className="login-button" disabled={isSubmitting}>
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Loginuser;
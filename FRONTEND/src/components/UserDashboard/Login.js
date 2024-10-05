
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Login() {
    const [passwordShown, setPasswordShown] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
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
            // Updated URL to coach login endpoint
            const response = await axios.post('http://localhost:2003/api/coaches/login', formData);
            const { token, id, role } = response.data;

            // Save login data to sessionStorage
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('id', id);
            sessionStorage.setItem('role', role);

            setErrorMessage('');
            setSuccessMessage('Login successful! Redirecting...');

            setTimeout(() => {
                if (role === 'admin') {
                    navigate('/admin-dashboard');
                } else if (role === 'coach') {
                    // Redirect to Coach Profile after coach login
                    navigate('/coach-dashboard');
                } else if (role === 'user') {
                    navigate('/user-dashboard');
                }
            }, 1500);
        } catch (error) {
            setSuccessMessage('');
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
                    {successMessage && <div className="success-message">{successMessage}</div>}
                    <button type="submit" className="login-button" disabled={isSubmitting}>
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;



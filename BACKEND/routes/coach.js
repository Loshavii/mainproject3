const express = require('express');
const router = express.Router();
const Coach = require('../models/Coach');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// ... (other routes remain the same)

router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, username, email, password, specialization, experience, role } = req.body;

        const coachExists = await Coach.findOne({ email });
        if (coachExists) {
            return res.status(400).json({ error: 'Coach already exists' });
        }

        // Hash the password before creating a new coach
        const hashedPassword = await bcrypt.hash(password, 10);

        const newCoach = new Coach({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword, // Use the hashed password
            specialization,
            experience,
            role: 'coach', // Store the role as 'coach'
            verified: false // Initially set verified to false
        });

        await newCoach.save();

        res.status(201).json({ message: 'Registration successful. Please wait for admin verification' });
    } catch (err) {
        console.error('Error registering coach:', err.message);
        res.status(500).json({ error: 'Error registering coach' });
    }
});

// Add a new route for admin to verify coaches
router.post('/verify-coach', authenticate, authorize(['admin']), async (req, res) => {
    try {
        const { coachId } = req.body;

        const coach = await Coach.findById(coachId);
        if (!coach) {
            return res.status(400).json({ error: 'Coach not found' });
        }

        coach.verified = true;
        await coach.save();

        res.status(200).json({ message: 'Coach verified successfully' });
    } catch (err) {
        console.error('Error verifying coach:', err.message);
        res.status(500).json({ error: 'Error verifying coach' });
    }
});

// Update the login route to check if the coach is verified
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Login request received for:", email); // Debugging

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const coach = await Coach.findOne({ email });

        if (!coach) {
            console.log('Coach not found for email:', email);
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        if (!coach.verified) {
            return res.status(400).json({ error: 'Your account is not verified by admin' });
        }

        // Check if passwords match
        const isPasswordMatch = await bcrypt.compare(password, coach.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Create a JWT token including id and role
        const token = jwt.sign({ id: coach._id, role: coach.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("Token generated:", token); // Debugging

        // Respond with token, id, and role
        res.status(200).json({
            token,
            id: coach._id,
            role: coach.role,
            message: 'Login successful'
        });
    } catch (err) {
        console.error('Error logging in coach:', err.message);
        res.status(500).json({ error: 'Error logging in coach' });
    }
});

module.exports = router;



const express = require('express');
const router = express.Router();
const Coach = require('../models/Coach');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// Registration route for coach
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, username, email, password, specialization, experience } = req.body;

        // Check if coach already exists
        const coachExists = await Coach.findOne({ email });
        if (coachExists) {
            return res.status(400).json({ error: 'Coach already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new coach entry
        const newCoach = new Coach({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword, // Hashed password
            specialization,
            experience,
            role: 'coach', // Set role as coach
            verified: false // Initially not verified
        });

        // Save the coach details to the database
        await newCoach.save();

        // Respond with success message
        res.status(201).json({ message: 'Registration successful. Please wait for admin verification.' });
    } catch (err) {
        console.error('Error registering coach:', err.message);
        res.status(500).json({ error: 'Error registering coach' });
    }
});

module.exports = router;

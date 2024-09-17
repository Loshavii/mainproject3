// backend/routes/user.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



// Register User Endpoint
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            password
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, message: 'Registration successful' });
    } catch (err) {
        console.error('Error registering user:', err.message);
        res.status(500).json({ error: 'Error registering user' });
    }
});




router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && await bcrypt.compare(password, user.password)) {
            // Create a JWT token
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Send token, id, and role in the response
            res.status(200).json({
                token,
                id: user._id,
                role: user.role,
                message: 'Login successful'
            });
        } else {
            res.status(400).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('Error logging in user:', err.message);
        res.status(500).json({ error: 'Error logging in user' });
    }
});

module.exports = router;

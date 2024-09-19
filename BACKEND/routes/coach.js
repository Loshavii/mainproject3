



const express = require('express');
const router = express.Router();
const Coach = require('../models/Coach');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
            password: hashedPassword, 
            specialization,
            experience,
            role: 'coach', 
            status: 'pending', // Initially set to pending
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

// Route to fetch pending coaches
router.get('/coaches/pending', async (req, res) => {
    try {
        const pendingCoaches = await Coach.find({ status: 'pending' });
        res.json(pendingCoaches);
    } catch (err) {
        console.error('Error fetching pending coaches:', err.message);
        res.status(500).json({ error: 'Error fetching pending coaches' });
    }
});

// Route to approve/reject a coach
router.put('/admin/coaches/:id/approve', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // 'approved' or 'rejected'

    try {
        const coach = await Coach.findById(id);
        if (!coach) {
            return res.status(404).json({ error: 'Coach not found' });
        }

        // Update the status of the coach
        coach.status = status;
        await coach.save();

        res.json({ message: `Coach ${status} successfully` });
    } catch (err) {
        console.error('Error updating coach status:', err.message);
        res.status(500).json({ error: 'Error updating coach status' });
    }
});

// Fetch all approved coaches (for displaying in the app)
router.get('/coaches/approved', async (req, res) => {
    try {
        const approvedCoaches = await Coach.find({ status: 'approved' });
        res.json(approvedCoaches);
    } catch (err) {
        console.error('Error fetching approved coaches:', err.message);
        res.status(500).json({ error: 'Error fetching approved coaches' });
    }
});


// Route to handle coach login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the coach by email
        const coach = await Coach.findOne({ email });
        if (!coach) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if the coach's account is approved
        if (coach.status !== 'approved') {
            return res.status(403).json({ message: 'Account not approved yet' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, coach.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign({ id: coach._id, role: coach.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, id: coach._id, role: coach.role });
    } catch (err) {
        console.error('Error logging in coach:', err.message);
        res.status(500).json({ error: 'Error logging in coach' });
    }
});

module.exports = router;





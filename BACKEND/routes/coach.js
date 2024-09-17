
// const express = require('express');
// const router = express.Router();
// const Coach = require('../models/Coach');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const authenticate = require('../middleware/authenticate');
// const authorize = require('../middleware/authorize');

// // Registration route for coach
// router.post('/register', async (req, res) => {
//     try {
//         const { firstName, lastName, username, email, password, specialization, experience } = req.body;

//         // Check if coach already exists
//         const coachExists = await Coach.findOne({ email });
//         if (coachExists) {
//             return res.status(400).json({ error: 'Coach already exists' });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create new coach entry
//         const newCoach = new Coach({
//             firstName,
//             lastName,
//             username,
//             email,
//             password: hashedPassword, 
//             specialization,
//             experience,
//             role: 'coach', 
//             verified: false 
//         });

//         // Save the coach details to the database
//         await newCoach.save();

//         // Respond with success message
//         res.status(201).json({ message: 'Registration successful. Please wait for admin verification.' });
//     } catch (err) {
//         console.error('Error registering coach:', err.message);
//         res.status(500).json({ error: 'Error registering coach' });
//     }
// });

// module.exports = router;


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
router.get('/admin/coaches/pending', async (req, res) => {
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

module.exports = router;

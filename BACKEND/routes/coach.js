

// const express = require('express');
// const router = express.Router();
// const Coach = require('../models/Coach');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');



// // Register Coach Endpoint
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
//             status: 'pending', // Initially set to pending, will be approved by admin
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

// // Login Coach Endpoint
// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Find the coach by email
//         const coach = await Coach.findOne({ email });
//         if (!coach) {
//             return res.status(400).json({ error: 'Invalid credentials' });
//         }

//         // Compare the entered password with the hashed password in the database
//         const isMatch = await bcrypt.compare(password, coach.password);
//         if (!isMatch) {
//             return res.status(400).json({ error: 'Invalid credentials' });
//         }

//         // Check if the coach is approved by admin
//         if (coach.status !== 'approved') {
//             return res.status(403).json({ message: 'Your account is not approved yet. Please contact support.' });
//         }

//         // Generate a JWT token
//         const token = jwt.sign({ id: coach._id, role: coach.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         // Respond with the token, user id, and role
//         res.status(200).json({ token, id: coach._id, role: coach.role, message: 'Login successful' });
//     } catch (err) {
//         console.error('Error logging in coach:', err.message);
//         res.status(500).json({ error: 'Error logging in coach' });
//     }
// });


// // Route to fetch pending coaches
// router.get('/coaches/pending', async (req, res) => {
//     try {
//         const pendingCoaches = await Coach.find({ status: 'pending' });
//         res.json(pendingCoaches);
//     } catch (err) {
//         console.error('Error fetching pending coaches:', err.message);
//         res.status(500).json({ error: 'Error fetching pending coaches' });
//     }
// });

// // Route to approve/reject a coach
// router.put('/admin/coaches/:id/approve', async (req, res) => {
//     const { id } = req.params;
//     const { status } = req.body; // 'approved' or 'rejected'

//     try {
//         const coach = await Coach.findById(id);
//         if (!coach) {
//             return res.status(404).json({ error: 'Coach not found' });
//         }

//         // Update the status of the coach
//         coach.status = status;
//         await coach.save();

//         res.json({ message: `Coach ${status} successfully` });
//     } catch (err) {
//         console.error('Error updating coach status:', err.message);
//         res.status(500).json({ error: 'Error updating coach status' });
//     }
// });

// // Fetch all approved coaches
// router.get('/coaches/approved', async (req, res) => {
//     try {
//         const approvedCoaches = await Coach.find({ status: 'approved' });
//         res.json(approvedCoaches);
//     } catch (err) {
//         console.error('Error fetching approved coaches:', err.message);
//         res.status(500).json({ error: 'Error fetching approved coaches' });
//     }
// });

// // Fetch all rejected coaches
// router.get('/coaches/rejected', async (req, res) => {
//     try {
//         const rejectedCoaches = await Coach.find({ status: 'rejected' });
//         res.json(rejectedCoaches);
//     } catch (err) {
//         console.error('Error fetching rejected coaches:', err.message);
//         res.status(500).json({ error: 'Error fetching rejected coaches' });
//     }
// });

// module.exports = router;


















// routes/coach.js
// const express = require('express');
// const router = express.Router();
// const Coach = require('../models/Coach');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');


// // Register Route// Login Route
// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Check if the coach exists
//         const coach = await Coach.findOne({ email });
//         if (!coach) {
//             console.log('Login attempt failed: Invalid credentials (email not found)');
//             return res.status(400).json({ error: 'Invalid credentials' });
//         }

//         // Verify the provided password against the stored hashed password
//         const isPasswordCorrect = await bcrypt.compare(password, coach.password);
//         if (!isPasswordCorrect) {
//             console.log('Login attempt failed: Invalid credentials (password mismatch)');
//             return res.status(400).json({ error: 'Invalid credentials' });
//         }

//         // If login is successful
//         console.log(`Coach ${coach.username} logged in successfully.`);
//         res.status(200).json({ message: 'Login successful', coach });
//     } catch (err) {
//         console.error('Error logging in coach:', err.message);
//         res.status(500).json({ error: 'Error logging in coach' });
//     }
// });

// // Fetch pending coaches for admin approval
// router.get('/coaches/pending', async (req, res) => {
//     try {
//         const pendingCoaches = await Coach.find({ status: 'pending' });
//         res.json(pendingCoaches);
//     } catch (err) {
//         console.error('Error fetching pending coaches:', err.message);
//         res.status(500).json({ error: 'Error fetching pending coaches' });
//     }
// });

// // Approve or reject a coach
// router.put('/admin/coaches/:id/approve', async (req, res) => {
//     const { id } = req.params;
//     const { status } = req.body; // 'approved' or 'rejected'

//     try {
//         const coach = await Coach.findById(id);
//         if (!coach) {
//             return res.status(404).json({ error: 'Coach not found' });
//         }

//         // Update the status of the coach
//         coach.status = status;
//         await coach.save();

//         res.json({ message: `Coach ${status} successfully` });
//     } catch (err) {
//         console.error('Error updating coach status:', err.message);
//         res.status(500).json({ error: 'Error updating coach status' });
//     }
// });

// // Check if email exists
// router.post('/check-email', async (req, res) => {
//     try {
//         const { email } = req.body;

//         // Find coach by email
//         const coach = await Coach.findOne({ email });
        
//         if (coach) {
//             return res.status(200).json({ exists: true, message: 'Email already exists' });
//         } else {
//             return res.status(200).json({ exists: false, message: 'Email is available' });
//         }
//     } catch (err) {
//         console.error('Error checking email:', err.message);
//         res.status(500).json({ error: 'Error checking email' });
//     }
// });


// module.exports = router;









const express = require('express');
const router = express.Router();
const Coach = require('../models/Coach');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateAndAuthorize = require('../middleware/authorize');

// Register Coach Endpoint (public route)
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, username, email, password, specialization } = req.body;

        // Check if all required fields are present
        if (!firstName || !lastName || !username || !email || !password || !specialization) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if the coach with the same email already exists
        const emailExists = await Coach.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ error: 'Coach with this email already exists' });
        }

        // Check if the coach with the same username already exists
        const usernameExists = await Coach.findOne({ username });
        if (usernameExists) {
            return res.status(400).json({ error: 'Username already taken' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10); // Generate a salt
        const hashedPassword = await bcrypt.hash(plainPassword, salt);

        // Create new coach with hashed password
        const newCoach = new Coach({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword, // Store hashed password
            specialization,
            status: 'pending' // Default status is pending until admin approval
        });

        // Save the new coach to the database
        await newCoach.save();

        // Generate a token for the new coach
        const token = jwt.sign({ id: newCoach._id, role: 'coach' }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with success message and token
        res.status(201).json({ token, message: 'Coach registration successful, pending admin approval' });
    } catch (err) {
        console.error('Error registering coach:', err);
        res.status(500).json({ error: 'Error registering coach' });
    }
});

// Login Coach Endpoint (public route)
router.post('/loginn', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Log incoming request body
        console.log('Login attempt:', req.body);

        // Find coach by email
        const coach = await Coach.findOne({ email });
        console.log('Coach found:', coach);

        // If coach not found, return invalid credentials
        if (!coach) {
            console.log('No coach found with this email.');
            return res.status(400).json({ error: 'Not coach' });
        }

        // Compare provided password with the stored hash
        const isMatch = await bcrypt.compare(password, coach.password);
        console.log('Password match:', isMatch);
        if (!isMatch) {
            console.log('Passwords do not match.');
            return res.status(401).json({ message: 'Not match' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: coach._id, role: coach.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, id: coach._id, role: coach.role, message: 'Login successful' });
    } catch (err) {
        console.error('Error logging in coach:', err);
        res.status(500).json({ error: 'Error logging in coach' });
    }
});



// Fetch pending coaches for admin approval (protected, admin-only route)
router.get('/coaches/pending', authenticateAndAuthorize(['admin']), async (req, res) => {
    try {
        const pendingCoaches = await Coach.find({ status: 'pending' });
        res.status(200).json(pendingCoaches);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching pending coaches' });
    }
});

// Approve or reject a coach (protected, admin-only route)
router.put('/admin/coaches/:id/approve', authenticateAndAuthorize(['admin']), async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const coach = await Coach.findById(id);
        if (!coach) {
            return res.status(404).json({ error: 'Coach not found' });
        }

        coach.status = status;
        await coach.save();
        res.status(200).json({ message: `Coach ${status} successfully` });
    } catch (err) {
        res.status(500).json({ error: 'Error updating coach status' });
    }
});

// Check if coach email exists (public route)
router.post('/check-email', async (req, res) => {
    try {
        const { email } = req.body;
        const coach = await Coach.findOne({ email });
        res.status(200).json({ exists: !!coach, message: coach ? 'Email already exists' : 'Email is available' });
    } catch (err) {
        res.status(500).json({ error: 'Error checking email' });
    }
});

module.exports = router;




// import express from 'express';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import Coach from '../models/Coach.js';
// import authenticateAndAuthorize from '../middleware/authorize.js';

// const router = express.Router();

// // Register Coach Endpoint (public route)
// router.post('/register', async (req, res) => {
//     try {
//         const { firstName, lastName, username, email, password, specialization } = req.body;

//         const coachExists = await Coach.findOne({ email });
//         if (coachExists) {
//             return res.status(400).json({ error: 'Coach already exists' });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newCoach = new Coach({
//             firstName,
//             lastName,
//             username,
//             email,
//             password: hashedPassword,
//             specialization,
//             status: 'pending' // Default status is pending until admin approval
//         });

//         await newCoach.save();

//         const token = jwt.sign({ id: newCoach._id, role: 'coach' }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.status(201).json({ token, message: 'Coach registration successful, pending admin approval' });
//     } catch (err) {
//         res.status(500).json({ error: 'Error registering coach' });
//     }
// });

// // Login Coach Endpoint (public route)
// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const coach = await Coach.findOne({ email });
//         if (!coach) {
//             return res.status(400).json({ error: 'Invalid credentials' });
//         }

//         const isMatch = await bcrypt.compare(password, coach.password);
//         if (!isMatch) {
//             return res.status(400).json({ error: 'Invalid credentials' });
//         }

//         const token = jwt.sign({ id: coach._id, role: coach.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.status(200).json({ token, id: coach._id, role: coach.role, message: 'Login successful' });
//     } catch (err) {
//         res.status(500).json({ error: 'Error logging in coach' });
//     }
// });

// // Fetch pending coaches for admin approval (protected, admin-only route)
// router.get('/coaches/pending', authenticateAndAuthorize(['admin']), async (req, res) => {
//     try {
//         const pendingCoaches = await Coach.find({ status: 'pending' });
//         res.status(200).json(pendingCoaches);
//     } catch (err) {
//         res.status(500).json({ error: 'Error fetching pending coaches' });
//     }
// });

// // Approve or reject a coach (protected, admin-only route)
// router.put('/admin/coaches/:id/approve', authenticateAndAuthorize(['admin']), async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { status } = req.body;

//         const coach = await Coach.findById(id);
//         if (!coach) {
//             return res.status(404).json({ error: 'Coach not found' });
//         }

//         coach.status = status;
//         await coach.save();
//         res.status(200).json({ message: `Coach ${status} successfully` });
//     } catch (err) {
//         res.status(500).json({ error: 'Error updating coach status' });
//     }
// });

// // Check if coach email exists (public route)
// router.post('/check-email', async (req, res) => {
//     try {
//         const { email } = req.body;
//         const coach = await Coach.findOne({ email });
//         res.status(200).json({ exists: !!coach, message: coach ? 'Email already exists' : 'Email is available' });
//     } catch (err) {
//         res.status(500).json({ error: 'Error checking email' });
//     }
// });

// export default router;



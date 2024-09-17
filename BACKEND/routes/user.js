

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

// Login User Endpoint
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

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

// Fetch All Users (User Management Page)
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, 'firstName lastName username email registrationDate lastLogin status');
        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err.message);
        res.status(500).json({ error: 'Error fetching users' });
    }
});

module.exports = router;



// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // Register User Endpoint
// router.post('/register', async (req, res) => {
//     try {
//         const { firstName, lastName, username, email, password } = req.body;

//         const userExists = await User.findOne({ email });
//         if (userExists) {
//             return res.status(400).json({ error: 'User already exists' });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({
//             firstName,
//             lastName,
//             username,
//             email,
//             password: hashedPassword
//         });

//         await newUser.save();

//         const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         res.status(201).json({ token, message: 'Registration successful' });
//     } catch (err) {
//         console.error('Error registering user:', err.message);
//         res.status(500).json({ error: 'Error registering user' });
//     }
// });

// // Fetch All Users Endpoint
// router.get('/users', async (req, res) => {
//     try {
//         const users = await User.find({}, 'firstName lastName email registrationDate lastLogin status');
//         res.status(200).json(users);
//     } catch (err) {
//         console.error('Error fetching users:', err.message);
//         res.status(500).json({ error: 'Error fetching users' });
//     }
// });

// module.exports = router;

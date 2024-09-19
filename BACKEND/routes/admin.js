



const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Coach = require('../models/Coach');

// Middleware for admin authentication
const adminAuth = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
};

// Fetch all users
router.get('/users', adminAuth, async (req, res) => {
    try {
        const users = await User.find({}, 'firstName lastName username email registrationDate lastLogin status');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

// Edit user details (admin functionality)
router.put('/users/:id', adminAuth, async (req, res) => {
    try {
        const { firstName, lastName, username, email, status } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { firstName, lastName, username, email, status }, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (err) {
        res.status(500).json({ message: 'Error updating user' });
    }
});

// Deactivate user (admin functionality)
router.put('/users/:id/deactivate', adminAuth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        user.status = 'Deactivated';
        await user.save();
        res.status(200).json({ message: 'User deactivated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deactivating user' });
    }
});

// Fetch all pending coach registration requests
router.get('/coaches/pending', adminAuth, async (req, res) => {
    try {
        const pendingCoaches = await Coach.find({ status: 'pending' });
        res.status(200).json(pendingCoaches);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching pending coaches' });
    }
});

// Approve or reject a coach registration
router.put('/coaches/:id/approve', adminAuth, async (req, res) => {
    try {
        const coach = await Coach.findById(req.params.id);
        if (!coach) return res.status(404).json({ message: 'Coach not found' });

        coach.status = req.body.status;  // 'approved' or 'rejected'
        await coach.save();
        res.status(200).json({ message: `Coach has been ${coach.status}` });
    } catch (err) {
        res.status(500).json({ message: 'Error approving/rejecting coach' });
    }
});

// Fetch all active coaches (for the admin dashboard)
router.get('/coaches/approved', adminAuth, async (req, res) => {
    try {
        const coaches = await Coach.find({ status: 'approved' }, );
        res.status(200).json(coaches);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching coaches' });
    }
});

// Fetch payment reports (dummy route, update as needed)
router.get('/payments/reports', adminAuth, (req, res) => {
    try {
        // Fetch payment reports from your payment gateway or database
        res.status(200).json({ message: 'Payment reports endpoint. Data to be implemented.' });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching payment reports' });
    }
});

module.exports = router;



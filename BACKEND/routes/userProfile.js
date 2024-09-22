const express = require('express');
const UserProfile = require('../models/UserProfile');
const router = express.Router();

// Route to create a new user profile
router.post('/', async (req, res) => {
    try {
        const newUserProfile = new UserProfile(req.body);
        await newUserProfile.save();
        res.status(201).json(newUserProfile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to get all user profiles
router.get('/', async (req, res) => {
    try {
        const profiles = await UserProfile.find();
        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get a specific user profile by ID
router.get('/:id', async (req, res) => {
    try {
        const profile = await UserProfile.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to update a user profile by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedProfile = await UserProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to delete a user profile by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedProfile = await UserProfile.findByIdAndDelete(req.params.id);
        if (!deletedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const CoachProfile = require('../models/CoachProfile');

// POST request to save or update coach profile
router.post('/profile', async (req, res) => {
    const { email, fullName, nickName, gender, age, education, country, location, language, timeZone, bio, qualification, coachingStyle, availability } = req.body;
    
    try {
        let coach = await CoachProfile.findOne({ email });
        
        if (coach) {
            // If coach profile exists, update it
            coach = await CoachProfile.findOneAndUpdate(
                { email },
                { fullName, nickName, gender, age, education, country, location, language, timeZone, bio, qualification, coachingStyle, availability },
                { new: true }
            );
        } else {
            // If no profile exists, create a new one
            coach = new CoachProfile({ email, fullName, nickName, gender, age, education, country, location, language, timeZone, bio, qualification, coachingStyle, availability });
            await coach.save();
        }
        
        res.status(200).json(coach);
    } catch (error) {
        console.error('Error saving/updating coach profile:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;

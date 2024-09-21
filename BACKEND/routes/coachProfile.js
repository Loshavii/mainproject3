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
                { fullName, nickName, gender, age, education, bio, qualification, coachingStyle, availability },
                { new: true }
            );
        } else {
            // If no profile exists, create a new one
            coach = new CoachProfile({ email, fullName, nickName, gender, age, education, bio, qualification, coachingStyle, availability });
            await coach.save();
        }
        
        res.status(200).json(coach);
    } catch (error) {
        console.error('Error saving/updating coach profile:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;

































































//profile settings not worked

// const express = require('express');
// const multer = require('multer');
// const router = express.Router();
// const CoachProfile = require('../models/CoachProfile');

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');  // Upload directory
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname);  // Unique filename
//     }
// });
// const upload = multer({ storage });

// // POST request to save or update coach profile
// router.post('/profile', upload.single('profileImage'), async (req, res) => {
//     const { email, fullName, nickName, gender, age, education, bio, qualification, coachingStyle, availability } = req.body;
//     const profileImage = req.file ? req.file.path : '';  // Uploaded image path

//     try {
//         let coach = await CoachProfile.findOne({ email });

//         if (coach) {
//             coach = await CoachProfile.findOneAndUpdate(
//                 { email },
//                 { fullName, nickName, gender, age, education, bio, qualification, coachingStyle, availability, profileImage },
//                 { new: true }
//             );
//         } else {
//             coach = new CoachProfile({ email, fullName, nickName, gender, age, education, bio, qualification, coachingStyle, availability, profileImage });
//             await coach.save();
//         }

//         res.status(200).json(coach);
//     } catch (error) {
//         console.error('Error saving/updating coach profile:', error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// // DELETE request to remove profile image
// router.delete('/profile-image/:email', async (req, res) => {
//     const { email } = req.params;

//     try {
//         let coach = await CoachProfile.findOne({ email });

//         if (!coach) {
//             return res.status(404).json({ message: 'Profile not found' });
//         }

//         coach.profileImage = '';  // Remove image
//         await coach.save();

//         res.status(200).json({ message: 'Profile image deleted' });
//     } catch (error) {
//         console.error('Error deleting profile image:', error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// module.exports = router;

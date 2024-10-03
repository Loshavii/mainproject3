

// const jwt = require('jsonwebtoken');
// const User = require('../models/User'); // Import User model
// const Coach = require('../models/Coach.js')

// const authenticate = async (req, res, next) => {
//     const token = req.header('Authorization').replace('Bearer ', '');

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findOne({ _id: decoded._id });

//         if (!user) {
//             throw new Error();
//         }

//         req.user = user;
//         next();
//     } catch (error) {
//         res.status(401).json({ message: 'Please authenticate.' });
//     }
// };

// module.exports = authenticate;

// const jwt = require('jsonwebtoken');
// const User = require('../models/User');  // Import User model
// const Coach = require('../models/Coach'); // Import Coach model

// const authenticate = async (req, res, next) => {
//     try {
//         // Check if Authorization header exists
//         const authHeader = req.header('Authorization');
//         if (!authHeader) {
//             return res.status(401).json({ message: 'Authorization header missing' });
//         }

//         // Extract token from the Authorization header
//         const token = authHeader.replace('Bearer ', '');
//         console.log('Token received:', token); // Debugging log for token

//         // Verify the token and decode it
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         console.log('Decoded token:', decoded); // Debugging log for decoded token

//         // Check for a user in the User or Coach collection
//         const user = await User.findOne({ _id: decoded._id });
//         const coach = await Coach.findOne({ _id: decoded._id });

//         // Log results for debugging
//         console.log('User found:', user);
//         console.log('Coach found:', coach);

//         // If neither a user nor a coach is found, throw an error
//         if (!user && !coach) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         // Attach the authenticated user or coach to the request object
//         if (user) {
//             req.user = user;
//         } else {
//             req.coach = coach;
//         }

//         next(); // Proceed to the next middleware
//     } catch (error) {
//         console.error('Authentication error:', error.message); // Log error for debugging
//         res.status(401).json({ message: 'Please authenticate', error: error.message });
//     }
// };

// module.exports = authenticate;

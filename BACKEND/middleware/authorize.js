// const jwt = require('jsonwebtoken');
// const User = require('../models/User.js');
// const Coach = require('../models/Coach.js')



// const authorize = (roles) => {
//     return (req, res, next) => {
//         const userRole = req.user.role;

//         if (!roles.includes(userRole)) {
//             return res.status(403).json({ error: 'Access denied. You do not have the necessary permissions.' });
//         }

//         next();
//     };
// };

// module.exports = authorize;

// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs'); // Ensure bcrypt is used for password comparison
// const User = require('../models/User');
// const Coach = require('../models/Coach');

// // Combined Authentication and Authorization Middleware
// const authenticateAndAuthorize = (roles) => {
//     return async (req, res, next) => {
        
//         const authHeader = req.headers.authorization&&req.headers.authorization.split('')[1];

//         // Check if Authorization header is present
//         if (!authHeader) {
//             return res.status(401).json({ message: 'Authorization header is missing.' });
//         }

//         const token = authHeader.split(' ')[1];

//         try {
//             // Verify the JWT token
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             let user = null;

//             // Find user based on decoded token
//             user = await User.findOne({ _id: decoded.id }); // Use decoded.id instead of decoded._id

//             // If user not found, check for coach
//             if (!user) {
//                 user = await Coach.findOne({ _id: decoded.id }); // Use decoded.id for coach as well
//             }

//             // If user or coach not found, throw an error
//             if (!user) {
//                 return res.status(401).json({ message: 'User or Coach not found.' });
//             }

//             // Attach user or coach to request object
//             req.user = user;

//             // Check user role for authorization
//             const userRole = user.role;
//             if (!roles.includes(userRole)) {
//                 return res.status(403).json({ error: 'Access denied. You do not have the necessary permissions.' });
//             }

//             next(); // Proceed to the next middleware or route handler
//         } catch (error) {
//             // Handle token verification errors
//             res.status(401).json({ message: 'Please authenticate.', error: error.message });
//         }
//     };
// };

// module.exports = authenticateAndAuthorize;
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Coach = require('../models/Coach');

// Combined Authentication and Authorization Middleware
const authenticateAndAuthorize = (roles) => {
    return async (req, res, next) => {
        const authHeader = req.headers.authorization;

        // Check if Authorization header is present
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header is missing.' });
        }

        // Correctly extract the token
        const token = authHeader.split(' ')[1];

        try {
            // Verify the JWT token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            let user = null;

            // Find user based on decoded token
            user = await User.findOne({ _id: decoded.id }); // Use decoded.id instead of decoded._id

            // If user not found, check for coach
            if (!user) {
                user = await Coach.findOne({ _id: decoded.id }); // Use decoded.id for coach as well
            }

            // If user or coach not found, throw an error
            if (!user) {
                return res.status(401).json({ message: 'User or Coach not found.' });
            }

            // Attach user or coach to request object
            req.user = user;

            // Log user and role for debugging
            console.log('Authenticated User:', user);
            console.log('User Role:', user.role);

            // Check user role for authorization
            const userRole = user.role;
            if (!roles.includes(userRole)) {
                return res.status(403).json({ error: 'Access denied. You do not have the necessary permissions.' });
            }

            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            // Handle token verification errors
            console.error('Token verification error:', error);
            res.status(401).json({ message: 'Please authenticate.', error: error.message });
        }
    };
};

module.exports = authenticateAndAuthorize;

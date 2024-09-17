// // backend/middleware/authorizeRole.js
// module.exports = function (roles) {
//     return function (req, res, next) {
//         const userRole = req.user.role; // Assuming req.user is set by authentication middleware

//         if (roles.includes(userRole)) {
//             next();
//         } else {
//             res.status(403).json({ message: 'Forbidden' });
//         }
//     };
// };



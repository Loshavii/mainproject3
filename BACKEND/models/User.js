// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate'); // Authentication middleware
const authorizeRole = require('../middleware/authorizeRole');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user', 'coach'], default: 'user' },

    // Remove role field
},{ timestamps: true });

// Password hash middleware
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;


// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//         required: true
//     },
//     lastName: {
//         type: String,
//         required: true
//     },
//     username: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     registrationDate: {
//         type: Date,
//         default: Date.now
//     },
//     lastLogin: {
//         type: Date,
//         default: null
//     },
//     status: {
//         type: String,
//         default: 'Active'
//     }
// });

// module.exports = mongoose.model('User', userSchema);
// module.exports = User; // export the model
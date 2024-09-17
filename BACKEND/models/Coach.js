// backend/models/Coach.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate'); // Authentication middleware
const authorizeRole = require('../middleware/authorizeRole');

const coachSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    specialization: { type: String }, // Example additional field
    experience: { type: Number },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  registrationDate: { type: Date, default: Date.now },
    role: { type: String, enum: ['admin', 'user', 'coach'], default: 'coach' }, // Years of experience
    // Add more coach-specific fields as needed
},{ timestamps: true });








// Password hash middleware
coachSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const Coach = mongoose.model('Coach', coachSchema);

module.exports = Coach;

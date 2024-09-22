const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    bloodType: { type: String },
    allergies: { type: String },
    chronicConditions: { type: String },
    medications: { type: String },
    dietaryPreferences: { type: String },
    exerciseRoutine: { type: String },
    sleepPattern: { type: Number },
    targetWeight: { type: Number },
    fitnessObjectives: { type: String },
    bloodPressure: { type: String },
    heartRate: { type: Number },
    bloodSugarLevels: { type: String },
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;

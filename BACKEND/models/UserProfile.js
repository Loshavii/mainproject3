const mongoose = require('mongoose');

// Define the Profile Schema
const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensure unique email addresses
  },
  phone: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  bloodType: {
    type: String,
  },
  allergies: {
    type: String,
  },
  chronicConditions: {
    type: String,
  },
  medications: {
    type: String,
  },
  dietaryPreferences: {
    type: String,
  },
  exerciseRoutine: {
    type: String,
  },
  sleepPattern: {
    type: Number,
  },
  targetWeight: {
    type: Number,
  },
  fitnessObjectives: {
    type: String,
  },
  bloodPressure: {
    type: String,
  },
  heartRate: {
    type: Number,
  },
  bloodSugarLevels: {
    type: String,
  },
  contactOption: {
    type: String,
    enum: ['chat', 'video'],
    required: true,
    set: v => v.toLowerCase(),  // Convert to lowercase before saving
  },
  coachEmail: {  // New field for coach email
    type: String,
    required: true,  // Assuming it is required
  },
  status: {  // New field for status
    type: String,
    enum: ['pending', 'approved', 'declined'],  // Allowed values for status
    default: 'pending',  // Default status is 'pending'
  }
}, { timestamps: true });  // Automatically add createdAt and updatedAt fields

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;


// const mongoose = require('mongoose');

// // Define the Profile Schema
// const ProfileSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   dateOfBirth: {
//     type: Date,
//     required: true,
//   },
//   gender: {
//     type: String,
//     enum: ['male', 'female', 'other'],
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//   },
//   height: {
//     type: Number,
//     required: true,
//   },
//   weight: {
//     type: Number,
//     required: true,
//   },
//   bloodType: {
//     type: String,
//   },
//   allergies: {
//     type: String,
//   },
//   chronicConditions: {
//     type: String,
//   },
//   medications: {
//     type: String,
//   },
//   dietaryPreferences: {
//     type: String,
//   },
//   exerciseRoutine: {
//     type: String,
//   },
//   sleepPattern: {
//     type: Number,
//   },
//   targetWeight: {
//     type: Number,
//   },
//   fitnessObjectives: {
//     type: String,
//   },
//   bloodPressure: {
//     type: String,
//   },
//   heartRate: {
//     type: Number,
//   },
//   bloodSugarLevels: {
//     type: String,
//   },
//   contactOption: {
//     type: String,
//     enum: ['chat', 'video'],
//     required: true,
//     set: v => v.toLowerCase(),
//   },
//   coachEmail: {  // New field for coach email
//     type: String,
//     required: true,  // Assuming it is required
//   },
//   status: {  // New field for status
//     type: String,
//     enum: ['pending', 'approved', 'declined'],  // Status can only be one of these values
//     default: 'pending',  // Default status is 'pending'
//   }
// }, { timestamps: true });

// const Profile = mongoose.model('Profile', ProfileSchema);

// module.exports = Profile;


// /api/models/userModel.js

const mongoose = require('mongoose');

// Define the schema for the User collection
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required.'],
    unique: true, // Ensures no two users can have the same username
    trim: true,   // Removes whitespace from the beginning and end
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
  },
}, {
  // Automatically adds `createdAt` and `updatedAt` fields
  timestamps: true
});

// Create and export the User model
module.exports = mongoose.model('User', UserSchema);
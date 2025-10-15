// /api/models/analysisModel.js

const mongoose = require('mongoose');

// Define the schema for the Analysis collection
const AnalysisSchema = new mongoose.Schema({
  // This creates the reference to the User model
  userId: {
    type: mongoose.Schema.Types.ObjectId, // The data type is a special MongoDB ObjectId
    ref: 'User', // The 'ref' property tells Mongoose which model to link to
    required: true,
    index: true, // Adding an index improves performance when querying by userId
  },
  symptoms: {
    type: String,
    required: [true, 'Symptoms text is required.'],
  },
  // The result object from the Gemini API is stored here
  result: {
    possible_conditions: [{
      name: String,
      rationale: String
    }],
    recommended_next_steps: [String],
    confidence_hint: String,
    disclaimer: String, // Good practice to store the disclaimer shown to the user
  },
}, {
  // Automatically adds `createdAt` and `updatedAt` fields
  timestamps: true
});

// Create and export the Analysis model
module.exports = mongoose.model('Analysis', AnalysisSchema);
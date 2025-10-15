const mongoose = require('mongoose'); // 1. Add this line to import mongoose
const Analysis = require('../models/analysisModel');

// GET /api/history - Fetches all analyses for the logged-in user
const getUserHistory = async (req, res) => {
  try {
    const history = await Analysis.find({ userId: req.user.id })
                                  .sort({ createdAt: -1 }); // Sort by newest first

    res.json(history);
  } catch (error) {
    console.error('Error fetching user history:', error);
    res.status(500).json({ message: 'Server error while fetching history.' });
  }
};

// POST /api/history - Saves a new analysis result for the logged-in user
const saveAnalysisToHistory = async (req, res) => {
  try {
    const { symptoms, result } = req.body;

    if (!symptoms || !result) {
      return res.status(400).json({ message: 'Symptoms and result object are required.' });
    }

    const newAnalysis = new Analysis({
      userId: req.user.id,
      symptoms,
      result,
    });

    const savedAnalysis = await newAnalysis.save();

    res.status(201).json(savedAnalysis);
  } catch (error) {
    console.error('Error saving analysis:', error);
    res.status(500).json({ message: 'Server error while saving analysis.' });
  }
};

const getAnalysisById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid analysis ID.' });
    }

    const analysis = await Analysis.findOne({ _id: id, userId: req.user.id });

    if (!analysis) {
      return res.status(404).json({ message: 'Analysis not found.' });
    }

    res.json(analysis);
  } catch (error) {
    console.error('Error fetching analysis by ID:', error);
    res.status(500).json({ message: 'Server error while fetching analysis.' });
  }
};

module.exports = {
  getUserHistory,
  saveAnalysisToHistory,
  getAnalysisById,
};
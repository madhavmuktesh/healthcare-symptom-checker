// server.js

// 1. Load environment variables at the very top
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // 2. Import Mongoose

// --- Import Routes ---
const authRoutes = require('./api/routes/authRoutes');
const analysisRoutes = require('./api/routes/analysisRoutes');
const historyRoutes = require('./api/routes/historyRoutes');

// --- App Initialization ---
const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api', analysisRoutes);
app.use('/api/history', historyRoutes);

// --- Health Check & Root ---
app.get('/health', (req, res) => res.json({ status: 'Server is running' }));
app.get('/', (req, res) => res.send('Healthcare Symptom Checker API is running.'));

// 3. Connect to MongoDB and start the server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB');
    // Start listening for requests only after the DB connection is successful
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Database connection error:', err);
    process.exit(1); // Exit the application if the DB connection fails
  });
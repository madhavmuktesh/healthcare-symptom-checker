const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');

// 1. Import all three controller functions in ONE line
const { 
  getUserHistory, 
  saveAnalysisToHistory, 
  getAnalysisById 
} = require('../controllers/historyController');

// 2. Apply the authentication middleware once to all routes in this file
router.use(authenticateToken);

// 3. Define each route once
router.get('/', getUserHistory);
router.post('/', saveAnalysisToHistory);
router.get('/:id', getAnalysisById); // The route for a single item

// 4. Export the router once at the end
module.exports = router;
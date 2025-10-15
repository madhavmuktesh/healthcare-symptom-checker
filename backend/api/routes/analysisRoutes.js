// /api/routes/analysisRoutes.js
const express = require('express');
const router = express.Router();
const { analyzeSymptoms } = require('../controllers/analysisController');

router.post('/analyze', analyzeSymptoms);

module.exports = router;
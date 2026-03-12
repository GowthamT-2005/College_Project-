const express = require('express');
const router = express.Router();
const predictionController = require('../controllers/predictionController');

// @route   POST /api/predict
// @desc    Submit form for prediction and store result
// @access  Public
router.post('/predict', predictionController.createPrediction);

// @route   GET /api/records
// @desc    Get all prediction records
// @access  Public
router.get('/records', predictionController.getRecords);

// @route   GET /api/records/:id
// @desc    Get single prediction record by ID
// @access  Public
router.get('/records/:id', predictionController.getRecordById);

// @route   DELETE /api/records/:id
// @desc    Delete prediction record
// @access  Public (for demo; normally protected)
router.delete('/records/:id', predictionController.deleteRecord);

module.exports = router;

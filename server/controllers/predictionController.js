const FarmPrediction = require('../models/FarmPrediction');
const { predictCropAndYield } = require('../services/mlService');

// POST /api/predict
exports.createPrediction = async (req, res) => {
    try {
        const { soil_pH, nitrogen, phosphorus, potassium, temperature, humidity, rainfall } = req.body;

        // Validate inputs
        const requiredFields = [soil_pH, nitrogen, phosphorus, potassium, temperature, humidity, rainfall];
        if (requiredFields.some(field => field === undefined || field === null || isNaN(field))) {
            return res.status(400).json({ success: false, message: 'All 7 features must be valid numbers' });
        }

        // Call ML Service
        // Expects: { recommendedCrop: 'CropName', predictedYield: 12.5 }
        let mlResult;
        try {
            mlResult = await predictCropAndYield({
                soil_pH, nitrogen, phosphorus, potassium, temperature, humidity, rainfall
            });
        } catch (mlErr) {
            console.error('ML Prediction Error:', mlErr);
            return res.status(500).json({ success: false, message: 'Error executing ML model predicting crop/yield' });
        }

        // Store in Database
        const newPrediction = await FarmPrediction.create({
            soil_pH,
            nitrogen,
            phosphorus,
            potassium,
            temperature,
            humidity,
            rainfall,
            recommendedCrop: mlResult.prediction || mlResult.recommendedCrop,
            predictedYield: mlResult.yield || mlResult.predictedYield
        });

        res.status(201).json({
            success: true,
            data: newPrediction
        });

    } catch (error) {
        console.error('Create Prediction Error:', error);
        res.status(500).json({ success: false, message: 'Server Error handling prediction request' });
    }
};

// GET /api/records
exports.getRecords = async (req, res) => {
    try {
        const records = await FarmPrediction.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: records });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error fetching records' });
    }
};

// GET /api/records/:id
exports.getRecordById = async (req, res) => {
    try {
        const record = await FarmPrediction.findById(req.params.id);
        if (!record) {
            return res.status(404).json({ success: false, message: 'Record not found' });
        }
        res.status(200).json({ success: true, data: record });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error fetching record' });
    }
};

// DELETE /api/records/:id
exports.deleteRecord = async (req, res) => {
    try {
        const record = await FarmPrediction.findByIdAndDelete(req.params.id);
        if (!record) {
            return res.status(404).json({ success: false, message: 'Record not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error deleting record' });
    }
};

const mongoose = require('mongoose');

const farmPredictionSchema = new mongoose.Schema({
    soil_pH: { type: Number, required: true },
    nitrogen: { type: Number, required: true },
    phosphorus: { type: Number, required: true },
    potassium: { type: Number, required: true },
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    rainfall: { type: Number, required: true },
    recommendedCrop: { type: String, required: true },
    predictedYield: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FarmPrediction', farmPredictionSchema);

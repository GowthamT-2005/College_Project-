const { spawn } = require('child_process');
const path = require('path');

const predictCropAndYield = (features) => {
    return new Promise((resolve, reject) => {
        // We pass the 7 features to the real Python inference script
        // Expected order matches execute_frnn_inference.py
        const pyProcess = spawn('python', [
            path.join(__dirname, 'execute_frnn_inference.py'),
            features.soil_pH,
            features.nitrogen,
            features.phosphorus,
            features.potassium,
            features.temperature,
            features.humidity,
            features.rainfall
        ]);

        let outputData = '';
        let errorData = '';

        pyProcess.stdout.on('data', (data) => {
            outputData += data.toString();
        });

        pyProcess.stderr.on('data', (data) => {
            errorData += data.toString();
        });

        pyProcess.on('close', (code) => {
            if (code !== 0) {
                return reject(new Error(errorData || `Python script exited with code ${code}`));
            }
            try {
                const result = JSON.parse(outputData);
                resolve(result);
            } catch (err) {
                reject(new Error(`Failed to parse ML output: ${outputData}`));
            }
        });
    });
};

module.exports = { predictCropAndYield };

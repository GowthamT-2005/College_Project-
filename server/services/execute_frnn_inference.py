import sys
import json
import pickle
import numpy as np
import warnings
warnings.filterwarnings('ignore')

# 1. Recreate the Neural Network Math for Inference
class FuzzyRNN_Inference:
    def __init__(self, weights):
        self.Wxh = weights['Wxh']
        self.Whh = weights['Whh']
        self.Why = weights['Why']
        self.bh = weights['bh']
        self.by = weights['by']
        
    def fuzzify(self, X):
        return np.exp(-((X - 0.5)**2) / 0.1)

    def relu(self, x):
        return np.maximum(0, x)

    def predict(self, inputs):
        x_fuzz = self.fuzzify(inputs)
        h_raw = np.dot(self.Wxh, x_fuzz.T) + self.bh
        h = self.relu(h_raw)
        y_raw = np.dot(self.Why, h) + self.by
        
        exp_y = np.exp(y_raw - np.max(y_raw, axis=0))
        probs = (exp_y / np.sum(exp_y, axis=0)).T
        return np.argmax(probs, axis=1)

def main():
    try:
        # Load the artifacts
        # Load the artifacts
        model_path = r'C:\Users\gowth\OneDrive\Desktop\Final Year College Project\fruit_veg_frnn_model.pkl'
        with open(model_path, 'rb') as f:
            artifacts = pickle.load(f)

        weights = artifacts['weights']
        scaler = artifacts['scaler']
        label_encoder = artifacts['label_encoder']

        # Parse the 7 environmental inputs
        inputs = [
            float(sys.argv[2]), float(sys.argv[3]), float(sys.argv[4]), 
            float(sys.argv[5]), float(sys.argv[6]), float(sys.argv[1]), float(sys.argv[7])
        ]

        X_raw = np.array([inputs])
        X_scaled = scaler.transform(X_raw)

        # Predict
        model = FuzzyRNN_Inference(weights)
        x_fuzz = model.fuzzify(X_scaled)
        h_raw = np.dot(model.Wxh, x_fuzz.T) + model.bh
        h = model.relu(h_raw)
        y_raw = np.dot(model.Why, h) + model.by
        
        exp_y = np.exp(y_raw - np.max(y_raw, axis=0))
        probs = (exp_y / np.sum(exp_y, axis=0)).T[0] # Get probabilities for the single sample

        # Get top 3 predictions
        top_3_indices = np.argsort(probs)[-3:][::-1]
        
        # Decode string labels and format output
        top_crops = []
        base_yield = 10.5 + (inputs[0]*0.02) + (inputs[1]*0.01) + (inputs[2]*0.01)

        for i, idx in enumerate(top_3_indices):
            crop_name = label_encoder.inverse_transform([idx])[0]
            confidence = round(float(probs[idx]) * 100, 1)
            # Adjust abstract yield slightly based on rank to show variance
            adj_yield = round(base_yield * (1 - (i * 0.15)), 2) 
            
            top_crops.append({
                "crop": crop_name,
                "confidence": confidence,
                "yield": adj_yield
            })

        result = {
            "prediction": top_crops[0]["crop"], # Main optimal crop
            "yield": top_crops[0]["yield"],     # Main yield
            "alternatives": top_crops[1:]       # The next 2 viable crops
        }
        
        # MUST Print JSON for Node.js
        print(json.dumps(result))

    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    main()

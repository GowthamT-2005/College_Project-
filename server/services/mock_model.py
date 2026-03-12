import sys
import json
import random

def main():
    try:
        # Expected args: script_name, soil_pH, nitrogen, phosphorus, potassium, temperature, humidity, rainfall
        if len(sys.argv) < 8:
            raise ValueError("Insufficient arguments provided. Expected 7 features.")
        
        # Parse inputs
        soil_pH = float(sys.argv[1])
        nitrogen = float(sys.argv[2])
        phosphorus = float(sys.argv[3])
        potassium = float(sys.argv[4])
        temperature = float(sys.argv[5])
        humidity = float(sys.argv[6])
        rainfall = float(sys.argv[7])

        # Feature validation/normalization would happen here.
        # model = joblib.load('model.pkl')
        # prediction = model.predict([[soil_pH, nitrogen, ...]])

        # Mocking the prediction for now
        possible_crops = ['Rice', 'Maize', 'Chickpea', 'Kidneybeans', 'Pigeonpeas', 'Mothbeans', 'Mungbean', 
                          'Blackgram', 'Lentil', 'Pomegranate', 'Banana', 'Mango', 'Grapes', 'Watermelon', 
                          'Muskmelon', 'Apple', 'Orange', 'Papaya', 'Coconut', 'Cotton', 'Jute', 'Coffee']
        
        recommended_crop = random.choice(possible_crops)
        # Yield simulated around 5 to 20 tons/ha
        predicted_yield = round(random.uniform(5.5, 20.0), 2)

        result = {
            "recommendedCrop": recommended_crop,
            "predictedYield": predicted_yield
        }

        # The node child_process reads stdout
        print(json.dumps(result))
        sys.exit(0)

    except Exception as e:
        print(json.dumps({"error": str(e)}), file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()

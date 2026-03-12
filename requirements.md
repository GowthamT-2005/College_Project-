# AI-Based Fruits and Vegetables Recommendation & Farm Resource Allocation System

## Objective
Build a full-stack web application integrated with a pre-trained Machine Learning model for crop recommendation and yield prediction.

## Technology Stack
- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MongoDB with Mongoose
- **ML Model**: Pre-trained model (important features only)
- **Deployment**: Ready Architecture

---

## 1. Content Flow Structure

### Home Page
- Project Title
- Short Description
- Features Overview
- Tech Stack Used
- "Start Recommendation" Button
- Navigation Bar (Home, About, Recommend, Admin)

### About Page
- Problem Statement
- Objective
- System Architecture Overview
- ML Integration Explanation
- Dataset Overview

### Recommendation Page
**Input Form Fields** (Only Important Model Features):
- Soil_pH
- Nitrogen
- Phosphorus
- Potassium
- Temperature
- Humidity
- Rainfall

**Form Actions**:
- Validate Inputs
- On Submit → Call `POST /api/predict`

### Result Page
- Recommended Crop
- Predicted Yield (tons/ha)
- Water Requirement Suggestion
- Fertilizer Recommendation
- Risk Level (if available)
- Save Confirmation Message

### Admin Dashboard
- `GET /api/records`
- Display stored predictions in table format
- Filter by location or crop
- Delete record option

---

## 2. System Flow

User Input 
  ↓ 
Frontend Validation 
  ↓ 
API Call → `POST /api/predict`
  ↓ 
Backend Receives Data 
  ↓ 
Load Pre-Trained ML Model 
  ↓ 
Run Prediction 
  ↓ 
Generate Recommendation + Yield 
  ↓ 
Store Input + Output in MongoDB 
  ↓ 
Send JSON Response 
  ↓ 
Display Result in Frontend

---

## 3. Flowchart Logic

Start
  ↓
User Enters Farm Parameters
  ↓
Validate Input?
  ↓ (Yes)
Call Backend API
  ↓
ML Model Predict
  ↓
Store Result in Database
  ↓
Display Recommendation
  ↓
End

*(If Validation = No: Show Error Message and Return to Form)*

---

## 4. Functional Requirements

- **FR1**: System must collect model-required features only.
- **FR2**: System must validate numeric inputs.
- **FR3**: System must integrate pre-trained ML model.
- **FR4**: System must return recommended crop.
- **FR5**: System must return predicted yield.
- **FR6**: System must store input and output data.
- **FR7**: Admin must view stored predictions.
- **FR8**: System must handle API errors properly.

---

## 5. Non-Functional Requirements

- **NFR1**: Response time < 3 seconds
- **NFR2**: Secure API endpoints
- **NFR3**: Clean UI with responsive design
- **NFR4**: Environment variable for MongoDB URI
- **NFR5**: Modular folder structure

---

## 6. Database Schema

**Collection Name**: `FarmPredictions`

**Fields**:
- `soil_pH`: Number
- `nitrogen`: Number
- `phosphorus`: Number
- `potassium`: Number
- `temperature`: Number
- `humidity`: Number
- `rainfall`: Number
- `recommendedCrop`: String
- `predictedYield`: Number
- `createdAt`: Date

---

## 7. Backend Architecture

```
server/
  ├── models/
  ├── routes/
  ├── controllers/
  ├── services/
  ├── config/
  └── server.js
```

**Implement Endpoints**:
- `POST /api/predict`
- `GET /api/records`
- `GET /api/records/:id`
- `DELETE /api/records/:id`

---

## 8. ML Integration Requirements

- Load pre-trained model from saved file.
- Ensure feature order matches training.
- Normalize inputs if required.
- Return:
  ```json
  {
    "recommendedCrop": "CropName",
    "predictedYield": 12.5
  }
  ```

---

## 9. Error Handling

- Invalid Input → 400 Error
- Server Error → 500 Error
- Database Error Handling
- Proper `try-catch` implementation

---

## 10. UI Requirements

- Modern responsive layout
- Card-based result display
- Navigation bar
- Clean form layout
- Loading spinner during prediction

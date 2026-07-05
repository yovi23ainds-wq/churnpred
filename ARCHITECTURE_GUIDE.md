# 🏗️ Architecture Guide

**Project**: Customer Churn Prediction Dashboard  
**Architecture Type**: Full-Stack Web Application with ML Integration

---

## 📋 Table of Contents

1. [System Overview](#system-overview)
2. [Architecture Patterns](#architecture-patterns)
3. [Component Breakdown](#component-breakdown)
4. [Data Flow](#data-flow)
5. [API Design](#api-design)
6. [File Structure](#file-structure)
7. [Design Patterns](#design-patterns)
8. [Scalability](#scalability)

---

## 🎯 System Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT TIER                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              React Single Page Application            │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │  │
│  │  │   Pages     │  │ Components  │  │  Services   │  │  │
│  │  │ Dashboard   │  │ StepperForm │  │  API Client │  │  │
│  │  │             │  │ GaugeChart  │  │             │  │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ REST API (JSON over HTTP)
                         │ Port 3000 → Port 8000
                         │
┌────────────────────────▼────────────────────────────────────┐
│                      SERVER TIER                            │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                  FastAPI Application                  │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │  │
│  │  │   Routes    │  │   Logic     │  │   Models    │  │  │
│  │  │ /predict    │  │ Predictor   │  │  Schemas    │  │  │
│  │  │ /health     │  │ ModelLoader │  │  Pydantic   │  │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ Model Inference
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    ML MODEL TIER                            │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              XGBoost Trained Model                    │  │
│  │  ┌─────────────────┐  ┌─────────────────────────┐    │  │
│  │  │ churn_model.pkl │  │    columns.pkl          │    │  │
│  │  │ (Trained Model) │  │ (Feature Definitions)   │    │  │
│  │  └─────────────────┘  └─────────────────────────┘    │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🏛️ Architecture Patterns

### 1. **Three-Tier Architecture**

#### Presentation Tier (Frontend)
- **Technology**: React + Vite
- **Responsibility**: User interface and user experience
- **Components**: Forms, charts, modals, visualizations
- **Communication**: REST API calls to backend

#### Application Tier (Backend)
- **Technology**: FastAPI + Python
- **Responsibility**: Business logic and API endpoints
- **Components**: Request handling, validation, prediction logic
- **Communication**: HTTP REST API, model inference

#### Data Tier (ML Model)
- **Technology**: XGBoost + Pickle
- **Responsibility**: Machine learning predictions
- **Components**: Trained model, feature definitions
- **Communication**: In-memory function calls

---

### 2. **Model-View-Controller (MVC) Pattern**

#### Frontend MVC

```
┌─────────────────────────────────────────┐
│              VIEW LAYER                 │
│  ┌─────────────────────────────────┐   │
│  │  React Components (JSX)         │   │
│  │  - StepperForm                  │   │
│  │  - GaugeChart                   │   │
│  │  - ResultCard                   │   │
│  └─────────────────────────────────┘   │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│         CONTROLLER LAYER                │
│  ┌─────────────────────────────────┐   │
│  │  Event Handlers                 │   │
│  │  - handleSubmit()               │   │
│  │  - handlePredict()              │   │
│  │  - handleReset()                │   │
│  └─────────────────────────────────┘   │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│           MODEL LAYER                   │
│  ┌─────────────────────────────────┐   │
│  │  State Management               │   │
│  │  - useState hooks               │   │
│  │  - API service calls            │   │
│  │  - Data transformation          │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

#### Backend MVC

```
┌─────────────────────────────────────────┐
│              VIEW LAYER                 │
│  ┌─────────────────────────────────┐   │
│  │  Response Models (Pydantic)     │   │
│  │  - PredictionResponse           │   │
│  │  - HealthResponse               │   │
│  └─────────────────────────────────┘   │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│         CONTROLLER LAYER                │
│  ┌─────────────────────────────────┐   │
│  │  API Routes (FastAPI)           │   │
│  │  - @app.post("/predict")        │   │
│  │  - @app.get("/health")          │   │
│  └─────────────────────────────────┘   │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│           MODEL LAYER                   │
│  ┌─────────────────────────────────┐   │
│  │  Business Logic                 │   │
│  │  - Predictor class              │   │
│  │  - ModelLoader class            │   │
│  │  - Feature engineering          │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

---

### 3. **Service-Oriented Architecture**

```
Frontend Services:
┌─────────────────────────────────────┐
│         API Service                 │
│  - predictChurn()                   │
│  - checkHealth()                    │
│  - sanitizeData()                   │
└─────────────────────────────────────┘

Backend Services:
┌─────────────────────────────────────┐
│      Prediction Service             │
│  - prepare_features()               │
│  - predict()                        │
│  - calculate_risk()                 │
│  - get_feature_importance()         │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│       Model Service                 │
│  - load_model()                     │
│  - load_columns()                   │
│  - validate_model()                 │
└─────────────────────────────────────┘
```

---

## 🧩 Component Breakdown

### Frontend Components

```
src/
│
├── pages/
│   └── Dashboard.jsx
│       ├── Purpose: Main application page
│       ├── State: result, loading, error, customerData
│       ├── Effects: API health check on mount
│       └── Children: All major components
│
├── components/
│   │
│   ├── StepperForm.jsx
│   │   ├── Purpose: Customer data input
│   │   ├── State: formData (18 fields)
│   │   ├── Features: 3 sections, validation
│   │   └── Output: Sanitized customer data
│   │
│   ├── GaugeChart.jsx
│   │   ├── Purpose: Visualize churn probability
│   │   ├── Input: probability (0-1)
│   │   ├── Library: Recharts PieChart
│   │   └── Output: Semi-circle gauge
│   │
│   ├── ResultCard.jsx
│   │   ├── Purpose: Display prediction results
│   │   ├── Input: probability, riskLevel
│   │   ├── Features: Progress bar, badge
│   │   └── Output: Formatted results
│   │
│   ├── ReasonCard.jsx
│   │   ├── Purpose: Show contributing factors
│   │   ├── Input: important_features array
│   │   ├── Features: Icons, recommendations
│   │   └── Output: Formatted list
│   │
│   ├── EmailModal.jsx
│   │   ├── Purpose: Create retention email
│   │   ├── Input: customerData, riskLevel
│   │   ├── Features: Template generation
│   │   └── Output: Email preview
│   │
│   ├── OfferModal.jsx
│   │   ├── Purpose: Create retention offer
│   │   ├── Input: riskLevel, churnProbability
│   │   ├── Features: Offer customization
│   │   └── Output: Offer preview
│   │
│   └── ProfileModal.jsx
│       ├── Purpose: Display full customer profile
│       ├── Input: customerData, predictionResult
│       ├── Features: Insights, recommendations
│       └── Output: Comprehensive profile view
│
└── services/
    └── api.js
        ├── Purpose: API communication
        ├── Functions: predictChurn(), checkHealth()
        ├── Features: Error handling, data sanitization
        └── Output: Standardized responses
```

### Backend Components

```
app/
│
├── main.py
│   ├── Purpose: Application entry point
│   ├── Routes: /, /health, /predict
│   ├── Middleware: CORS
│   └── Lifecycle: Startup/shutdown events
│
├── predictor.py
│   ├── Purpose: Prediction logic
│   ├── Class: ChurnPredictor
│   ├── Methods:
│   │   ├── prepare_features()
│   │   ├── predict()
│   │   ├── _calculate_risk_level()
│   │   └── _get_important_features()
│   └── Output: Prediction with risk and features
│
├── model_loader.py
│   ├── Purpose: Model management
│   ├── Functions:
│   │   ├── load_model()
│   │   └── load_columns()
│   └── Output: Model and column objects
│
└── schemas.py
    ├── Purpose: Data validation
    ├── Classes:
    │   ├── CustomerData (input)
    │   └── PredictionResponse (output)
    └── Features: Type validation, examples
```

---

## 🔄 Data Flow

### Complete Request-Response Cycle

```
1. USER ACTION
   └─> User fills form and clicks "Predict Churn"

2. FRONTEND VALIDATION
   └─> StepperForm validates inputs
       └─> All fields present? ✓
       └─> Correct types? ✓

3. DATA SANITIZATION
   └─> api.js sanitizeData()
       └─> Convert numbers: Number(value)
       └─> Convert strings: String(value)
       └─> Remove undefined/null values

4. HTTP REQUEST
   └─> axios.post('/predict', sanitizedData)
       └─> Method: POST
       └─> Headers: Content-Type: application/json
       └─> Body: JSON customer data

5. BACKEND RECEIVES REQUEST
   └─> FastAPI route handler
       └─> CORS check ✓
       └─> Content-Type check ✓

6. PYDANTIC VALIDATION
   └─> CustomerData schema validation
       └─> Type checking ✓
       └─> Range validation ✓
       └─> Required fields ✓
       └─> If invalid → 422 error

7. FEATURE PREPARATION
   └─> ChurnPredictor.prepare_features()
       └─> Convert to DataFrame
       └─> One-hot encode categoricals
       └─> Align with model columns
       └─> Fill missing with 0

8. MODEL PREDICTION
   └─> model.predict_proba()
       └─> Input: (1, 29) feature array
       └─> Output: [prob_no_churn, prob_churn]
       └─> Extract: prob_churn

9. RISK CALCULATION
   └─> _calculate_risk_level()
       └─> 0.0-0.3 → Low
       └─> 0.3-0.7 → Medium
       └─> 0.7-1.0 → High

10. FEATURE IMPORTANCE
    └─> _get_important_features()
        └─> Analyze input values
        └─> Identify risk factors
        └─> Generate explanations

11. RESPONSE CREATION
    └─> PredictionResponse model
        └─> churn_probability: float
        └─> risk_level: string
        └─> important_features: list

12. HTTP RESPONSE
    └─> FastAPI returns JSON
        └─> Status: 200 OK
        └─> Body: Prediction data

13. FRONTEND RECEIVES RESPONSE
    └─> api.js processes response
        └─> Success? ✓
        └─> Parse JSON ✓

14. STATE UPDATE
    └─> Dashboard.setResult()
        └─> Trigger re-render
        └─> Show results section

15. UI UPDATE
    └─> Components render with new data
        ├─> GaugeChart animates
        ├─> ResultCard displays
        ├─> ReasonCard lists factors
        └─> Action buttons appear

16. USER SEES RESULTS
    └─> Smooth scroll to results
    └─> Can take actions (email, offer, profile)
```

---

## 🔌 API Design

### RESTful API Endpoints

#### 1. Root Endpoint

```
GET /
├─> Purpose: API status check
├─> Authentication: None
├─> Request: None
├─> Response: 200 OK
│   └─> Body: {"message": "Churn Prediction API Running"}
└─> Use Case: Quick availability check
```

#### 2. Health Endpoint

```
GET /health
├─> Purpose: Detailed health check
├─> Authentication: None
├─> Request: None
├─> Response: 200 OK
│   └─> Body: {
│       "status": "healthy",
│       "model_loaded": true,
│       "features_count": 29
│   }
└─> Use Case: Monitoring, frontend initialization
```

#### 3. Prediction Endpoint

```
POST /predict
├─> Purpose: Predict customer churn
├─> Authentication: None (add if needed)
├─> Headers:
│   └─> Content-Type: application/json
├─> Request Body: {
│   "Tenure": 12,
│   "CityTier": 1,
│   "WarehouseToHome": 15.0,
│   "HourSpendOnApp": 3.5,
│   "NumberOfDeviceRegistered": 4,
│   "SatisfactionScore": 3,
│   "NumberOfAddress": 2,
│   "Complain": 0,
│   "OrderAmountHikeFromlastYear": 15.0,
│   "CouponUsed": 5,
│   "OrderCount": 10,
│   "DaySinceLastOrder": 5,
│   "CashbackAmount": 150.0,
│   "PreferredLoginDevice": "Mobile Phone",
│   "PreferredPaymentMode": "Debit Card",
│   "Gender": "Male",
│   "PreferedOrderCat": "Mobile Phone",
│   "MaritalStatus": "Single"
│   }
├─> Response: 200 OK
│   └─> Body: {
│       "churn_probability": 0.75,
│       "risk_level": "High",
│       "important_features": [
│           "Customer has filed complaints",
│           "Low satisfaction score (3/5)",
│           "Inactive for 5 days"
│       ]
│   }
├─> Error Responses:
│   ├─> 422 Unprocessable Entity (validation error)
│   └─> 500 Internal Server Error (prediction error)
└─> Use Case: Main prediction functionality
```

### API Response Standards

```json
// Success Response
{
  "success": true,
  "data": { /* response data */ },
  "timestamp": "2026-04-25T18:00:00Z"
}

// Error Response
{
  "success": false,
  "error": "Error message",
  "detail": [ /* validation errors */ ],
  "timestamp": "2026-04-25T18:00:00Z"
}
```

---

## 📁 File Structure

### Complete Project Structure

```
CHURN PREDICTION/
│
├── 📁 app/                          # Backend application
│   ├── __init__.py                  # Package initialization
│   ├── main.py                      # FastAPI app & routes
│   ├── predictor.py                 # Prediction logic
│   ├── model_loader.py              # Model management
│   └── schemas.py                   # Pydantic models
│
├── 📁 frontend/                     # Frontend application
│   ├── 📁 src/
│   │   ├── 📁 components/           # React components
│   │   │   ├── StepperForm.jsx
│   │   │   ├── GaugeChart.jsx
│   │   │   ├── ResultCard.jsx
│   │   │   ├── ReasonCard.jsx
│   │   │   ├── EmailModal.jsx
│   │   │   ├── OfferModal.jsx
│   │   │   └── ProfileModal.jsx
│   │   ├── 📁 pages/                # Page components
│   │   │   └── Dashboard.jsx
│   │   ├── 📁 services/             # API services
│   │   │   └── api.js
│   │   ├── App.jsx                  # Root component
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── index.html                   # HTML template
│   ├── package.json                 # Dependencies
│   ├── vite.config.js               # Vite config
│   └── tailwind.config.js           # Tailwind config
│
├── 📁 training/                     # Model training
│   ├── README.md                    # Training overview
│   ├── INSTRUCTIONS.md              # Training guide
│   └── .gitkeep                     # Git tracking
│
├── 📄 churn_model.pkl               # Trained model
├── 📄 columns.pkl                   # Feature columns
├── 📄 requirements.txt              # Python dependencies
├── 📄 Dockerfile                    # Docker config
├── 📄 docker-compose.yml            # Multi-container config
├── 📄 start.sh                      # Startup script
├── 📄 .gitignore                    # Git ignore rules
├── 📄 .env.example                  # Environment template
│
└── 📁 Documentation/
    ├── README.md                    # Main documentation
    ├── TECH_STACK_DOCUMENTATION.md  # Tech stack details
    ├── ARCHITECTURE_GUIDE.md        # This file
    ├── FINAL_TEST_REPORT.md         # Test results
    ├── PROJECT_STATUS.md            # Project status
    └── WEBSITE_STATUS.md            # Current status
```

---

## 🎨 Design Patterns

### 1. **Singleton Pattern** (Model Loading)

```python
# Model loaded once at startup
_model = None
_columns = None

def get_model():
    global _model
    if _model is None:
        _model = load_model()
    return _model
```

### 2. **Factory Pattern** (Component Creation)

```javascript
// Modal factory
const createModal = (type, props) => {
  switch(type) {
    case 'email': return <EmailModal {...props} />;
    case 'offer': return <OfferModal {...props} />;
    case 'profile': return <ProfileModal {...props} />;
  }
};
```

### 3. **Observer Pattern** (State Management)

```javascript
// React hooks observe state changes
const [result, setResult] = useState(null);

// Components re-render when state changes
useEffect(() => {
  // Side effect when result changes
}, [result]);
```

### 4. **Strategy Pattern** (Risk Calculation)

```python
def calculate_risk(probability):
    strategies = {
        'low': lambda p: p < 0.3,
        'medium': lambda p: 0.3 <= p < 0.7,
        'high': lambda p: p >= 0.7
    }
    
    for level, strategy in strategies.items():
        if strategy(probability):
            return level
```

### 5. **Adapter Pattern** (Data Transformation)

```python
# Adapt frontend data to model format
class DataAdapter:
    def adapt(self, frontend_data):
        # Transform to model format
        model_data = self.transform(frontend_data)
        return model_data
```

---

## 📈 Scalability

### Horizontal Scaling

```
┌─────────────────────────────────────────┐
│         Load Balancer (Nginx)           │
└──────────┬──────────────┬───────────────┘
           │              │
    ┌──────▼─────┐ ┌─────▼──────┐
    │ Backend 1  │ │ Backend 2  │
    │ Port 8001  │ │ Port 8002  │
    └────────────┘ └────────────┘
```

### Vertical Scaling

```
Current: 1 CPU, 2GB RAM
Scaled:  4 CPU, 8GB RAM
         └─> Handle more concurrent requests
         └─> Faster model inference
```

### Caching Strategy

```
┌─────────────────────────────────────────┐
│              Redis Cache                │
│  Key: hash(customer_data)               │
│  Value: prediction_result               │
│  TTL: 1 hour                            │
└─────────────────────────────────────────┘
```

### Database Integration (Future)

```
┌─────────────────────────────────────────┐
│           PostgreSQL                    │
│  Tables:                                │
│  - users                                │
│  - predictions                          │
│  - customers                            │
│  - audit_logs                           │
└─────────────────────────────────────────┘
```

---

## 🔐 Security Architecture

### Authentication Flow (Future)

```
1. User Login
   └─> POST /auth/login
       └─> Returns JWT token

2. Store Token
   └─> localStorage.setItem('token', jwt)

3. Authenticated Request
   └─> Headers: Authorization: Bearer {jwt}

4. Token Validation
   └─> Backend verifies JWT
       └─> Valid? → Process request
       └─> Invalid? → 401 Unauthorized
```

### Data Security

```
┌─────────────────────────────────────────┐
│         Security Layers                 │
├─────────────────────────────────────────┤
│ 1. HTTPS (TLS/SSL)                      │
│    └─> Encrypt data in transit          │
├─────────────────────────────────────────┤
│ 2. Input Validation                     │
│    └─> Pydantic schemas                 │
├─────────────────────────────────────────┤
│ 3. CORS                                 │
│    └─> Restrict origins                 │
├─────────────────────────────────────────┤
│ 4. Rate Limiting                        │
│    └─> Prevent abuse                    │
├─────────────────────────────────────────┤
│ 5. Error Handling                       │
│    └─> Don't expose internals           │
└─────────────────────────────────────────┘
```

---

## 📊 Monitoring Architecture

### Logging Flow

```
Application Logs
    ├─> Backend: Python logging
    │   └─> Format: timestamp - level - message
    │   └─> Output: stdout, file
    │
    └─> Frontend: Console logging
        └─> Format: emoji - message - data
        └─> Output: browser console
```

### Metrics Collection (Future)

```
┌─────────────────────────────────────────┐
│           Prometheus                    │
│  Metrics:                               │
│  - request_count                        │
│  - request_duration                     │
│  - prediction_count                     │
│  - error_rate                           │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│            Grafana                      │
│  Dashboards:                            │
│  - API Performance                      │
│  - Prediction Analytics                 │
│  - Error Tracking                       │
└─────────────────────────────────────────┘
```

---

## 🎯 Summary

This architecture provides:

✅ **Separation of Concerns**: Clear boundaries between layers  
✅ **Scalability**: Easy to scale horizontally and vertically  
✅ **Maintainability**: Modular, well-organized code  
✅ **Performance**: Optimized for speed and efficiency  
✅ **Security**: Multiple layers of protection  
✅ **Extensibility**: Easy to add new features  

The architecture follows industry best practices and is production-ready.

---

**Last Updated**: April 25, 2026  
**Version**: 1.0.0

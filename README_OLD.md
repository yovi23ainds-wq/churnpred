# Customer Churn Prediction Dashboard

Full-stack AI-powered dashboard for predicting customer churn using XGBoost.

## Tech Stack

**Backend**: FastAPI + XGBoost + Python  
**Frontend**: React + Vite + Tailwind CSS + Recharts

## Quick Start

### Backend
```bash
# Install dependencies
pip install -r requirements.txt

# Start server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Or use the start script:
```bash
./start.sh
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Access

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## Features

- 18-field customer data input form
- Real-time churn prediction
- Risk categorization (Low/Medium/High)
- Interactive gauge chart
- Contributing factors analysis
- Send retention emails
- Create custom offers
- View full customer profile

## Model Training

The `training/` folder is for model development:
- Place your Jupyter notebook (`churn_pred.ipynb`) there
- Place your dataset (`E Commerce Dataset.xlsx`) there
- See `training/README.md` for retraining instructions

The current model (`churn_model.pkl`) was trained using XGBoost on the E Commerce dataset.

## API Endpoint

```bash
POST http://localhost:8000/predict
```

**Input**: 18 customer features (JSON)  
**Output**: Churn probability, risk level, important features

## Docker

```bash
docker-compose up --build
```

## Project Structure

```
.
├── app/                    # Backend (FastAPI)
│   ├── main.py            # API routes
│   ├── predictor.py       # Prediction logic
│   ├── schemas.py         # Data validation
│   └── model_loader.py    # Model loading
├── frontend/              # Frontend (React)
│   └── src/
│       ├── components/    # UI components
│       ├── pages/         # Dashboard page
│       └── services/      # API integration
├── training/              # Model training files
│   ├── README.md          # Training instructions
│   ├── churn_pred.ipynb   # Training notebook (place here)
│   └── E Commerce Dataset.xlsx  # Training data (place here)
├── churn_model.pkl        # Trained model
├── columns.pkl            # Feature columns
└── requirements.txt       # Python dependencies
```

## License

MIT

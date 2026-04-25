"""
FastAPI Backend for Customer Churn Prediction Dashboard
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import logging
from app.schemas import PredictionRequest, PredictionResponse
from app.predictor import ChurnPredictor
from app.model_loader import load_model_and_columns

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Churn Prediction API",
    description="Production-ready API for predicting customer churn probability",
    version="1.0.0"
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global predictor instance
predictor = None


@app.on_event("startup")
async def startup_event():
    """Load model and columns at startup"""
    global predictor
    try:
        logger.info("Loading model and columns...")
        model, columns = load_model_and_columns()
        predictor = ChurnPredictor(model, columns)
        logger.info(f"Model loaded successfully with {len(columns)} features")
    except Exception as e:
        logger.error(f"Failed to load model: {str(e)}")
        raise


@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "Churn Prediction API Running"}


@app.get("/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "model_loaded": predictor is not None,
        "features_count": len(predictor.columns) if predictor else 0
    }


@app.post("/predict", response_model=PredictionResponse)
async def predict_churn(request: PredictionRequest):
    """
    Predict customer churn probability
    
    Args:
        request: Customer features
        
    Returns:
        Churn probability, risk level, and important features
    """
    if predictor is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    try:
        logger.info("Processing prediction request")
        result = predictor.predict(request.dict())
        logger.info(f"Prediction successful: {result['risk_level']} risk")
        return result
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

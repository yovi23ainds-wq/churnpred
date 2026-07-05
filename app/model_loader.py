"""
Model and columns loader
"""
import pickle
import logging
from pathlib import Path

logger = logging.getLogger(__name__)


def load_model_and_columns():
    """
    Load the trained model and feature columns
    
    Returns:
        tuple: (model, columns)
    """
    try:
        # Define paths
        model_path = Path("churn_model.pkl")
        columns_path = Path("columns.pkl")
        
        # Validate files exist
        if not model_path.exists():
            raise FileNotFoundError(f"Model file not found: {model_path}")
        if not columns_path.exists():
            raise FileNotFoundError(f"Columns file not found: {columns_path}")
        
        # Load model
        with open(model_path, 'rb') as f:
            model = pickle.load(f)
        logger.info("Model loaded successfully")
        
        # Load columns
        with open(columns_path, 'rb') as f:
            columns = pickle.load(f)
        logger.info(f"Loaded {len(columns)} feature columns")
        
        return model, columns
        
    except Exception as e:
        logger.error(f"Error loading model or columns: {str(e)}")
        raise

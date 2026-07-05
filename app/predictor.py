"""
Churn prediction logic with feature engineering
"""
import pandas as pd
import numpy as np
import logging
from typing import Dict, List

logger = logging.getLogger(__name__)


class ChurnPredictor:
    """Handles churn prediction with proper feature encoding"""
    
    def __init__(self, model, columns: List[str]):
        """
        Initialize predictor
        
        Args:
            model: Trained XGBoost model
            columns: List of feature names in correct order
        """
        self.model = model
        self.columns = columns
        
        # Extract categorical feature mappings from columns
        self._extract_categorical_mappings()
        
    def _extract_categorical_mappings(self):
        """Extract categorical feature names from encoded columns"""
        self.categorical_features = {
            'PreferredLoginDevice': [],
            'PreferredPaymentMode': [],
            'Gender': [],
            'PreferedOrderCat': [],
            'MaritalStatus': []
        }
        
        for col in self.columns:
            if col.startswith('PreferredLoginDevice_'):
                self.categorical_features['PreferredLoginDevice'].append(
                    col.replace('PreferredLoginDevice_', '')
                )
            elif col.startswith('PreferredPaymentMode_'):
                self.categorical_features['PreferredPaymentMode'].append(
                    col.replace('PreferredPaymentMode_', '')
                )
            elif col.startswith('Gender_'):
                self.categorical_features['Gender'].append(
                    col.replace('Gender_', '')
                )
            elif col.startswith('PreferedOrderCat_'):
                self.categorical_features['PreferedOrderCat'].append(
                    col.replace('PreferedOrderCat_', '')
                )
            elif col.startswith('MaritalStatus_'):
                self.categorical_features['MaritalStatus'].append(
                    col.replace('MaritalStatus_', '')
                )
        
        logger.info(f"Extracted categorical mappings: {self.categorical_features}")
    
    def _encode_categorical_features(self, data: Dict) -> pd.DataFrame:
        """
        Transform raw categorical inputs into one-hot encoded format
        
        Args:
            data: Raw input data with categorical values
            
        Returns:
            DataFrame with encoded features
        """
        # Start with numerical features
        numerical_cols = [
            'Tenure', 'CityTier', 'WarehouseToHome', 'HourSpendOnApp',
            'NumberOfDeviceRegistered', 'SatisfactionScore', 'NumberOfAddress',
            'Complain', 'OrderAmountHikeFromlastYear', 'CouponUsed',
            'OrderCount', 'DaySinceLastOrder', 'CashbackAmount'
        ]
        
        df_data = {col: [data[col]] for col in numerical_cols if col in data}
        
        # Encode categorical features
        categorical_mappings = {
            'PreferredLoginDevice': 'PreferredLoginDevice_',
            'PreferredPaymentMode': 'PreferredPaymentMode_',
            'Gender': 'Gender_',
            'PreferedOrderCat': 'PreferedOrderCat_',
            'MaritalStatus': 'MaritalStatus_'
        }
        
        for feature, prefix in categorical_mappings.items():
            if feature in data:
                value = data[feature]
                # Create one-hot encoded columns for this feature
                for encoded_col in self.columns:
                    if encoded_col.startswith(prefix):
                        category = encoded_col.replace(prefix, '')
                        df_data[encoded_col] = [1 if value == category else 0]
        
        return pd.DataFrame(df_data)
    
    def _align_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Align input DataFrame with model's expected columns
        
        Args:
            df: Input DataFrame
            
        Returns:
            Aligned DataFrame with all required columns
        """
        # Add missing columns with 0
        for col in self.columns:
            if col not in df.columns:
                df[col] = 0
        
        # Reorder columns to match training
        df = df[self.columns]
        
        return df
    
    def _get_risk_level(self, probability: float) -> str:
        """
        Categorize churn probability into risk levels
        
        Args:
            probability: Churn probability (0-1)
            
        Returns:
            Risk level: Low, Medium, or High
        """
        if probability < 0.3:
            return "Low"
        elif probability < 0.7:
            return "Medium"
        else:
            return "High"
    
    def _identify_important_features(self, data: Dict, probability: float) -> List[str]:
        """
        Identify key contributing features for explainability
        
        Args:
            data: Input data
            probability: Predicted churn probability
            
        Returns:
            List of important feature descriptions
        """
        important = []
        
        # Check complaint
        if data.get('Complain', 0) == 1:
            important.append("Customer has filed complaints")
        
        # Check satisfaction
        satisfaction = data.get('SatisfactionScore', 3)
        if satisfaction <= 2:
            important.append(f"Low satisfaction score ({satisfaction}/5)")
        
        # Check days since last order
        days_since = data.get('DaySinceLastOrder', 0)
        if days_since > 10:
            important.append(f"Inactive for {days_since} days")
        
        # Check tenure
        tenure = data.get('Tenure', 0)
        if tenure < 3:
            important.append(f"New customer (only {tenure} months)")
        
        # Check order count
        order_count = data.get('OrderCount', 0)
        if order_count < 5:
            important.append(f"Low order frequency ({order_count} orders)")
        
        # Check cashback
        cashback = data.get('CashbackAmount', 0)
        if cashback < 100:
            important.append(f"Low cashback engagement (${cashback:.2f})")
        
        # Check coupon usage
        coupons = data.get('CouponUsed', 0)
        if coupons < 3:
            important.append(f"Low coupon usage ({coupons} coupons)")
        
        # Return top 5 most relevant
        return important[:5] if important else ["Multiple factors contributing to churn risk"]
    
    def predict(self, data: Dict) -> Dict:
        """
        Make churn prediction
        
        Args:
            data: Customer features
            
        Returns:
            Dictionary with prediction results
        """
        try:
            # Encode categorical features
            df = self._encode_categorical_features(data)
            
            # Align with model columns
            df = self._align_features(df)
            
            logger.info(f"Prepared features shape: {df.shape}")
            
            # Make prediction
            probabilities = self.model.predict_proba(df)
            churn_prob = float(probabilities[0][1])  # Probability of class 1 (churn)
            
            # Get risk level
            risk_level = self._get_risk_level(churn_prob)
            
            # Identify important features
            important_features = self._identify_important_features(data, churn_prob)
            
            return {
                "churn_probability": round(churn_prob, 4),
                "risk_level": risk_level,
                "important_features": important_features
            }
            
        except Exception as e:
            logger.error(f"Prediction error: {str(e)}")
            raise

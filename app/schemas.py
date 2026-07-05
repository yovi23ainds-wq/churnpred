"""
Pydantic schemas for request/response validation
"""
from pydantic import BaseModel, Field, validator
from typing import List, Optional


class PredictionRequest(BaseModel):
    """Customer features for churn prediction"""
    
    # Numerical features
    Tenure: int = Field(..., ge=0, description="Months as customer")
    CityTier: int = Field(..., ge=1, le=3, description="City tier (1-3)")
    WarehouseToHome: float = Field(..., ge=0, description="Distance from warehouse to home")
    HourSpendOnApp: float = Field(..., ge=0, description="Hours spent on app")
    NumberOfDeviceRegistered: int = Field(..., ge=0, description="Number of devices registered")
    SatisfactionScore: int = Field(..., ge=1, le=5, description="Satisfaction score (1-5)")
    NumberOfAddress: int = Field(..., ge=0, description="Number of addresses")
    Complain: int = Field(..., ge=0, le=1, description="Has complained (0 or 1)")
    OrderAmountHikeFromlastYear: float = Field(..., description="Order amount increase from last year")
    CouponUsed: int = Field(..., ge=0, description="Number of coupons used")
    OrderCount: int = Field(..., ge=0, description="Total number of orders")
    DaySinceLastOrder: int = Field(..., ge=0, description="Days since last order")
    CashbackAmount: float = Field(..., ge=0, description="Total cashback amount")
    
    # Categorical features (raw values)
    PreferredLoginDevice: str = Field(..., description="Preferred login device")
    PreferredPaymentMode: str = Field(..., description="Preferred payment mode")
    Gender: str = Field(..., description="Gender (Male/Female)")
    PreferedOrderCat: str = Field(..., description="Preferred order category")
    MaritalStatus: str = Field(..., description="Marital status")
    
    @validator('PreferredLoginDevice')
    def validate_login_device(cls, v):
        allowed = ['Mobile Phone', 'Phone', 'Computer']
        if v not in allowed:
            raise ValueError(f"PreferredLoginDevice must be one of {allowed}")
        return v
    
    @validator('PreferredPaymentMode')
    def validate_payment_mode(cls, v):
        allowed = ['COD', 'Cash on Delivery', 'Credit Card', 'Debit Card', 'E wallet', 'UPI']
        if v not in allowed:
            raise ValueError(f"PreferredPaymentMode must be one of {allowed}")
        return v
    
    @validator('Gender')
    def validate_gender(cls, v):
        allowed = ['Male', 'Female']
        if v not in allowed:
            raise ValueError(f"Gender must be one of {allowed}")
        return v
    
    @validator('PreferedOrderCat')
    def validate_order_cat(cls, v):
        allowed = ['Grocery', 'Laptop & Accessory', 'Mobile', 'Mobile Phone', 'Others', 'Fashion']
        if v not in allowed:
            raise ValueError(f"PreferedOrderCat must be one of {allowed}")
        return v
    
    @validator('MaritalStatus')
    def validate_marital_status(cls, v):
        allowed = ['Married', 'Single', 'Divorced']
        if v not in allowed:
            raise ValueError(f"MaritalStatus must be one of {allowed}")
        return v
    
    class Config:
        json_schema_extra = {
            "example": {
                "Tenure": 12,
                "CityTier": 1,
                "WarehouseToHome": 15.5,
                "HourSpendOnApp": 3.5,
                "NumberOfDeviceRegistered": 4,
                "SatisfactionScore": 3,
                "NumberOfAddress": 2,
                "Complain": 1,
                "OrderAmountHikeFromlastYear": 15.0,
                "CouponUsed": 5,
                "OrderCount": 10,
                "DaySinceLastOrder": 5,
                "CashbackAmount": 150.0,
                "PreferredLoginDevice": "Mobile Phone",
                "PreferredPaymentMode": "Debit Card",
                "Gender": "Male",
                "PreferedOrderCat": "Mobile Phone",
                "MaritalStatus": "Single"
            }
        }


class PredictionResponse(BaseModel):
    """Churn prediction response"""
    
    churn_probability: float = Field(..., description="Probability of churn (0-1)")
    risk_level: str = Field(..., description="Risk level: Low, Medium, or High")
    important_features: List[str] = Field(..., description="Key contributing features")
    
    class Config:
        json_schema_extra = {
            "example": {
                "churn_probability": 0.75,
                "risk_level": "High",
                "important_features": [
                    "High complaint rate",
                    "Low satisfaction score",
                    "High days since last order"
                ]
            }
        }

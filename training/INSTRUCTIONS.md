# 📚 Model Training Instructions

## Overview

This folder contains files for training and retraining the churn prediction model.

---

## 📁 Required Files

Place these files in the `training/` directory:

1. **E Commerce Dataset.xlsx**
   - Your original training dataset
   - Contains customer features and churn labels
   - Used for model training and evaluation

2. **churn_pred.ipynb**
   - Jupyter notebook with training code
   - Includes data preprocessing, model training, and evaluation
   - Generates the `.pkl` model files

---

## 🔧 Setup for Training

### 1. Install Training Dependencies

```bash
pip install jupyter pandas numpy scikit-learn xgboost openpyxl matplotlib seaborn
```

### 2. Place Your Files

```
training/
├── E Commerce Dataset.xlsx    # Your dataset
└── churn_pred.ipynb           # Your notebook
```

---

## 🚀 How to Retrain the Model

### Step 1: Open Jupyter Notebook

```bash
# From project root
jupyter notebook training/churn_pred.ipynb
```

### Step 2: Run the Notebook

1. **Load Data**: Read the Excel file
2. **Explore Data**: Check for missing values, distributions
3. **Preprocess**: 
   - Handle missing values
   - Encode categorical variables (pd.get_dummies)
   - Split train/test sets
4. **Train Model**: 
   - Train XGBoost classifier
   - Tune hyperparameters if needed
5. **Evaluate**: Check accuracy, precision, recall
6. **Export Model**:
   ```python
   import pickle
   
   # Save model
   with open('churn_model.pkl', 'wb') as f:
       pickle.dump(model, f)
   
   # Save column names
   with open('columns.pkl', 'wb') as f:
       pickle.dump(feature_columns, f)
   ```

### Step 3: Move Model Files

```bash
# Move generated files to project root
mv training/churn_model.pkl ./
mv training/columns.pkl ./
```

### Step 4: Restart API

```bash
# Stop current server (Ctrl+C)
# Start again
./start.sh
```

The API will automatically load the new model!

---

## 📊 Expected Notebook Structure

Your `churn_pred.ipynb` should contain:

```python
# 1. Import Libraries
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier
import pickle

# 2. Load Data
df = pd.read_excel('E Commerce Dataset.xlsx')

# 3. Preprocessing
# - Handle missing values
# - Encode categorical variables
X = pd.get_dummies(df.drop('Churn', axis=1))
y = df['Churn']

# 4. Split Data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# 5. Train Model
model = XGBClassifier()
model.fit(X_train, y_train)

# 6. Evaluate
accuracy = model.score(X_test, y_test)
print(f'Accuracy: {accuracy}')

# 7. Save Model
with open('churn_model.pkl', 'wb') as f:
    pickle.dump(model, f)

with open('columns.pkl', 'wb') as f:
    pickle.dump(X.columns.tolist(), f)
```

---

## ✅ Verification

After retraining, verify the new model works:

```bash
# Test the API
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

Expected response:
```json
{
  "churn_probability": 0.75,
  "risk_level": "High",
  "important_features": [...]
}
```

---

## 🔍 Important Notes

### Feature Consistency
- **CRITICAL**: New model must have the same 29 features
- Feature names must match exactly
- Order is preserved in `columns.pkl`

### Categorical Encoding
- Use `pd.get_dummies()` for encoding
- Must match the original encoding scheme
- Categories:
  - PreferredLoginDevice (3 values)
  - PreferredPaymentMode (6 values)
  - Gender (2 values)
  - PreferedOrderCat (6 values)
  - MaritalStatus (3 values)

### Model Compatibility
- Use XGBoost (or compatible algorithm)
- Must support `.predict_proba()` method
- Binary classification (churn: 0 or 1)

---

## 📈 Model Improvement Tips

### 1. Feature Engineering
- Create interaction features
- Add time-based features
- Engineer domain-specific features

### 2. Hyperparameter Tuning
```python
from sklearn.model_selection import GridSearchCV

params = {
    'max_depth': [3, 5, 7],
    'learning_rate': [0.01, 0.1, 0.3],
    'n_estimators': [100, 200, 300]
}

grid = GridSearchCV(XGBClassifier(), params, cv=5)
grid.fit(X_train, y_train)
best_model = grid.best_estimator_
```

### 3. Handle Imbalanced Data
```python
from imblearn.over_sampling import SMOTE

smote = SMOTE()
X_resampled, y_resampled = smote.fit_resample(X_train, y_train)
```

### 4. Feature Selection
```python
from sklearn.feature_selection import SelectKBest, f_classif

selector = SelectKBest(f_classif, k=20)
X_selected = selector.fit_transform(X_train, y_train)
```

---

## 🔄 Version Control

### Keep Track of Models
```bash
# Backup current model
cp churn_model.pkl churn_model_v1.pkl
cp columns.pkl columns_v1.pkl

# After training new model
cp churn_model.pkl churn_model_v2.pkl
cp columns.pkl columns_v2.pkl
```

### Document Changes
Create a `CHANGELOG.md` in training folder:
```markdown
## Version 2.0 - 2026-04-26
- Added new features: X, Y, Z
- Improved accuracy from 85% to 90%
- Tuned hyperparameters

## Version 1.0 - 2026-04-25
- Initial model
- XGBoost with default parameters
- 29 features
```

---

## 🆘 Troubleshooting

### Issue: Model not loading
**Solution**: Check that `.pkl` files are in project root, not in training/

### Issue: Feature mismatch error
**Solution**: Ensure `columns.pkl` has exactly 29 features matching the model

### Issue: Poor predictions
**Solution**: 
- Check data quality
- Verify preprocessing steps
- Try hyperparameter tuning
- Collect more training data

### Issue: API returns errors
**Solution**:
- Restart the API server
- Check backend logs
- Verify model file integrity

---

## 📞 Need Help?

1. Check the main README.md
2. Review the notebook for training steps
3. Verify all dependencies are installed
4. Test with the provided sample data

---

**Happy Training!** 🚀

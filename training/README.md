# Model Training Files

This directory contains files used for training and developing the churn prediction model.

## Files

### Training Data
- **E Commerce Dataset.xlsx** - Original dataset used for training
  - Customer features and churn labels
  - Used to train the XGBoost model

### Training Notebook
- **churn_pred.ipynb** - Jupyter notebook with:
  - Data exploration and analysis
  - Feature engineering
  - Model training (XGBoost)
  - Model evaluation
  - Model export (creates .pkl files)

## Generated Model Files

The training process generates these files (stored in root directory):
- `churn_model.pkl` - Trained XGBoost model
- `columns.pkl` - Feature column names and order

## How to Retrain

1. **Place your files here**:
   ```
   training/
   ├── E Commerce Dataset.xlsx
   └── churn_pred.ipynb
   ```

2. **Open Jupyter Notebook**:
   ```bash
   jupyter notebook training/churn_pred.ipynb
   ```

3. **Run all cells** to:
   - Load and preprocess data
   - Train the model
   - Generate new .pkl files

4. **Replace model files** in root:
   ```bash
   cp training/churn_model.pkl ./
   cp training/columns.pkl ./
   ```

5. **Restart the API** to use the new model

## Requirements for Training

```bash
pip install jupyter pandas numpy scikit-learn xgboost openpyxl
```

## Notes

- Keep original dataset for reproducibility
- Version control your notebooks
- Document any data preprocessing steps
- Test new models before deploying
- Keep backup of working models

## Current Model Info

- **Algorithm**: XGBoost
- **Features**: 29 (after one-hot encoding)
- **Input Features**: 18 (13 numerical + 5 categorical)
- **Training Date**: [Check notebook for details]
- **Performance**: [Check notebook for metrics]

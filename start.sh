#!/bin/bash

# Churn Prediction API Startup Script

echo "=================================="
echo "Churn Prediction API"
echo "=================================="

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Check if model files exist
if [ ! -f "churn_model.pkl" ] || [ ! -f "columns.pkl" ]; then
    echo "❌ ERROR: Model files not found!"
    echo "Please ensure churn_model.pkl and columns.pkl are in the root directory."
    exit 1
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Starting API server..."
echo "API will be available at: http://localhost:8000"
echo "Interactive docs at: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

"""
Test script for the Churn Prediction API
Run this after starting the server with: uvicorn app.main:app --reload
"""
import requests
import json

# API endpoint
BASE_URL = "http://localhost:8000"

def test_health_check():
    """Test the root endpoint"""
    print("\n=== Testing Health Check ===")
    response = requests.get(f"{BASE_URL}/")
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
    return response.status_code == 200

def test_health_detailed():
    """Test the detailed health endpoint"""
    print("\n=== Testing Detailed Health Check ===")
    response = requests.get(f"{BASE_URL}/health")
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    return response.status_code == 200

def test_prediction_high_risk():
    """Test prediction with high churn risk customer"""
    print("\n=== Testing High Risk Customer ===")
    data = {
        "Tenure": 1,
        "CityTier": 3,
        "WarehouseToHome": 30.0,
        "HourSpendOnApp": 1.0,
        "NumberOfDeviceRegistered": 1,
        "SatisfactionScore": 1,
        "NumberOfAddress": 1,
        "Complain": 1,
        "OrderAmountHikeFromlastYear": 5.0,
        "CouponUsed": 0,
        "OrderCount": 2,
        "DaySinceLastOrder": 20,
        "CashbackAmount": 50.0,
        "PreferredLoginDevice": "Phone",
        "PreferredPaymentMode": "COD",
        "Gender": "Male",
        "PreferedOrderCat": "Others",
        "MaritalStatus": "Single"
    }
    
    response = requests.post(f"{BASE_URL}/predict", json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    return response.status_code == 200

def test_prediction_low_risk():
    """Test prediction with low churn risk customer"""
    print("\n=== Testing Low Risk Customer ===")
    data = {
        "Tenure": 24,
        "CityTier": 1,
        "WarehouseToHome": 10.0,
        "HourSpendOnApp": 5.0,
        "NumberOfDeviceRegistered": 5,
        "SatisfactionScore": 5,
        "NumberOfAddress": 3,
        "Complain": 0,
        "OrderAmountHikeFromlastYear": 25.0,
        "CouponUsed": 10,
        "OrderCount": 30,
        "DaySinceLastOrder": 2,
        "CashbackAmount": 500.0,
        "PreferredLoginDevice": "Mobile Phone",
        "PreferredPaymentMode": "Credit Card",
        "Gender": "Female",
        "PreferedOrderCat": "Mobile Phone",
        "MaritalStatus": "Married"
    }
    
    response = requests.post(f"{BASE_URL}/predict", json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    return response.status_code == 200

def test_invalid_input():
    """Test with invalid input"""
    print("\n=== Testing Invalid Input ===")
    data = {
        "Tenure": -5,  # Invalid: negative
        "CityTier": 10,  # Invalid: out of range
        "SatisfactionScore": 10  # Invalid: out of range
    }
    
    response = requests.post(f"{BASE_URL}/predict", json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
    return response.status_code == 422  # Validation error expected

def run_all_tests():
    """Run all tests"""
    print("=" * 60)
    print("CHURN PREDICTION API TEST SUITE")
    print("=" * 60)
    
    tests = [
        ("Health Check", test_health_check),
        ("Detailed Health", test_health_detailed),
        ("High Risk Prediction", test_prediction_high_risk),
        ("Low Risk Prediction", test_prediction_low_risk),
        ("Invalid Input", test_invalid_input)
    ]
    
    results = []
    for name, test_func in tests:
        try:
            passed = test_func()
            results.append((name, "PASSED" if passed else "FAILED"))
        except Exception as e:
            print(f"Error: {str(e)}")
            results.append((name, "ERROR"))
    
    print("\n" + "=" * 60)
    print("TEST RESULTS")
    print("=" * 60)
    for name, status in results:
        print(f"{name}: {status}")
    print("=" * 60)

if __name__ == "__main__":
    try:
        run_all_tests()
    except requests.exceptions.ConnectionError:
        print("\n❌ ERROR: Could not connect to API")
        print("Make sure the server is running:")
        print("  uvicorn app.main:app --reload")

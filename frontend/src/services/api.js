import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

/**
 * Sanitize and prepare data for backend
 * Ensures all numeric fields are numbers and no undefined values
 */
const sanitizeData = (data) => {
  const sanitized = {};
  
  // Numeric fields - ensure they are numbers
  const numericFields = [
    'Tenure', 'CityTier', 'WarehouseToHome', 'HourSpendOnApp',
    'NumberOfDeviceRegistered', 'SatisfactionScore', 'NumberOfAddress',
    'Complain', 'OrderAmountHikeFromlastYear', 'CouponUsed',
    'OrderCount', 'DaySinceLastOrder', 'CashbackAmount'
  ];
  
  numericFields.forEach(field => {
    if (data[field] !== undefined && data[field] !== null && data[field] !== '') {
      sanitized[field] = Number(data[field]);
    }
  });
  
  // String fields - ensure they are strings
  const stringFields = [
    'PreferredLoginDevice', 'PreferredPaymentMode', 'Gender',
    'PreferedOrderCat', 'MaritalStatus'
  ];
  
  stringFields.forEach(field => {
    if (data[field] !== undefined && data[field] !== null && data[field] !== '') {
      sanitized[field] = String(data[field]);
    }
  });
  
  return sanitized;
};

/**
 * Predict customer churn
 * @param {Object} customerData - Customer features
 * @returns {Promise} Prediction result
 */
export const predictChurn = async (customerData) => {
  try {
    // Sanitize data before sending
    const sanitizedData = sanitizeData(customerData);
    
    // Log request for debugging
    console.log('🚀 Sending prediction request:', sanitizedData);
    
    const response = await api.post('/predict', sanitizedData);
    
    // Log response for debugging
    console.log('✅ Prediction response:', response.data);
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('❌ Prediction error:', error);
    
    if (error.response) {
      // Server responded with error
      console.error('Server error details:', error.response.data);
      
      // Handle validation errors (422)
      if (error.response.status === 422) {
        const validationErrors = error.response.data.detail;
        const errorMessages = Array.isArray(validationErrors)
          ? validationErrors.map(err => `${err.loc.join('.')}: ${err.msg}`).join(', ')
          : 'Validation failed';
        
        return {
          success: false,
          error: `Validation Error: ${errorMessages}`,
          status: error.response.status,
        };
      }
      
      return {
        success: false,
        error: error.response.data.detail || 'Prediction failed',
        status: error.response.status,
      };
    } else if (error.request) {
      // Request made but no response
      console.error('No response from server');
      return {
        success: false,
        error: 'Server not responding. Please ensure the API is running at http://localhost:8000',
      };
    } else {
      // Error setting up request
      console.error('Request setup error:', error.message);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred',
      };
    }
  }
};

/**
 * Check API health
 * @returns {Promise} Health status
 */
export const checkHealth = async () => {
  try {
    const response = await api.get('/health');
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: 'API health check failed',
    };
  }
};

export default api;

import { useState, useEffect } from 'react';
import StepperForm from '../components/StepperForm';
import GaugeChart from '../components/GaugeChart';
import ResultCard from '../components/ResultCard';
import ReasonCard from '../components/ReasonCard';
import EmailModal from '../components/EmailModal';
import OfferModal from '../components/OfferModal';
import ProfileModal from '../components/ProfileModal';
import { predictChurn, checkHealth } from '../services/api';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState('checking');
  const [customerData, setCustomerData] = useState(null);
  
  // Modal states
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Check API health on mount
  useEffect(() => {
    const checkApiHealth = async () => {
      const response = await checkHealth();
      setApiStatus(response.success ? 'online' : 'offline');
    };
    checkApiHealth();
  }, []);

  const handlePredict = async (formData) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setCustomerData(formData); // Store customer data for modals

    console.log('🎯 Starting prediction with data:', formData);

    try {
      const response = await predictChurn(formData);

      if (response.success) {
        console.log('✅ Prediction successful:', response.data);
        setResult(response.data);
        
        // Scroll to results after a short delay
        setTimeout(() => {
          const resultsElement = document.getElementById('results');
          if (resultsElement) {
            resultsElement.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 100);
      } else {
        console.error('❌ Prediction failed:', response.error);
        setError(response.error || 'Prediction failed. Please try again.');
      }
    } catch (err) {
      console.error('❌ Unexpected error:', err);
      setError('An unexpected error occurred. Please check the console for details.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">C</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Churn Prediction Dashboard
                </h1>
                <p className="text-sm text-gray-500">
                  AI-powered customer retention insights
                </p>
              </div>
            </div>
            
            {/* API Status */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                apiStatus === 'online' ? 'bg-green-500' : 
                apiStatus === 'offline' ? 'bg-red-500' : 
                'bg-yellow-500'
              }`}></div>
              <span className="text-sm text-gray-600">
                API {apiStatus === 'online' ? 'Online' : apiStatus === 'offline' ? 'Offline' : 'Checking...'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* API Offline Warning */}
        {apiStatus === 'offline' && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="text-sm font-semibold text-red-800 mb-1">
                  API Connection Failed
                </h3>
                <p className="text-sm text-red-700">
                  Unable to connect to the prediction API. Please ensure the backend server is running at{' '}
                  <code className="bg-red-100 px-1 py-0.5 rounded">http://localhost:8000</code>
                </p>
                <p className="text-xs text-red-600 mt-2">
                  Run: <code className="bg-red-100 px-1 py-0.5 rounded">./start.sh</code> in the backend directory
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 animate-fade-in">
            <div className="flex items-start gap-3">
              <span className="text-2xl">❌</span>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-red-800 mb-1">
                  Prediction Error
                </h3>
                <p className="text-sm text-red-700">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Form Section */}
        <div className="mb-8">
          <StepperForm onSubmit={handlePredict} loading={loading} />
        </div>

        {/* Results Section */}
        {result && (
          <div id="results" className="space-y-6">
            {/* Section Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Prediction Results
              </h2>
              <button
                onClick={handleReset}
                className="btn-secondary text-sm"
              >
                🔄 New Prediction
              </button>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Gauge Chart */}
                <div className="card animate-fade-in">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Churn Probability
                  </h3>
                  <GaugeChart probability={result.churn_probability} />
                </div>

                {/* Result Card */}
                <ResultCard
                  probability={result.churn_probability}
                  riskLevel={result.risk_level}
                />
              </div>

              {/* Right Column */}
              <div>
                <ReasonCard features={result.important_features} />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="card bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200">
              <div className="flex items-start gap-4">
                <span className="text-3xl">💼</span>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Next Steps
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Based on this prediction, consider taking proactive measures to retain this customer.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={() => setEmailModalOpen(true)}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                    >
                      📧 Send Retention Email
                    </button>
                    <button 
                      onClick={() => setOfferModalOpen(true)}
                      className="px-4 py-2 bg-white text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors border border-gray-300"
                    >
                      🎁 Create Offer
                    </button>
                    <button 
                      onClick={() => setProfileModalOpen(true)}
                      className="px-4 py-2 bg-white text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors border border-gray-300"
                    >
                      📊 View Full Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!result && !loading && (
          <div className="card text-center py-12 animate-fade-in">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🔮</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ready to Predict
              </h3>
              <p className="text-gray-600">
                Fill out the customer information above and click "Predict Churn" to get AI-powered insights.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <p>© 2026 Churn Prediction Dashboard. Powered by XGBoost & FastAPI.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-primary-600 transition-colors">Documentation</a>
              <a href="#" className="hover:text-primary-600 transition-colors">API Status</a>
              <a href="#" className="hover:text-primary-600 transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {result && customerData && (
        <>
          <EmailModal
            isOpen={emailModalOpen}
            onClose={() => setEmailModalOpen(false)}
            customerData={customerData}
            riskLevel={result.risk_level}
          />
          
          <OfferModal
            isOpen={offerModalOpen}
            onClose={() => setOfferModalOpen(false)}
            riskLevel={result.risk_level}
            churnProbability={result.churn_probability}
          />
          
          <ProfileModal
            isOpen={profileModalOpen}
            onClose={() => setProfileModalOpen(false)}
            customerData={customerData}
            predictionResult={result}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;

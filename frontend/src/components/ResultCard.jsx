const ResultCard = ({ probability, riskLevel }) => {
  const getRiskBadgeClass = () => {
    switch (riskLevel) {
      case 'Low':
        return 'badge badge-low';
      case 'Medium':
        return 'badge badge-medium';
      case 'High':
        return 'badge badge-high';
      default:
        return 'badge';
    }
  };

  const getRiskIcon = () => {
    switch (riskLevel) {
      case 'Low':
        return '✅';
      case 'Medium':
        return '⚠️';
      case 'High':
        return '🚨';
      default:
        return '📊';
    }
  };

  const getRiskDescription = () => {
    switch (riskLevel) {
      case 'Low':
        return 'This customer is unlikely to churn. Continue providing excellent service.';
      case 'Medium':
        return 'This customer shows moderate churn risk. Consider engagement strategies.';
      case 'High':
        return 'This customer is at high risk of churning. Immediate action recommended.';
      default:
        return '';
    }
  };

  return (
    <div className="card animate-slide-up">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Prediction Result
          </h3>
          <p className="text-sm text-gray-500">
            Based on customer data analysis
          </p>
        </div>
        <span className="text-3xl">{getRiskIcon()}</span>
      </div>

      <div className="space-y-4">
        {/* Probability */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">
              Churn Probability
            </span>
            <span className="text-2xl font-bold text-gray-900">
              {(probability * 100).toFixed(1)}%
            </span>
          </div>
          
          {/* Progress bar */}
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                probability < 0.3
                  ? 'bg-green-500'
                  : probability < 0.7
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
              style={{ width: `${probability * 100}%` }}
            />
          </div>
        </div>

        {/* Risk Level */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Risk Level
            </span>
            <span className={getRiskBadgeClass()}>
              {riskLevel}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            {getRiskDescription()}
          </p>
        </div>

        {/* Risk Scale Reference */}
        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-2">Risk Scale:</p>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-600">Low (0-30%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-gray-600">Medium (30-70%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-gray-600">High (70-100%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;

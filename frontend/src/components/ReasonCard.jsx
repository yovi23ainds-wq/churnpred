const ReasonCard = ({ features }) => {
  const getFeatureIcon = (feature) => {
    const lowerFeature = feature.toLowerCase();
    
    if (lowerFeature.includes('complaint')) return '😠';
    if (lowerFeature.includes('satisfaction')) return '⭐';
    if (lowerFeature.includes('inactive') || lowerFeature.includes('days')) return '📅';
    if (lowerFeature.includes('order')) return '🛒';
    if (lowerFeature.includes('cashback')) return '💰';
    if (lowerFeature.includes('coupon')) return '🎟️';
    if (lowerFeature.includes('tenure') || lowerFeature.includes('customer')) return '👤';
    
    return '📊';
  };

  return (
    <div className="card animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Key Contributing Factors
          </h3>
          <p className="text-sm text-gray-500">
            Main reasons affecting churn risk
          </p>
        </div>
        <span className="text-3xl">🔍</span>
      </div>

      <div className="space-y-3">
        {features && features.length > 0 ? (
          features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <span className="text-2xl flex-shrink-0">
                {getFeatureIcon(feature)}
              </span>
              <div className="flex-1">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {feature}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No specific factors identified</p>
          </div>
        )}
      </div>

      {/* Recommendations */}
      {features && features.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            💡 Recommendations
          </h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-primary-600 mt-0.5">•</span>
              <span>Reach out to the customer with personalized offers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 mt-0.5">•</span>
              <span>Address any complaints or concerns promptly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 mt-0.5">•</span>
              <span>Consider loyalty rewards or exclusive benefits</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReasonCard;

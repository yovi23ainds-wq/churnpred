const ProfileModal = ({ isOpen, onClose, customerData, predictionResult }) => {
  if (!isOpen) return null;

  const formatValue = (value) => {
    if (typeof value === 'number') {
      return value % 1 === 0 ? value : value.toFixed(2);
    }
    return value;
  };

  const sections = [
    {
      title: 'Customer Profile',
      icon: '👤',
      fields: [
        { label: 'Tenure', value: `${customerData.Tenure} months`, icon: '📅' },
        { label: 'City Tier', value: `Tier ${customerData.CityTier}`, icon: '🏙️' },
        { label: 'Gender', value: customerData.Gender, icon: '👥' },
        { label: 'Marital Status', value: customerData.MaritalStatus, icon: '💑' },
        { label: 'Number of Addresses', value: customerData.NumberOfAddress, icon: '📍' },
      ],
    },
    {
      title: 'Shopping Behavior',
      icon: '🛒',
      fields: [
        { label: 'Total Orders', value: customerData.OrderCount, icon: '📦' },
        { label: 'Coupons Used', value: customerData.CouponUsed, icon: '🎟️' },
        { label: 'Order Amount Increase', value: `${formatValue(customerData.OrderAmountHikeFromlastYear)}%`, icon: '📈' },
        { label: 'Days Since Last Order', value: `${customerData.DaySinceLastOrder} days`, icon: '⏰' },
        { label: 'Total Cashback', value: `$${formatValue(customerData.CashbackAmount)}`, icon: '💰' },
        { label: 'Preferred Payment', value: customerData.PreferredPaymentMode, icon: '💳' },
        { label: 'Preferred Category', value: customerData.PreferedOrderCat, icon: '🏷️' },
      ],
    },
    {
      title: 'App Engagement',
      icon: '📱',
      fields: [
        { label: 'Hours on App', value: `${formatValue(customerData.HourSpendOnApp)} hrs`, icon: '⏱️' },
        { label: 'Devices Registered', value: customerData.NumberOfDeviceRegistered, icon: '📱' },
        { label: 'Preferred Login Device', value: customerData.PreferredLoginDevice, icon: '💻' },
      ],
    },
    {
      title: 'Customer Experience',
      icon: '⭐',
      fields: [
        { label: 'Satisfaction Score', value: `${customerData.SatisfactionScore}/5`, icon: '⭐' },
        { label: 'Has Complained', value: customerData.Complain === 1 ? 'Yes' : 'No', icon: customerData.Complain === 1 ? '😠' : '😊' },
        { label: 'Warehouse Distance', value: `${formatValue(customerData.WarehouseToHome)} km`, icon: '🚚' },
      ],
    },
  ];

  const getRiskColor = () => {
    if (predictionResult.risk_level === 'High') return 'text-red-600 bg-red-50 border-red-200';
    if (predictionResult.risk_level === 'Medium') return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📊</span>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Customer Full Profile</h2>
              <p className="text-sm text-gray-500">Complete customer data and insights</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Churn Prediction Summary */}
          <div className={`rounded-lg p-6 border-2 ${getRiskColor()}`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold mb-1">Churn Prediction</h3>
                <p className="text-sm opacity-80">AI-powered risk assessment</p>
              </div>
              <span className="text-4xl">
                {predictionResult.risk_level === 'High' ? '🚨' :
                 predictionResult.risk_level === 'Medium' ? '⚠️' : '✅'}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm opacity-80 mb-1">Churn Probability</p>
                <p className="text-3xl font-bold">
                  {(predictionResult.churn_probability * 100).toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-sm opacity-80 mb-1">Risk Level</p>
                <p className="text-3xl font-bold">{predictionResult.risk_level}</p>
              </div>
            </div>

            {/* Key Factors */}
            <div className="mt-4 pt-4 border-t border-current opacity-50">
              <p className="text-sm font-semibold mb-2">Key Risk Factors:</p>
              <ul className="space-y-1 text-sm">
                {predictionResult.important_features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span>•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Customer Data Sections */}
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="card">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{section.icon}</span>
                <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-xl">{field.icon}</span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-0.5">{field.label}</p>
                      <p className="text-sm font-semibold text-gray-900">{field.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Customer Insights */}
          <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-3xl">💡</span>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Customer Insights</h3>
                <p className="text-sm text-gray-600">AI-generated recommendations</p>
              </div>
            </div>

            <div className="space-y-3">
              {/* Engagement Level */}
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-900 mb-2">📊 Engagement Level</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        customerData.HourSpendOnApp > 4 ? 'bg-green-500' :
                        customerData.HourSpendOnApp > 2 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min((customerData.HourSpendOnApp / 5) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {customerData.HourSpendOnApp > 4 ? 'High' :
                     customerData.HourSpendOnApp > 2 ? 'Medium' : 'Low'}
                  </span>
                </div>
              </div>

              {/* Order Frequency */}
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-900 mb-2">🛒 Order Frequency</p>
                <p className="text-sm text-gray-600">
                  {customerData.OrderCount > 20 ? 'Frequent buyer - Excellent customer!' :
                   customerData.OrderCount > 10 ? 'Regular customer - Good engagement' :
                   'Occasional buyer - Needs engagement boost'}
                </p>
              </div>

              {/* Satisfaction Status */}
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-900 mb-2">⭐ Satisfaction Status</p>
                <p className="text-sm text-gray-600">
                  {customerData.SatisfactionScore >= 4 ? 'Highly satisfied - Keep up the good work!' :
                   customerData.SatisfactionScore >= 3 ? 'Moderately satisfied - Room for improvement' :
                   'Low satisfaction - Immediate attention needed!'}
                </p>
              </div>
            </div>
          </div>

          {/* Action Recommendations */}
          <div className="card border-2 border-primary-200 bg-primary-50">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-3xl">🎯</span>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Recommended Actions</h3>
                <p className="text-sm text-gray-600">Based on customer profile and churn risk</p>
              </div>
            </div>

            <div className="space-y-2">
              {predictionResult.risk_level === 'High' && (
                <>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-red-600">•</span>
                    <span>Send immediate retention email with aggressive offer (30%+ discount)</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-red-600">•</span>
                    <span>Assign dedicated account manager for personalized support</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-red-600">•</span>
                    <span>Offer free shipping and double cashback for next 3 orders</span>
                  </div>
                </>
              )}
              {predictionResult.risk_level === 'Medium' && (
                <>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-yellow-600">•</span>
                    <span>Send engagement email with moderate offer (15-20% discount)</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-yellow-600">•</span>
                    <span>Provide exclusive access to new products or sales</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-yellow-600">•</span>
                    <span>Increase engagement through personalized recommendations</span>
                  </div>
                </>
              )}
              {predictionResult.risk_level === 'Low' && (
                <>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-green-600">•</span>
                    <span>Send appreciation email with loyalty bonus</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-green-600">•</span>
                    <span>Invite to VIP program or early access to new features</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-green-600">•</span>
                    <span>Continue providing excellent service to maintain loyalty</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
          <button onClick={onClose} className="btn-secondary">
            Close
          </button>
          <button
            onClick={() => {
              console.log('📊 Exporting customer profile:', { customerData, predictionResult });
              alert('Profile exported! Check console for data.');
            }}
            className="btn-primary"
          >
            📥 Export Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;

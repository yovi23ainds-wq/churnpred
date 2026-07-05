import { useState } from 'react';

const OfferModal = ({ isOpen, onClose, riskLevel, churnProbability }) => {
  const [offerData, setOfferData] = useState({
    offerType: 'discount',
    discountPercentage: riskLevel === 'High' ? 30 : riskLevel === 'Medium' ? 20 : 15,
    cashbackAmount: riskLevel === 'High' ? 500 : riskLevel === 'Medium' ? 300 : 200,
    freeShipping: riskLevel === 'High',
    validityDays: 30,
    minOrderValue: 0,
    description: '',
  });
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState(false);

  const offerTypes = [
    { value: 'discount', label: '💰 Percentage Discount', icon: '💰' },
    { value: 'cashback', label: '💵 Cashback Offer', icon: '💵' },
    { value: 'freeShipping', label: '🚚 Free Shipping', icon: '🚚' },
    { value: 'bundle', label: '📦 Bundle Deal', icon: '📦' },
    { value: 'loyalty', label: '⭐ Loyalty Points', icon: '⭐' },
  ];

  const handleCreate = async () => {
    setCreating(true);
    
    // Simulate creating offer
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('🎁 Creating offer:', {
      ...offerData,
      riskLevel,
      churnProbability,
      createdAt: new Date().toISOString(),
    });
    
    setCreating(false);
    setCreated(true);
    
    // Close modal after 2 seconds
    setTimeout(() => {
      setCreated(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎁</span>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Create Retention Offer</h2>
              <p className="text-sm text-gray-500">
                Customized for <span className={`font-semibold ${
                  riskLevel === 'High' ? 'text-red-600' :
                  riskLevel === 'Medium' ? 'text-yellow-600' :
                  'text-green-600'
                }`}>{riskLevel}</span> risk customer
              </p>
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
          {created ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">Offer Created!</h3>
              <p className="text-gray-600">The retention offer has been created successfully.</p>
            </div>
          ) : (
            <>
              {/* Risk Alert */}
              <div className={`rounded-lg p-4 ${
                riskLevel === 'High' ? 'bg-red-50 border border-red-200' :
                riskLevel === 'Medium' ? 'bg-yellow-50 border border-yellow-200' :
                'bg-green-50 border border-green-200'
              }`}>
                <div className="flex items-start gap-2">
                  <span className="text-2xl">
                    {riskLevel === 'High' ? '🚨' : riskLevel === 'Medium' ? '⚠️' : '✅'}
                  </span>
                  <div className="text-sm">
                    <p className="font-semibold mb-1">
                      {riskLevel === 'High' ? 'High Priority Customer' :
                       riskLevel === 'Medium' ? 'Medium Priority Customer' :
                       'Low Risk Customer'}
                    </p>
                    <p className="text-gray-700">
                      Churn Probability: <span className="font-bold">{(churnProbability * 100).toFixed(1)}%</span>
                      {riskLevel === 'High' && ' - Aggressive retention strategy recommended'}
                      {riskLevel === 'Medium' && ' - Moderate retention offer suggested'}
                      {riskLevel === 'Low' && ' - Standard appreciation offer'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Offer Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Offer Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {offerTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setOfferData({ ...offerData, offerType: type.value })}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        offerData.offerType === type.value
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">{type.icon}</div>
                      <div className="text-sm font-medium text-gray-900">
                        {type.label.replace(/^[^\s]+ /, '')}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Offer Details */}
              <div className="grid grid-cols-2 gap-4">
                {offerData.offerType === 'discount' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount Percentage
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={offerData.discountPercentage}
                        onChange={(e) => setOfferData({ ...offerData, discountPercentage: Number(e.target.value) })}
                        className="input-field pr-8"
                        min="5"
                        max="50"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </div>
                )}

                {offerData.offerType === 'cashback' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cashback Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={offerData.cashbackAmount}
                        onChange={(e) => setOfferData({ ...offerData, cashbackAmount: Number(e.target.value) })}
                        className="input-field pl-8"
                        min="50"
                        max="1000"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Validity (Days)
                  </label>
                  <input
                    type="number"
                    value={offerData.validityDays}
                    onChange={(e) => setOfferData({ ...offerData, validityDays: Number(e.target.value) })}
                    className="input-field"
                    min="7"
                    max="90"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Order Value ($)
                  </label>
                  <input
                    type="number"
                    value={offerData.minOrderValue}
                    onChange={(e) => setOfferData({ ...offerData, minOrderValue: Number(e.target.value) })}
                    className="input-field"
                    min="0"
                  />
                </div>
              </div>

              {/* Free Shipping Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🚚</span>
                  <div>
                    <p className="font-medium text-gray-900">Include Free Shipping</p>
                    <p className="text-sm text-gray-500">Add free shipping to this offer</p>
                  </div>
                </div>
                <button
                  onClick={() => setOfferData({ ...offerData, freeShipping: !offerData.freeShipping })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    offerData.freeShipping ? 'bg-primary-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      offerData.freeShipping ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Offer Description (Optional)
                </label>
                <textarea
                  value={offerData.description}
                  onChange={(e) => setOfferData({ ...offerData, description: e.target.value })}
                  placeholder="Add any additional details about this offer..."
                  rows={3}
                  className="input-field resize-none"
                />
              </div>

              {/* Offer Preview */}
              <div className="bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">📋 Offer Preview</h4>
                <div className="space-y-1 text-sm text-gray-700">
                  {offerData.offerType === 'discount' && (
                    <p>• <span className="font-semibold">{offerData.discountPercentage}% OFF</span> on purchases</p>
                  )}
                  {offerData.offerType === 'cashback' && (
                    <p>• <span className="font-semibold">${offerData.cashbackAmount} Cashback</span> on orders</p>
                  )}
                  {offerData.freeShipping && (
                    <p>• <span className="font-semibold">Free Shipping</span> included</p>
                  )}
                  <p>• Valid for <span className="font-semibold">{offerData.validityDays} days</span></p>
                  {offerData.minOrderValue > 0 && (
                    <p>• Minimum order: <span className="font-semibold">${offerData.minOrderValue}</span></p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {!created && (
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="btn-secondary"
              disabled={creating}
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={creating}
              className="btn-primary flex items-center gap-2"
            >
              {creating ? (
                <>
                  <div className="spinner w-4 h-4 border-2"></div>
                  Creating...
                </>
              ) : (
                <>
                  🎁 Create Offer
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferModal;

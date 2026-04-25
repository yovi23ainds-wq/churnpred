import { useState } from 'react';

const StepperForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    // Customer Profile
    Tenure: 12,
    CityTier: 1,
    Gender: 'Male',
    MaritalStatus: 'Single',
    NumberOfAddress: 2,
    PreferedOrderCat: 'Mobile Phone',
    
    // Behavior
    OrderCount: 10,
    CouponUsed: 5,
    OrderAmountHikeFromlastYear: 15.0,
    DaySinceLastOrder: 5,
    CashbackAmount: 150.0,
    PreferredPaymentMode: 'Debit Card',
    
    // Experience
    HourSpendOnApp: 3.5,
    NumberOfDeviceRegistered: 4,
    SatisfactionScore: 3,
    Complain: 0,
    WarehouseToHome: 15.5,
    PreferredLoginDevice: 'Mobile Phone',
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    let convertedValue = value;
    if (type === 'number') {
      convertedValue = value === '' ? 0 : parseFloat(value);
      if (isNaN(convertedValue)) {
        convertedValue = 0;
      }
    } else if (type === 'select-one' && !isNaN(value) && value !== '') {
      convertedValue = parseFloat(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: convertedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const sanitizedData = {
      Tenure: Number(formData.Tenure) || 0,
      CityTier: Number(formData.CityTier) || 1,
      WarehouseToHome: Number(formData.WarehouseToHome) || 0,
      HourSpendOnApp: Number(formData.HourSpendOnApp) || 0,
      NumberOfDeviceRegistered: Number(formData.NumberOfDeviceRegistered) || 0,
      SatisfactionScore: Number(formData.SatisfactionScore) || 3,
      NumberOfAddress: Number(formData.NumberOfAddress) || 0,
      Complain: Number(formData.Complain) || 0,
      OrderAmountHikeFromlastYear: Number(formData.OrderAmountHikeFromlastYear) || 0,
      CouponUsed: Number(formData.CouponUsed) || 0,
      OrderCount: Number(formData.OrderCount) || 0,
      DaySinceLastOrder: Number(formData.DaySinceLastOrder) || 0,
      CashbackAmount: Number(formData.CashbackAmount) || 0,
      PreferredLoginDevice: String(formData.PreferredLoginDevice || 'Mobile Phone'),
      PreferredPaymentMode: String(formData.PreferredPaymentMode || 'Debit Card'),
      Gender: String(formData.Gender || 'Male'),
      PreferedOrderCat: String(formData.PreferedOrderCat || 'Mobile Phone'),
      MaritalStatus: String(formData.MaritalStatus || 'Single'),
    };
    
    console.log('📋 Form data being submitted:', sanitizedData);
    onSubmit(sanitizedData);
  };

  return (
    <div className="card max-w-6xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="space-y-8">
          {/* Section 1: Customer Profile */}
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-primary-200">
              <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center text-2xl">
                👤
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Customer Profile</h3>
                <p className="text-sm text-gray-500">Basic customer information</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tenure (months)
                </label>
                <input
                  type="number"
                  name="Tenure"
                  value={formData.Tenure}
                  onChange={handleChange}
                  className="input-field"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City Tier
                </label>
                <select
                  name="CityTier"
                  value={formData.CityTier}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value={1}>Tier 1</option>
                  <option value={2}>Tier 2</option>
                  <option value={3}>Tier 3</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  name="Gender"
                  value={formData.Gender}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Marital Status
                </label>
                <select
                  name="MaritalStatus"
                  value={formData.MaritalStatus}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Addresses
                </label>
                <input
                  type="number"
                  name="NumberOfAddress"
                  value={formData.NumberOfAddress}
                  onChange={handleChange}
                  className="input-field"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Order Category
                </label>
                <select
                  name="PreferedOrderCat"
                  value={formData.PreferedOrderCat}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="Mobile Phone">Mobile Phone</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Laptop & Accessory">Laptop & Accessory</option>
                  <option value="Grocery">Grocery</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Shopping Behavior */}
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-primary-200">
              <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center text-2xl">
                📊
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Shopping Behavior</h3>
                <p className="text-sm text-gray-500">Purchase patterns and activity</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order Count
                </label>
                <input
                  type="number"
                  name="OrderCount"
                  value={formData.OrderCount}
                  onChange={handleChange}
                  className="input-field"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coupons Used
                </label>
                <input
                  type="number"
                  name="CouponUsed"
                  value={formData.CouponUsed}
                  onChange={handleChange}
                  className="input-field"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order Amount Increase (%)
                </label>
                <input
                  type="number"
                  name="OrderAmountHikeFromlastYear"
                  value={formData.OrderAmountHikeFromlastYear}
                  onChange={handleChange}
                  className="input-field"
                  step="0.1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Days Since Last Order
                </label>
                <input
                  type="number"
                  name="DaySinceLastOrder"
                  value={formData.DaySinceLastOrder}
                  onChange={handleChange}
                  className="input-field"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cashback Amount ($)
                </label>
                <input
                  type="number"
                  name="CashbackAmount"
                  value={formData.CashbackAmount}
                  onChange={handleChange}
                  className="input-field"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Payment Mode
                </label>
                <select
                  name="PreferredPaymentMode"
                  value={formData.PreferredPaymentMode}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="Debit Card">Debit Card</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="UPI">UPI</option>
                  <option value="E wallet">E wallet</option>
                  <option value="COD">COD</option>
                  <option value="Cash on Delivery">Cash on Delivery</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Customer Experience */}
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-primary-200">
              <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center text-2xl">
                ⭐
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Customer Experience</h3>
                <p className="text-sm text-gray-500">Satisfaction and engagement metrics</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hours Spent on App
                </label>
                <input
                  type="number"
                  name="HourSpendOnApp"
                  value={formData.HourSpendOnApp}
                  onChange={handleChange}
                  className="input-field"
                  min="0"
                  step="0.1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Devices Registered
                </label>
                <input
                  type="number"
                  name="NumberOfDeviceRegistered"
                  value={formData.NumberOfDeviceRegistered}
                  onChange={handleChange}
                  className="input-field"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Satisfaction Score (1-5)
                </label>
                <select
                  name="SatisfactionScore"
                  value={formData.SatisfactionScore}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value={1}>1 - Very Dissatisfied</option>
                  <option value={2}>2 - Dissatisfied</option>
                  <option value={3}>3 - Neutral</option>
                  <option value={4}>4 - Satisfied</option>
                  <option value={5}>5 - Very Satisfied</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Has Complained?
                </label>
                <select
                  name="Complain"
                  value={formData.Complain}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value={0}>No</option>
                  <option value={1}>Yes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Warehouse to Home Distance (km)
                </label>
                <input
                  type="number"
                  name="WarehouseToHome"
                  value={formData.WarehouseToHome}
                  onChange={handleChange}
                  className="input-field"
                  min="0"
                  step="0.1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Login Device
                </label>
                <select
                  name="PreferredLoginDevice"
                  value={formData.PreferredLoginDevice}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="Mobile Phone">Mobile Phone</option>
                  <option value="Phone">Phone</option>
                  <option value="Computer">Computer</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center gap-2 px-8 py-3 text-base"
          >
            {loading ? (
              <>
                <div className="spinner w-5 h-5 border-2"></div>
                Predicting...
              </>
            ) : (
              <>
                🔮 Predict Churn
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepperForm;

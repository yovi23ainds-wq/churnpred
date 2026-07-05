import { useState } from 'react';

const EmailModal = ({ isOpen, onClose, customerData, riskLevel }) => {
  const [emailData, setEmailData] = useState({
    subject: `Special Offer for You - ${riskLevel} Priority`,
    message: generateEmailTemplate(riskLevel),
    recipientEmail: '',
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function generateEmailTemplate(risk) {
    if (risk === 'High') {
      return `Dear Valued Customer,

We've noticed you haven't been as active lately, and we truly value your business. As one of our important customers, we'd like to offer you an exclusive deal:

🎁 Special Offer: 30% OFF your next purchase
💰 Extra Cashback: Double cashback on your next 3 orders
🚚 Free Shipping: On all orders for the next month

We're committed to providing you with the best shopping experience. If there's anything we can do to improve, please don't hesitate to reach out.

Best regards,
Customer Success Team`;
    } else if (risk === 'Medium') {
      return `Dear Valued Customer,

Thank you for being a part of our community! We wanted to reach out with a special offer just for you:

🎁 Exclusive Discount: 20% OFF your next order
💰 Bonus Cashback: Extra rewards on your purchases
🎟️ Special Coupons: Access to exclusive deals

We appreciate your continued support and look forward to serving you better.

Best regards,
Customer Success Team`;
    } else {
      return `Dear Valued Customer,

Thank you for being such a loyal customer! We truly appreciate your continued support.

As a token of our appreciation, here's a special thank you offer:

🎁 Loyalty Bonus: 15% OFF your next purchase
⭐ VIP Access: Early access to new products
💝 Surprise Gift: With your next order

Keep enjoying your shopping experience with us!

Best regards,
Customer Success Team`;
    }
  }

  const handleSend = async () => {
    setSending(true);
    
    // Simulate sending email
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('📧 Sending retention email:', {
      to: emailData.recipientEmail,
      subject: emailData.subject,
      message: emailData.message,
      customerData,
      riskLevel,
    });
    
    setSending(false);
    setSent(true);
    
    // Close modal after 2 seconds
    setTimeout(() => {
      setSent(false);
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
            <span className="text-3xl">📧</span>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Send Retention Email</h2>
              <p className="text-sm text-gray-500">
                Risk Level: <span className={`font-semibold ${
                  riskLevel === 'High' ? 'text-red-600' :
                  riskLevel === 'Medium' ? 'text-yellow-600' :
                  'text-green-600'
                }`}>{riskLevel}</span>
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
        <div className="p-6 space-y-4">
          {sent ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">Email Sent!</h3>
              <p className="text-gray-600">The retention email has been sent successfully.</p>
            </div>
          ) : (
            <>
              {/* Recipient Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient Email *
                </label>
                <input
                  type="email"
                  value={emailData.recipientEmail}
                  onChange={(e) => setEmailData({ ...emailData, recipientEmail: e.target.value })}
                  placeholder="customer@example.com"
                  className="input-field"
                  required
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={emailData.subject}
                  onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                  className="input-field"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={emailData.message}
                  onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
                  rows={12}
                  className="input-field resize-none"
                />
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 text-xl">💡</span>
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">Email Template Generated</p>
                    <p>This email template is customized based on the customer's churn risk level. Feel free to edit it before sending.</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {!sent && (
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="btn-secondary"
              disabled={sending}
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              disabled={sending || !emailData.recipientEmail}
              className="btn-primary flex items-center gap-2"
            >
              {sending ? (
                <>
                  <div className="spinner w-4 h-4 border-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  📧 Send Email
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailModal;

import React from 'react';
import { useCart } from '../../context/CartContext';
import { FiShoppingCart, FiTruck, FiTag, FiShield } from 'react-icons/fi';

/**
 * OrderSummary component - Display order summary during checkout
 */
const OrderSummary = () => {
  const { items, getCartTotals } = useCart();
  const totals = getCartTotals();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <FiShoppingCart className="mr-2 h-5 w-5" />
        Order Summary
      </h2>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <FiShoppingCart className="h-6 w-6 text-gray-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 truncate">
                {item.name}
              </h4>
              <p className="text-xs text-gray-500">
                {item.category} • Qty: {item.quantity}
              </p>
            </div>
            <div className="text-sm font-semibold text-gray-900">
              {formatPrice(item.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="border-t border-gray-200 pt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">
            {formatPrice(totals.subtotal)}
          </span>
        </div>

        {totals.discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-green-600 flex items-center">
              <FiTag className="mr-1 h-4 w-4" />
              Discount
            </span>
            <span className="font-medium text-green-600">
              -{formatPrice(totals.discount)}
            </span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-gray-600 flex items-center">
            <FiTruck className="mr-1 h-4 w-4" />
            Shipping
          </span>
          <span className="font-medium text-gray-900">
            {totals.shipping === 0 ? 'FREE' : formatPrice(totals.shipping)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium text-gray-900">
            {formatPrice(totals.tax)}
          </span>
        </div>

        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between">
            <span className="text-base font-semibold text-gray-900">Total</span>
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(totals.total)}
            </span>
          </div>
        </div>
      </div>

      {/* Promo Code */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Promo Code
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter promo code"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors">
            Apply
          </button>
        </div>
      </div>

      {/* Security Badge */}
      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center">
          <FiShield className="h-5 w-5 text-green-600 mr-2" />
          <div>
            <h4 className="text-sm font-medium text-green-900">Secure Checkout</h4>
            <p className="text-xs text-green-700">
              Your payment information is encrypted and secure
            </p>
          </div>
        </div>
      </div>

      {/* Accepted Payment Methods */}
      <div className="mt-4">
        <p className="text-xs text-gray-500 mb-2">Accepted Payment Methods</p>
        <div className="flex justify-center space-x-2">
          <div className="w-8 h-5 bg-gray-200 rounded flex items-center justify-center text-xs font-medium text-gray-600">
            VISA
          </div>
          <div className="w-8 h-5 bg-gray-200 rounded flex items-center justify-center text-xs font-medium text-gray-600">
            MC
          </div>
          <div className="w-8 h-5 bg-gray-200 rounded flex items-center justify-center text-xs font-medium text-gray-600">
            AMEX
          </div>
          <div className="w-8 h-5 bg-gray-200 rounded flex items-center justify-center text-xs font-medium text-gray-600">
            PP
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

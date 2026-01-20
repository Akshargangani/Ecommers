import React from 'react';
import { FiShoppingCart, FiTag, FiTruck } from 'react-icons/fi';

/**
 * CartSummary component - Cart totals and checkout summary
 */
const CartSummary = ({ 
  subtotal, 
  shipping, 
  tax, 
  total, 
  discount, 
  onCheckout,
  isEmpty 
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const freeShippingThreshold = 50;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <FiShoppingCart className="mr-2 h-5 w-5" />
        Order Summary
      </h2>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">
            {formatPrice(subtotal)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-green-600 flex items-center">
              <FiTag className="mr-1 h-4 w-4" />
              Discount
            </span>
            <span className="font-medium text-green-600">
              -{formatPrice(discount)}
            </span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-gray-600 flex items-center">
            <FiTruck className="mr-1 h-4 w-4" />
            Shipping
          </span>
          <span className="font-medium text-gray-900">
            {shipping === 0 ? 'FREE' : formatPrice(shipping)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium text-gray-900">
            {formatPrice(tax)}
          </span>
        </div>

        {/* Free Shipping Progress */}
        {shipping > 0 && remainingForFreeShipping > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-800">
                Add {formatPrice(remainingForFreeShipping)} more for FREE shipping!
              </span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
              ></div>
            </div>
          </div>
        )}

        {shipping === 0 && (
          <div className="bg-green-50 border border-green-200 rounded-md p-3">
            <span className="text-sm text-green-800 flex items-center">
              <FiTruck className="mr-1 h-4 w-4" />
              You've qualified for FREE shipping!
            </span>
          </div>
        )}

        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between">
            <span className="text-base font-semibold text-gray-900">Total</span>
            <span className="text-base font-bold text-gray-900">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>

      {/* Promo Code */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Promo Code
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter promo code"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
            Apply
          </button>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        disabled={isEmpty}
        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isEmpty ? 'Cart is Empty' : 'Proceed to Checkout'}
      </button>

      {/* Security Badge */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          <span className="inline-flex items-center">
            🔒 Secure checkout powered by SSL encryption
          </span>
        </p>
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
            PP
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiShoppingCart, FiTruck, FiShield, FiCheck } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import CheckoutForm from './CheckoutForm';
import OrderSummary from './OrderSummary';

/**
 * Checkout component - Main checkout page
 */
const Checkout = () => {
  const { items, getCartTotals } = useCart();
  const { isAuthenticated } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const totals = getCartTotals();

  const handlePlaceOrder = async (orderData) => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate random order number
      const generatedOrderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      setOrderNumber(generatedOrderNumber);
      setOrderComplete(true);
      
      // Clear cart after successful order
      // In real app, this would be handled by the API
      localStorage.removeItem('cart');
      
      toast.success('Order placed successfully!');
    } catch (error) {
      toast.error('Failed to place order');
      console.error('Checkout error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiShoppingCart className="h-8 w-8 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Sign in to continue
          </h2>
          <p className="text-gray-600 mb-6">
            Please sign in to your account to proceed with checkout.
          </p>
          <div className="space-y-3">
            <Link
              to="/login"
              className="w-full flex justify-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="w-full flex justify-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50"
            >
              Create Account
            </Link>
            <Link
              to="/products"
              className="w-full flex justify-center px-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiShoppingCart className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add some items to your cart before proceeding to checkout.
          </p>
          <Link
            to="/products"
            className="w-full flex justify-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheck className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Complete!
          </h1>
          <p className="text-gray-600 mb-4">
            Thank you for your order. We've sent a confirmation email with your order details.
          </p>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Order Information
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Number:</span>
                <span className="font-medium text-gray-900">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order Total:</span>
                <span className="font-medium text-gray-900">
                  ${totals.total.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium text-gray-900">Credit Card</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Delivery:</span>
                <span className="font-medium text-gray-900">2-3 business days</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <Link
              to="/orders"
              className="w-full flex justify-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
            >
              View Order Details
            </Link>
            <Link
              to="/products"
              className="w-full flex justify-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link
              to="/cart"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FiArrowLeft className="mr-2 h-4 w-4" />
              Back to Cart
            </Link>
            <div className="flex-1 text-center">
              <h1 className="text-xl font-semibold text-gray-900">Checkout</h1>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                1
              </div>
              <span className="ml-2 text-gray-900">Cart</span>
            </div>
            <div className="w-12 h-1 bg-green-500"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                2
              </div>
              <span className="ml-2 text-gray-900">Details</span>
            </div>
            <div className="w-12 h-1 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center text-xs font-medium">
                3
              </div>
              <span className="ml-2 text-gray-500">Complete</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 sm:p-8">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Customer Information
                  </h2>
                  <p className="text-sm text-gray-600">
                    Enter your shipping and payment information to complete your order.
                  </p>
                </div>
                
                <CheckoutForm onPlaceOrder={handlePlaceOrder} />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-6">
              <OrderSummary />
              
              {/* Trust Badges */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <FiShield className="h-5 w-5 text-green-600" />
                  <div>
                    <h4 className="text-sm font-medium text-green-900">Secure Payment</h4>
                    <p className="text-xs text-green-700">SSL encrypted checkout</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <FiTruck className="h-5 w-5 text-blue-600" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Fast Delivery</h4>
                    <p className="text-xs text-blue-700">2-3 business days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-sm mx-auto">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Processing Order
              </h3>
              <p className="text-gray-600">
                Please wait while we process your payment...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;

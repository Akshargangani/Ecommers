import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiArrowLeft, FiRefreshCw } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

/**
 * Cart component - Main shopping cart page
 */
const Cart = () => {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotals,
    isLoading 
  } = useCart();

  const [isUpdating, setIsUpdating] = useState(false);

  const totals = getCartTotals();

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      setIsUpdating(true);
      await updateQuantity(itemId, newQuantity);
    } catch (error) {
      toast.error('Failed to update quantity');
      console.error('Error updating quantity:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      setIsUpdating(true);
      await removeFromCart(itemId);
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
      console.error('Error removing item:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      try {
        setIsUpdating(true);
        await clearCart();
        toast.success('Cart cleared successfully');
      } catch (error) {
        toast.error('Failed to clear cart');
        console.error('Error clearing cart:', error);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const handleCheckout = () => {
    // Navigate to checkout page
    window.location.href = '/checkout';
  };

  const handleContinueShopping = () => {
    window.location.href = '/products';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/products"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FiArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <FiShoppingCart className="mr-3 h-6 w-6" />
                Shopping Cart
                {items.length > 0 && (
                  <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                  </span>
                )}
              </h1>
            </div>
            
            {items.length > 0 && (
              <button
                onClick={handleClearCart}
                disabled={isUpdating}
                className="text-red-600 hover:text-red-700 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>

        {/* Cart Content */}
        {items.length === 0 ? (
          // Empty Cart
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <FiShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
              </p>
              <button
                onClick={handleContinueShopping}
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                <FiShoppingCart className="mr-2 h-4 w-4" />
                Start Shopping
              </button>
            </div>
          </div>
        ) : (
          // Cart with Items
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Cart Items ({items.length})
                  </h2>
                  {isUpdating && (
                    <div className="flex items-center text-sm text-indigo-600">
                      <FiRefreshCw className="animate-spin h-4 w-4 mr-1" />
                      Updating...
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onQuantityChange={handleQuantityChange}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </div>
              </div>

              {/* Recommended Products */}
              <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  You might also like
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4">
                      <div className="w-full h-32 bg-gray-200 rounded mb-3"></div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">
                        Recommended Product {i}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Great addition to your cart
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-indigo-600">
                          ${(Math.random() * 100 + 20).toFixed(2)}
                        </span>
                        <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <CartSummary
                subtotal={totals.subtotal}
                shipping={totals.shipping}
                tax={totals.tax}
                total={totals.total}
                discount={totals.discount}
                onCheckout={handleCheckout}
                isEmpty={items.length === 0}
              />
            </div>
          </div>
        )}

        {/* Trust Badges */}
        {items.length > 0 && (
          <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  Secure Payment
                </h4>
                <p className="text-xs text-gray-600">
                  Your payment information is safe and encrypted
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">🚚</span>
                </div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  Fast Delivery
                </h4>
                <p className="text-xs text-gray-600">
                  Quick and reliable shipping to your door
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold">↩️</span>
                </div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  Easy Returns
                </h4>
                <p className="text-xs text-gray-600">
                  30-day return policy for your peace of mind
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-yellow-600 font-bold">💬</span>
                </div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  24/7 Support
                </h4>
                <p className="text-xs text-gray-600">
                  Our team is here to help anytime
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

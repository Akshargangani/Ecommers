import React from 'react';
import { FiPlus, FiMinus, FiTrash2, FiShoppingBag } from 'react-icons/fi';

/**
 * CartItem component - Individual item in shopping cart
 */
const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const handleIncreaseQuantity = () => {
    onQuantityChange(item.id, item.quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
      <div className="flex items-center space-x-4">
        {/* Product Image */}
        <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
          {item.image ? (
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <FiShoppingBag className="h-8 w-8 text-gray-400" />
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {item.name}
          </h3>
          <p className="text-sm text-gray-500">
            {item.category || 'Product'}
          </p>
          <p className="text-sm font-semibold text-indigo-600">
            {formatPrice(item.price)}
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={handleDecreaseQuantity}
              disabled={item.quantity <= 1}
              className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiMinus className="h-4 w-4" />
            </button>
            <span className="px-3 py-2 text-sm font-medium text-gray-900 min-w-[3rem] text-center">
              {item.quantity}
            </span>
            <button
              onClick={handleIncreaseQuantity}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <FiPlus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Item Total and Remove */}
        <div className="flex flex-col items-end space-y-2">
          <p className="text-sm font-semibold text-gray-900">
            {formatPrice(item.price * item.quantity)}
          </p>
          <button
            onClick={handleRemove}
            className="p-2 text-red-500 hover:text-red-700 transition-colors"
            title="Remove item"
          >
            <FiTrash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Stock Status */}
      {item.stock !== undefined && (
        <div className="mt-3">
          {item.stock > 0 ? (
            <span className="text-xs text-green-600">
              {item.stock} in stock
            </span>
          ) : (
            <span className="text-xs text-red-600">
              Out of stock
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default CartItem;

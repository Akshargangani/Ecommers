import React, { useState } from 'react';
import { FiShoppingCart, FiCheck, FiPlus } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';

/**
 * AddToCartButton component - Button to add products to cart
 */
const AddToCartButton = ({ 
  product, 
  quantity = 1, 
  className = '', 
  showIcon = true,
  size = 'md' 
}) => {
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (isAdding) return;

    try {
      setIsAdding(true);
      
      const result = await addToCart(product.id || product._id, quantity);
      
      if (result.success) {
        toast.success(`${product.name} added to cart!`);
      } else {
        toast.error(result.error || 'Failed to add to cart');
      }
    } catch (error) {
      toast.error('Failed to add to cart');
      console.error('Add to cart error:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const itemQuantity = getItemQuantity(product.id || product._id);
  const inCart = isInCart(product.id || product._id);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'lg':
        return 'px-6 py-3 text-base';
      default:
        return 'px-4 py-2 text-sm';
    }
  };

  const getIcon = () => {
    if (isAdding) {
      return <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>;
    }
    if (inCart && itemQuantity > 0) {
      return <FiCheck className="h-4 w-4" />;
    }
    return showIcon ? <FiShoppingCart className="h-4 w-4" /> : null;
  };

  const getButtonText = () => {
    if (isAdding) return 'Adding...';
    if (inCart && itemQuantity > 0) return `In Cart (${itemQuantity})`;
    return showIcon ? 'Add to Cart' : 'Add';
  };

  const baseClasses = `
    inline-flex items-center justify-center
    font-medium rounded-md
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${getSizeClasses()}
    ${className}
  `;

  const activeClasses = inCart && itemQuantity > 0
    ? 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
    : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500';

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding || !product || (product.stock !== undefined && product.stock <= 0)}
      className={`${baseClasses} ${activeClasses}`}
    >
      {getIcon()}
      <span className={showIcon ? 'ml-2' : ''}>
        {getButtonText()}
      </span>
    </button>
  );
};

export default AddToCartButton;

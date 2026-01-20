import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiEye, FiStar } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Get main image or first image
  const mainImage = product.images?.find(img => img.isMain)?.url || product.images?.[0]?.url;
  
  // Calculate discount percentage
  const discountPercentage = product.discountedPrice 
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
    : 0;

  // Handle add to cart
  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.info('Please login to add items to cart');
      return;
    }

    setIsAddingToCart(true);
    
    try {
      const result = await addToCart(product._id, 1);
      if (result.success) {
        toast.success(`${product.name} added to cart!`);
      } else {
        toast.error(result.error || 'Failed to add item to cart');
      }
    } catch (error) {
      toast.error('An error occurred while adding to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Handle wishlist (placeholder functionality)
  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.info('Please login to add items to wishlist');
      return;
    }
    
    toast.info('Wishlist feature coming soon!');
  };

  const isInCartLocal = false; // Simplified - you can implement cart checking logic later

  return (
    <div
      className="card group cursor-pointer transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden h-48 bg-gray-100">
        <Link to={`/products/${product._id}`}>
          <img
            src={mainImage || 'https://via.placeholder.com/300x200/f3f4f6/6b7280?text=No+Image'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <span className="absolute top-2 left-2 bg-error-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
            -{discountPercentage}%
          </span>
        )}

        {/* Featured Badge */}
        {product.isFeatured && (
          <span className="absolute top-2 right-2 bg-warning-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
            Featured
          </span>
        )}

        {/* Out of Stock Badge */}
        {product.inventory?.quantity === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-white text-gray-900 px-4 py-2 rounded-md font-semibold">
              Out of Stock
            </span>
          </div>
        )}

        {/* Quick Actions */}
        <div
          className={`absolute bottom-2 right-2 flex flex-col space-y-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart || product.inventory?.quantity === 0}
            className={`p-2 rounded-full bg-white shadow-lg hover:bg-primary-600 hover:text-white transition-colors duration-200 ${
              isInCartLocal ? 'bg-primary-600 text-white' : 'text-gray-700'
            } ${
              product.inventory?.quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            title={isInCartLocal ? 'In Cart' : 'Add to Cart'}
          >
            <FiShoppingCart className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleWishlist}
            className="p-2 rounded-full bg-white shadow-lg hover:bg-error-600 hover:text-white text-gray-700 transition-colors duration-200"
            title="Add to Wishlist"
          >
            <FiHeart className="w-4 h-4" />
          </button>
          
          <Link
            to={`/products/${product._id}`}
            className="p-2 rounded-full bg-white shadow-lg hover:bg-secondary-600 hover:text-white text-gray-700 transition-colors duration-200"
            title="Quick View"
          >
            <FiEye className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
          {product.category}
        </p>

        {/* Product Name */}
        <Link to={`/products/${product._id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors duration-200">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.ratings?.average || 0)
                    ? 'fill-current text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-2">
            ({product.ratings?.count || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.discountedPrice || product.price}
            </span>
            {product.discountedPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.price}
              </span>
            )}
          </div>
          
          {/* Stock Status */}
          {product.inventory?.quantity > 0 && product.inventory?.quantity <= 10 && (
            <span className="text-xs text-warning-600 font-medium">
              Only {product.inventory.quantity} left
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart || product.inventory?.quantity === 0}
          className={`w-full btn ${
            isInCartLocal
              ? 'bg-success-600 hover:bg-success-700 text-white'
              : 'btn-primary'
          } ${
            product.inventory?.quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isAddingToCart ? (
            <span className="flex items-center justify-center">
              <div className="spinner w-4 h-4 mr-2"></div>
              Adding...
            </span>
          ) : isInCartLocal ? (
            'In Cart'
          ) : product.inventory?.quantity === 0 ? (
            'Out of Stock'
          ) : (
            'Add to Cart'
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

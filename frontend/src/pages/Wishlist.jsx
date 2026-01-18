import React, { useState, useEffect } from 'react';
import { FiHeart, FiShoppingCart, FiTrash2, FiEye } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

/**
 * Wishlist page - User's saved products
 */
const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockWishlist = [
        {
          id: 'wish-1',
          name: 'Premium Wireless Headphones',
          price: 299.99,
          originalPrice: 399.99,
          rating: 4.5,
          reviews: 234,
          category: 'Electronics',
          image: null,
          stock: 15,
          addedDate: '2024-01-05'
        },
        {
          id: 'wish-2',
          name: 'Smart Watch Pro',
          price: 349.99,
          originalPrice: 449.99,
          rating: 4.3,
          reviews: 189,
          category: 'Electronics',
          image: null,
          stock: 8,
          addedDate: '2024-01-03'
        },
        {
          id: 'wish-3',
          name: 'Ergonomic Office Chair',
          price: 199.99,
          originalPrice: 299.99,
          rating: 4.7,
          reviews: 156,
          category: 'Furniture',
          image: null,
          stock: 12,
          addedDate: '2024-01-01'
        },
        {
          id: 'wish-4',
          name: 'Professional Camera Lens',
          price: 599.99,
          originalPrice: 799.99,
          rating: 4.8,
          reviews: 89,
          category: 'Electronics',
          image: null,
          stock: 5,
          addedDate: '2023-12-28'
        }
      ];
      
      setWishlist(mockWishlist);
    } catch (error) {
      toast.error('Failed to load wishlist');
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      const result = await addToCart(product.id, 1);
      
      if (result.success) {
        toast.success(`${product.name} added to cart!`);
      } else {
        toast.error(result.error || 'Failed to add to cart');
      }
    } catch (error) {
      toast.error('Failed to add to cart');
      console.error('Add to cart error:', error);
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setWishlist(prev => prev.filter(item => item.id !== productId));
      toast.success('Removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove from wishlist');
      console.error('Remove from wishlist error:', error);
    }
  };

  const handleClearWishlist = async () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setWishlist([]);
        toast.success('Wishlist cleared');
      } catch (error) {
        toast.error('Failed to clear wishlist');
        console.error('Clear wishlist error:', error);
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <FiHeart className="h-6 w-6 text-red-500" />
              <h1 className="text-xl font-semibold text-gray-900">
                My Wishlist
              </h1>
              <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            
            {wishlist.length > 0 && (
              <button
                onClick={handleClearWishlist}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {wishlist.length === 0 ? (
          // Empty Wishlist
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <FiHeart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your wishlist is empty
              </h2>
              <p className="text-gray-600 mb-8">
                Save your favorite items for later. Start browsing and add products you love!
              </p>
              <button className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700">
                Start Shopping
              </button>
            </div>
          </div>
        ) : (
          // Wishlist Items
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Product Image */}
                <div className="aspect-w-1 aspect-h-1 bg-gray-200 relative">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FiHeart className="h-12 w-12 text-gray-300" />
                    </div>
                  )}
                  
                  {/* Discount Badge */}
                  {item.originalPrice > item.price && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-2">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {item.category}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-xs ${
                          i < Math.floor(item.rating) 
                            ? 'text-yellow-400' 
                            : 'text-gray-300'
                        }`}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-600 ml-1">
                      ({item.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">
                        {formatPrice(item.price)}
                      </span>
                      {item.originalPrice > item.price && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                    </div>
                    <span className={`text-xs font-medium ${
                      item.stock > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
                    </span>
                  </div>

                  {/* Added Date */}
                  <div className="text-xs text-gray-500 mb-3">
                    Added on {formatDate(item.addedDate)}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={item.stock <= 0}
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiShoppingCart className="h-3 w-3 mr-1" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="p-2 text-red-500 hover:text-red-700 border border-red-200 rounded-md"
                      title="Remove from wishlist"
                    >
                      <FiTrash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Wishlist Summary */}
        {wishlist.length > 0 && (
          <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Wishlist Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">
                  {wishlist.length}
                </div>
                <div className="text-sm text-gray-600">
                  Total Items
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {wishlist.filter(item => item.stock > 0).length}
                </div>
                <div className="text-sm text-gray-600">
                  In Stock
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {formatPrice(wishlist.reduce((total, item) => total + item.price, 0))}
                </div>
                <div className="text-sm text-gray-600">
                  Total Value
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;

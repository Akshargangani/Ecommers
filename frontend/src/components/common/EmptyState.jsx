import React from 'react';
import { FiPackage, FiSearch, FiHeart, FiShoppingCart, FiInbox } from 'react-icons/fi';

/**
 * EmptyState component - Consistent empty state display
 */
const EmptyState = ({ 
  type = 'default', 
  title, 
  description, 
  action, 
  className = '' 
}) => {
  const getEmptyStateConfig = () => {
    switch (type) {
      case 'products':
        return {
          icon: FiPackage,
          title: title || 'No products found',
          description: description || 'We couldn\'t find any products matching your criteria.',
          action: action || 'Browse Products'
        };
      case 'search':
        return {
          icon: FiSearch,
          title: title || 'No results found',
          description: description || 'Try adjusting your search terms or filters.',
          action: action || 'Clear Search'
        };
      case 'cart':
        return {
          icon: FiShoppingCart,
          title: title || 'Your cart is empty',
          description: description || 'Add some items to your cart to get started.',
          action: action || 'Start Shopping'
        };
      case 'wishlist':
        return {
          icon: FiHeart,
          title: title || 'Your wishlist is empty',
          description: description || 'Save your favorite items for later.',
          action: action || 'Browse Products'
        };
      case 'orders':
        return {
          icon: FiInbox,
          title: title || 'No orders yet',
          description: description || 'You haven\'t placed any orders yet.',
          action: action || 'Shop Now'
        };
      default:
        return {
          icon: FiPackage,
          title: title || 'Nothing here',
          description: description || 'This section is currently empty.',
          action: action || 'Go Home'
        };
    }
  };

  const config = getEmptyStateConfig();
  const Icon = config.icon;

  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon className="h-8 w-8 text-gray-400" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {config.title}
        </h2>
        
        <p className="text-gray-600 mb-8">
          {config.description}
        </p>
        
        {action && (
          <button className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {config.action}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;

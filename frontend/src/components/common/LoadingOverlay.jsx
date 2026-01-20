import React from 'react';

/**
 * LoadingOverlay component - full screen loading overlay with backdrop
 * @param {boolean} show - whether to show the overlay
 * @param {string} message - loading message to display
 * @param {string} variant - 'spinner', 'skeleton', 'dots'
 */
const LoadingOverlay = ({ show, message = 'Loading...', variant = 'spinner' }) => {
  if (!show) return null;

  const renderContent = () => {
    switch (variant) {
      case 'spinner':
        return <LoadingSpinner size="large" />;
      case 'skeleton':
        return (
          <div className="space-y-4">
            <SkeletonLoader variant="card" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <SkeletonLoader variant="text" />
              <SkeletonLoader variant="text" />
              <SkeletonLoader variant="text" />
            </div>
          </div>
        );
      case 'dots':
        return (
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        );
      default:
        return <LoadingSpinner size="large" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-8 max-w-sm mx-4 shadow-xl">
        <div className="text-center">
          {renderContent()}
          <p className="text-gray-600 mt-4">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;

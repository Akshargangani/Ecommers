import React from 'react';
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';

/**
 * ErrorMessage component - Consistent error display
 */
const ErrorMessage = ({ 
  error, 
  onRetry, 
  title = 'Something went wrong', 
  className = '' 
}) => {
  const getErrorMessage = () => {
    if (typeof error === 'string') return error;
    if (error?.message) return error.message;
    if (error?.data?.message) return error.data.message;
    return 'An unexpected error occurred';
  };

  const getErrorCode = () => {
    if (error?.status) return error.status;
    if (error?.response?.status) return error.response.status;
    return null;
  };

  const errorCode = getErrorCode();
  const errorMessage = getErrorMessage();

  return (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-6 ${className}`}>
      <div className="flex items-start space-x-3">
        <FiAlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-red-900 mb-2">
            {title}
          </h3>
          <p className="text-sm text-red-700 mb-3">
            {errorMessage}
          </p>
          
          {errorCode && (
            <p className="text-xs text-red-600 mb-3">
              Error Code: {errorCode}
            </p>
          )}

          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <FiRefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;

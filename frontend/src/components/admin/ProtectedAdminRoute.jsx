import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../utils/adminAuth';
import { FiShield, FiAlertTriangle } from 'react-icons/fi';

/**
 * ProtectedAdminRoute component - Enhanced admin route protection with permission checking
 */
const ProtectedAdminRoute = ({ 
  children, 
  requiredPermission = null,
  fallbackRoute = '/unauthorized' 
}) => {
  const { user, isAuthenticated, isLoading, isAdmin, hasPermission } = useAdminAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Redirect to unauthorized page if not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6">
          <FiAlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access the admin panel. This area is restricted to administrators only.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => window.history.back()}
              className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Go Back
            </button>
            <a
              href="/"
              className="block w-full px-4 py-2 bg-indigo-600 text-white text-center rounded-md hover:bg-indigo-700 transition-colors"
            >
              Return to Store
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Check specific permission if required
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to={fallbackRoute} replace />;
  }

  // Render children if authenticated and has required permissions
  return children;
};

export default ProtectedAdminRoute;

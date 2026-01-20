import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiShield } from 'react-icons/fi';

/**
 * AdminRoute component - restricts access to admin users only
 * Redirects to unauthorized page if user is not an admin
 */
const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner w-12 h-12 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect to unauthorized page if not admin
  if (user?.role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }

  // Render children if authenticated and is admin
  return children;
};

export default AdminRoute;

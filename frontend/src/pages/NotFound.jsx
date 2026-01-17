import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiSearch } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-primary-200">404</div>
          <div className="text-2xl font-semibold text-gray-900 mt-4">
            Page Not Found
          </div>
        </div>

        {/* Error Message */}
        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
          Don't worry, we'll help you find your way back.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/"
            className="btn btn-primary w-full inline-flex items-center justify-center"
          >
            <FiHome className="w-5 h-5 mr-2" />
            Go to Homepage
          </Link>
          
          <Link
            to="/products"
            className="btn btn-outline w-full inline-flex items-center justify-center"
          >
            <FiSearch className="w-5 h-5 mr-2" />
            Browse Products
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-sm text-gray-500">
          If you believe this is an error, please contact our{' '}
          <Link to="/contact" className="text-primary-600 hover:text-primary-500">
            support team
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

import React from 'react';
import { Link } from 'react-router-dom';
import { FiShield, FiArrowLeft } from 'react-icons/fi';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        {/* Lock Icon */}
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-warning-100 rounded-full flex items-center justify-center">
            <FiShield className="w-12 h-12 text-warning-600" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Access Denied
        </h1>
        
        <p className="text-gray-600 mb-8">
          You don't have permission to access this page. 
          This area is restricted to authorized personnel only.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/"
            className="btn btn-primary w-full inline-flex items-center justify-center"
          >
            <FiArrowLeft className="w-5 h-5 mr-2" />
            Go to Homepage
          </Link>
          
          <Link
            to="/login"
            className="btn btn-outline w-full"
          >
            Sign In with Different Account
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-sm text-gray-500">
          If you believe this is an error, please contact your administrator or{' '}
          <Link to="/contact" className="text-primary-600 hover:text-primary-500">
            support team
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;

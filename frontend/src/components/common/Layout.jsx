import React from 'react';

/**
 * Layout component that provides consistent page structure
 * Wraps page content with proper spacing and container
 */
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen pt-16">
      <div className="container-custom py-8">
        {children}
      </div>
    </div>
  );
};

export default Layout;

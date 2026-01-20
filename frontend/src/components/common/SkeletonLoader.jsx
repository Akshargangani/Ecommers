import React from 'react';

/**
 * SkeletonLoader component - displays skeleton loading states
 * @param {string} variant - 'text', 'avatar', 'card', 'default'
 * @param {string} className - additional CSS classes
 */
const SkeletonLoader = ({ variant = 'default', className = '' }) => {
  const variantClasses = {
    text: 'skeleton-text h-4 w-3/4 rounded',
    avatar: 'skeleton-avatar h-10 w-10 rounded-full',
    card: 'skeleton h-32 w-full rounded',
    default: 'skeleton h-6 w-full rounded'
  };

  return (
    <div className={`${variantClasses[variant]} ${className}`} />
  );
};

export default SkeletonLoader;

import { useAuth } from '../context/AuthContext';

/**
 * Admin authentication utilities and helper functions
 */

/**
 * Check if current user is an admin
 * @param {Object} user - User object from auth context
 * @returns {boolean} - True if user is admin
 */
export const isAdmin = (user) => {
  return user?.role === 'admin';
};

/**
 * Check if current user has specific admin permissions
 * @param {Object} user - User object from auth context
 * @param {string} permission - Permission to check
 * @returns {boolean} - True if user has permission
 */
export const hasAdminPermission = (user, permission) => {
  if (!isAdmin(user)) {
    return false;
  }

  // Define admin permissions based on role
  const adminPermissions = {
    'super_admin': ['read', 'write', 'delete', 'manage_users', 'manage_settings'],
    'admin': ['read', 'write', 'delete'],
    'moderator': ['read', 'write']
  };

  const userPermissions = adminPermissions[user?.adminRole] || adminPermissions['admin'];
  return userPermissions.includes(permission);
};

/**
 * Get admin dashboard permissions
 * @param {Object} user - User object from auth context
 * @returns {Object} - Object containing dashboard permissions
 */
export const getAdminPermissions = (user) => {
  if (!isAdmin(user)) {
    return {
      canViewDashboard: false,
      canManageProducts: false,
      canManageOrders: false,
      canManageUsers: false,
      canViewAnalytics: false,
      canManageSettings: false
    };
  }

  const basePermissions = {
    canViewDashboard: true,
    canManageProducts: hasAdminPermission(user, 'write'),
    canManageOrders: hasAdminPermission(user, 'write'),
    canViewAnalytics: hasAdminPermission(user, 'read'),
    canManageSettings: hasAdminPermission(user, 'manage_settings')
  };

  // Super admin can manage users
  if (user?.adminRole === 'super_admin') {
    basePermissions.canManageUsers = true;
  }

  return basePermissions;
};

/**
 * Custom hook for admin authentication
 * @returns {Object} - Admin auth utilities and state
 */
export const useAdminAuth = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  return {
    user,
    isAuthenticated,
    isLoading,
    isAdmin: isAdmin(user),
    permissions: getAdminPermissions(user),
    hasPermission: (permission) => hasAdminPermission(user, permission)
  };
};

/**
 * Validate admin access to a specific route
 * @param {Object} user - User object from auth context
 * @param {string} route - Route to validate
 * @returns {boolean} - True if user can access route
 */
export const validateAdminRoute = (user, route) => {
  if (!isAdmin(user)) {
    return false;
  }

  const routePermissions = {
    '/admin': 'read',
    '/admin/products': 'write',
    '/admin/orders': 'write',
    '/admin/users': 'manage_users',
    '/admin/analytics': 'read',
    '/admin/settings': 'manage_settings'
  };

  const requiredPermission = routePermissions[route];
  if (!requiredPermission) {
    return true; // Allow access to routes without specific permissions
  }

  return hasAdminPermission(user, requiredPermission);
};

/**
 * Get admin user display name
 * @param {Object} user - User object from auth context
 * @returns {string} - Display name for admin user
 */
export const getAdminDisplayName = (user) => {
  if (!user) return 'Unknown Admin';
  
  if (user.name) {
    return user.name;
  }
  
  if (user.email) {
    return user.email.split('@')[0];
  }
  
  return 'Admin User';
};

/**
 * Format admin role for display
 * @param {string} role - Admin role
 * @returns {string} - Formatted role name
 */
export const formatAdminRole = (role) => {
  const roleMap = {
    'super_admin': 'Super Admin',
    'admin': 'Administrator',
    'moderator': 'Moderator'
  };
  
  return roleMap[role] || 'Administrator';
};

/**
 * Check if admin session is still valid
 * @param {Object} user - User object from auth context
 * @param {string} token - JWT token
 * @returns {boolean} - True if session is valid
 */
export const isSessionValid = (user, token) => {
  if (!user || !token) {
    return false;
  }

  try {
    // Decode JWT token to check expiration
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    
    return payload.exp > currentTime;
  } catch (error) {
    console.error('Error validating session:', error);
    return false;
  }
};

/**
 * Redirect non-admin users to appropriate page
 * @param {Object} user - User object from auth context
 * @param {Function} navigate - React Router navigate function
 * @param {string} fallbackRoute - Route to redirect to if not admin
 */
export const redirectIfNotAdmin = (user, navigate, fallbackRoute = '/') => {
  if (!isAdmin(user)) {
    navigate(fallbackRoute);
    return false;
  }
  return true;
};

import React, { useState, useEffect } from 'react';
import { FiBell, FiCheck, FiX, FiClock, FiUser, FiShoppingCart, FiAlertTriangle } from 'react-icons/fi';

/**
 * AdminNotifications component - Manage system notifications and alerts
 */
const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'New Order Received',
      message: 'Order #12345 has been placed by John Doe',
      timestamp: '2024-02-10T10:30:00Z',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'inventory',
      title: 'Low Stock Alert',
      message: 'Wireless Gaming Mouse is running low on stock (5 units remaining)',
      timestamp: '2024-02-10T09:15:00Z',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'system',
      title: 'System Update Available',
      message: 'A new version of the admin panel is available for installation',
      timestamp: '2024-02-10T08:00:00Z',
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'user',
      title: 'New User Registration',
      message: 'Jane Smith has registered a new account',
      timestamp: '2024-02-10T07:45:00Z',
      read: true,
      priority: 'low'
    },
    {
      id: 5,
      type: 'payment',
      title: 'Payment Processing Alert',
      message: 'Payment for order #12344 is pending verification',
      timestamp: '2024-02-10T06:30:00Z',
      read: false,
      priority: 'high'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate fetching notifications
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    if (filter === 'high') return notification.priority === 'high';
    if (filter === 'order') return notification.type === 'order';
    if (filter === 'inventory') return notification.type === 'inventory';
    if (filter === 'system') return notification.type === 'system';
    if (filter === 'user') return notification.type === 'user';
    if (filter === 'payment') return notification.type === 'payment';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order':
        return <FiShoppingCart className="h-5 w-5 text-blue-500" />;
      case 'inventory':
        return <FiAlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'system':
        return <FiBell className="h-5 w-5 text-gray-500" />;
      case 'user':
        return <FiUser className="h-5 w-5 text-green-500" />;
      case 'payment':
        return <FiBell className="h-5 w-5 text-red-500" />;
      default:
        return <FiBell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      case 'low':
        return 'border-gray-200 bg-gray-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffMins > 0) {
      return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
        <div className="flex items-center space-x-4">
          <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
            {unreadCount} unread
          </span>
          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="text-sm text-indigo-600 hover:text-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Mark all as read
          </button>
          <button
            onClick={clearAllNotifications}
            className="text-sm text-red-600 hover:text-red-500"
          >
            Clear all
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'all', label: 'All', count: notifications.length },
              { id: 'unread', label: 'Unread', count: unreadCount },
              { id: 'high', label: 'High Priority', count: notifications.filter(n => n.priority === 'high').length },
              { id: 'order', label: 'Orders', count: notifications.filter(n => n.type === 'order').length },
              { id: 'inventory', label: 'Inventory', count: notifications.filter(n => n.type === 'inventory').length },
              { id: 'system', label: 'System', count: notifications.filter(n => n.type === 'system').length },
              { id: 'user', label: 'Users', count: notifications.filter(n => n.type === 'user').length },
              { id: 'payment', label: 'Payments', count: notifications.filter(n => n.type === 'payment').length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  filter === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-2 bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <FiBell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No notifications found</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-lg shadow p-4 border-l-4 ${getPriorityColor(notification.priority)} ${
                !notification.read ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`p-2 rounded-full ${
                    notification.read ? 'bg-gray-100' : 'bg-indigo-100'
                  }`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-2">
                      <FiClock className="h-3 w-3 mr-1" />
                      {formatTimestamp(notification.timestamp)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-indigo-600 hover:text-indigo-500 text-sm"
                    >
                      Mark as read
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="text-red-600 hover:text-red-500 text-sm"
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminNotifications;

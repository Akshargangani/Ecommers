import React, { useState } from 'react';
import { FiUser, FiShoppingBag, FiHeart, FiSettings, FiLogOut, FiChevronRight } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProfileHeader from './ProfileHeader';
import OrderHistory from './OrderHistory';

/**
 * UserProfile component - Complete user profile page
 */
const UserProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [userProfile, setUserProfile] = useState(user);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'orders', label: 'Orders', icon: FiShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: FiHeart },
    { id: 'settings', label: 'Settings', icon: FiSettings }
  ];

  const handleProfileUpdate = (updatedData) => {
    setUserProfile(prev => ({ ...prev, ...updatedData }));
    // In real app, this would update the user in AuthContext
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  const renderProfileTab = () => (
    <ProfileHeader user={userProfile} onUpdate={handleProfileUpdate} />
  );

  const renderOrdersTab = () => (
    <OrderHistory />
  );

  const renderWishlistTab = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <div className="text-center">
        <FiHeart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Your Wishlist</h3>
        <p className="text-gray-600 mb-6">
          Save your favorite items for later. Your wishlist is currently empty.
        </p>
        <button className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700">
          Browse Products
        </button>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      {/* Account Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Notifications</label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="text-indigo-600 focus:ring-indigo-500" />
                <span className="text-sm text-gray-700">Order updates</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="text-indigo-600 focus:ring-indigo-500" />
                <span className="text-sm text-gray-700">Promotional emails</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="text-indigo-600 focus:ring-indigo-500" />
                <span className="text-sm text-gray-700">Newsletter</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500">
              <option>USD - US Dollar</option>
              <option>EUR - Euro</option>
              <option>GBP - British Pound</option>
            </select>
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
        <div className="space-y-4">
          <label className="flex items-center space-x-2">
            <input type="checkbox" defaultChecked className="text-indigo-600 focus:ring-indigo-500" />
            <span className="text-sm text-gray-700">Profile visible to other users</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" defaultChecked className="text-indigo-600 focus:ring-indigo-500" />
            <span className="text-sm text-gray-700">Show order history</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="text-indigo-600 focus:ring-indigo-500" />
            <span className="text-sm text-gray-700">Share purchase data for recommendations</span>
          </label>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-lg shadow-sm border border-red-200 p-6">
        <h3 className="text-lg font-semibold text-red-900 mb-4">Danger Zone</h3>
        <div className="space-y-4">
          <button className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50">
            Delete Account
          </button>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            <FiLogOut className="h-4 w-4 mr-2 inline" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'orders':
        return renderOrdersTab();
      case 'wishlist':
        return renderWishlistTab();
      case 'settings':
        return renderSettingsTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">My Account</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-4 w-4" />
                        <span>{tab.label}</span>
                      </div>
                      <FiChevronRight className="h-4 w-4" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

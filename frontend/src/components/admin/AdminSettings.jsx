import React, { useState, useEffect } from 'react';
import { FiSettings, FiSave, FiMail, FiBell, FiLock, FiGlobe, FiCreditCard, FiPackage, FiShield, FiUser, FiDatabase } from 'react-icons/fi';
import { toast } from 'react-toastify';

/**
 * AdminSettings component - Settings management for admin
 */
const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    general: {
      storeName: 'ShopHub Ecommerce',
      storeEmail: 'admin@shophub.com',
      storePhone: '+1 234-567-8900',
      storeAddress: '123 Business Ave, Commerce City, NY 10001',
      currency: 'USD',
      timezone: 'America/New_York',
      language: 'en'
    },
    email: {
      smtpHost: 'smtp.gmail.com',
      smtpPort: 587,
      smtpUsername: 'noreply@shophub.com',
      smtpPassword: '••••••••',
      emailFrom: 'noreply@shophub.com',
      emailFromName: 'ShopHub'
    },
    notifications: {
      orderConfirmation: true,
      orderStatusUpdate: true,
      lowStockAlert: true,
      newUserRegistration: true,
      adminAlerts: true,
      marketingEmails: false
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordMinLength: 8,
      requireStrongPassword: true,
      loginAttempts: 5,
      lockoutDuration: 15
    },
    payment: {
      stripeEnabled: true,
      stripePublicKey: 'pk_test_•••••••••••••••••••••••••',
      paypalEnabled: true,
      paypalClientId: '••••••••••••••••••••••••••••••••',
      codEnabled: true
    },
    shipping: {
      freeShippingThreshold: 50,
      standardShippingRate: 5.99,
      expressShippingRate: 12.99,
      processingTime: '1-2 business days'
    }
  });

  const tabs = [
    { id: 'general', name: 'General', icon: FiSettings },
    { id: 'email', name: 'Email', icon: FiMail },
    { id: 'notifications', name: 'Notifications', icon: FiBell },
    { id: 'security', name: 'Security', icon: FiLock },
    { id: 'payment', name: 'Payment', icon: FiCreditCard },
    { id: 'shipping', name: 'Shipping', icon: FiPackage }
  ];

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Settings are already set with default values
    } catch (error) {
      toast.error('Failed to fetch settings');
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
      console.error('Error saving settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleToggleChange = (category, field) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: !prev[category][field]
      }
    }));
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Store Name</label>
          <input
            type="text"
            value={settings.general.storeName}
            onChange={(e) => handleInputChange('general', 'storeName', e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Store Email</label>
          <input
            type="email"
            value={settings.general.storeEmail}
            onChange={(e) => handleInputChange('general', 'storeEmail', e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Store Phone</label>
          <input
            type="tel"
            value={settings.general.storePhone}
            onChange={(e) => handleInputChange('general', 'storePhone', e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Store Address</label>
          <input
            type="text"
            value={settings.general.storeAddress}
            onChange={(e) => handleInputChange('general', 'storeAddress', e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Currency</label>
          <select
            value={settings.general.currency}
            onChange={(e) => handleInputChange('general', 'currency', e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="JPY">JPY - Japanese Yen</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Timezone</label>
          <select
            value={settings.general.timezone}
            onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">SMTP Host</label>
          <input
            type="text"
            value={settings.email.smtpHost}
            onChange={(e) => handleInputChange('email', 'smtpHost', e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">SMTP Port</label>
          <input
            type="number"
            value={settings.email.smtpPort}
            onChange={(e) => handleInputChange('email', 'smtpPort', parseInt(e.target.value))}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">SMTP Username</label>
          <input
            type="text"
            value={settings.email.smtpUsername}
            onChange={(e) => handleInputChange('email', 'smtpUsername', e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">SMTP Password</label>
          <input
            type="password"
            value={settings.email.smtpPassword}
            onChange={(e) => handleInputChange('email', 'smtpPassword', e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">From Email</label>
          <input
            type="email"
            value={settings.email.emailFrom}
            onChange={(e) => handleInputChange('email', 'emailFrom', e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">From Name</label>
          <input
            type="text"
            value={settings.email.emailFromName}
            onChange={(e) => handleInputChange('email', 'emailFromName', e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <FiMail className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Email Configuration</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>Configure your SMTP settings to enable email notifications for orders, user registrations, and system alerts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        {Object.entries(settings.notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </label>
              <p className="text-sm text-gray-500">
                {key === 'orderConfirmation' && 'Send email when order is placed'}
                {key === 'orderStatusUpdate' && 'Send email when order status changes'}
                {key === 'lowStockAlert' && 'Alert when product stock is low'}
                {key === 'newUserRegistration' && 'Notify when new user registers'}
                {key === 'adminAlerts' && 'Send critical system alerts to admins'}
                {key === 'marketingEmails' && 'Send promotional emails to customers'}
              </p>
            </div>
            <button
              onClick={() => handleToggleChange('notifications', key)}
              className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                value ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            >
              <span className={`translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                value ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">Two-Factor Authentication</label>
            <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
          </div>
          <button
            onClick={() => handleToggleChange('security', 'twoFactorAuth')}
            className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              settings.security.twoFactorAuth ? 'bg-indigo-600' : 'bg-gray-200'
            }`}
          >
            <span className={`translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
              settings.security.twoFactorAuth ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Session Timeout (minutes)</label>
            <input
              type="number"
              value={settings.security.sessionTimeout}
              onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password Minimum Length</label>
            <input
              type="number"
              value={settings.security.passwordMinLength}
              onChange={(e) => handleInputChange('security', 'passwordMinLength', parseInt(e.target.value))}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Max Login Attempts</label>
            <input
              type="number"
              value={settings.security.loginAttempts}
              onChange={(e) => handleInputChange('security', 'loginAttempts', parseInt(e.target.value))}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Lockout Duration (minutes)</label>
            <input
              type="number"
              value={settings.security.lockoutDuration}
              onChange={(e) => handleInputChange('security', 'lockoutDuration', parseInt(e.target.value))}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">Require Strong Password</label>
            <p className="text-sm text-gray-500">Passwords must contain uppercase, lowercase, numbers, and special characters</p>
          </div>
          <button
            onClick={() => handleToggleChange('security', 'requireStrongPassword')}
            className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              settings.security.requireStrongPassword ? 'bg-indigo-600' : 'bg-gray-200'
            }`}
          >
            <span className={`translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
              settings.security.requireStrongPassword ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">Stripe Payment</label>
            <p className="text-sm text-gray-500">Enable credit card payments via Stripe</p>
          </div>
          <button
            onClick={() => handleToggleChange('payment', 'stripeEnabled')}
            className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              settings.payment.stripeEnabled ? 'bg-indigo-600' : 'bg-gray-200'
            }`}
          >
            <span className={`translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
              settings.payment.stripeEnabled ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>
        
        {settings.payment.stripeEnabled && (
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Stripe Public Key</label>
              <input
                type="text"
                value={settings.payment.stripePublicKey}
                onChange={(e) => handleInputChange('payment', 'stripePublicKey', e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">PayPal Payment</label>
            <p className="text-sm text-gray-500">Enable PayPal payments</p>
          </div>
          <button
            onClick={() => handleToggleChange('payment', 'paypalEnabled')}
            className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              settings.payment.paypalEnabled ? 'bg-indigo-600' : 'bg-gray-200'
            }`}
          >
            <span className={`translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
              settings.payment.paypalEnabled ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>
        
        {settings.payment.paypalEnabled && (
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">PayPal Client ID</label>
              <input
                type="text"
                value={settings.payment.paypalClientId}
                onChange={(e) => handleInputChange('payment', 'paypalClientId', e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">Cash on Delivery</label>
            <p className="text-sm text-gray-500">Enable cash on delivery option</p>
          </div>
          <button
            onClick={() => handleToggleChange('payment', 'codEnabled')}
            className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              settings.payment.codEnabled ? 'bg-indigo-600' : 'bg-gray-200'
            }`}
          >
            <span className={`translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
              settings.payment.codEnabled ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderShippingSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Free Shipping Threshold ($)</label>
          <input
            type="number"
            step="0.01"
            value={settings.shipping.freeShippingThreshold}
            onChange={(e) => handleInputChange('shipping', 'freeShippingThreshold', parseFloat(e.target.value))}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Standard Shipping Rate ($)</label>
          <input
            type="number"
            step="0.01"
            value={settings.shipping.standardShippingRate}
            onChange={(e) => handleInputChange('shipping', 'standardShippingRate', parseFloat(e.target.value))}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Express Shipping Rate ($)</label>
          <input
            type="number"
            step="0.01"
            value={settings.shipping.expressShippingRate}
            onChange={(e) => handleInputChange('shipping', 'expressShippingRate', parseFloat(e.target.value))}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Processing Time</label>
          <input
            type="text"
            value={settings.shipping.processingTime}
            onChange={(e) => handleInputChange('shipping', 'processingTime', e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'email':
        return renderEmailSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'payment':
        return renderPaymentSettings();
      case 'shipping':
        return renderShippingSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your store configuration and preferences
          </p>
        </div>
        <button
          onClick={handleSaveSettings}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          <FiSave className="mr-2 h-4 w-4" />
          {loading ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {/* Settings Tabs */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>

      {/* System Information */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">System Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Version:</span>
              <span className="ml-2 text-gray-900">1.0.0</span>
            </div>
            <div>
              <span className="text-gray-500">Last Backup:</span>
              <span className="ml-2 text-gray-900">January 9, 2024 at 2:30 PM</span>
            </div>
            <div>
              <span className="text-gray-500">Database Size:</span>
              <span className="ml-2 text-gray-900">245.7 MB</span>
            </div>
            <div>
              <span className="text-gray-500">Storage Used:</span>
              <span className="ml-2 text-gray-900">1.2 GB / 10 GB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;

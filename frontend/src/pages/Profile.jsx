import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiEdit2, FiSave, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, updateProfile, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast.error('Name and email are required');
      return;
    }

    try {
      const result = await updateProfile(formData);
      if (result.success) {
        toast.success('Profile updated successfully!');
        setIsEditing(false);
      } else {
        toast.error(result.error?.message || 'Failed to update profile');
      }
    } catch (error) {
      toast.error('An error occurred while updating profile');
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="container-custom py-16">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container-custom py-16">
        <div className="text-center">
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="card-header flex justify-between items-center">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-outline btn-sm inline-flex items-center"
                  >
                    <FiEdit2 className="w-4 h-4 mr-2" />
                    Edit
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCancel}
                      className="btn btn-outline btn-sm inline-flex items-center"
                    >
                      <FiX className="w-4 h-4 mr-2" />
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="btn btn-primary btn-sm inline-flex items-center"
                    >
                      <FiSave className="w-4 h-4 mr-2" />
                      Save
                    </button>
                  </div>
                )}
              </div>

              <div className="card-body">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                      <FiUser className="w-10 h-10 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.role}</p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiUser className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className={`input pl-10 ${!isEditing ? 'bg-gray-50' : ''}`}
                          placeholder="Your full name"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiMail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className={`input pl-10 ${!isEditing ? 'bg-gray-50' : ''}`}
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiPhone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className={`input pl-10 ${!isEditing ? 'bg-gray-50' : ''}`}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    {/* Role (Read-only) */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account Type
                      </label>
                      <input
                        type="text"
                        value={user.role}
                        disabled
                        className="input bg-gray-50 capitalize"
                      />
                    </div>
                  </div>

                  {/* Account Status */}
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Account Status</p>
                        <p className="text-sm text-gray-600">
                          Member since {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="badge badge-success">
                        Active
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Addresses Section */}
            <div className="card mt-8">
              <div className="card-header">
                <h3 className="text-lg font-semibold">Shipping Addresses</h3>
              </div>
              <div className="card-body">
                {user.addresses && user.addresses.length > 0 ? (
                  <div className="space-y-4">
                    {user.addresses.map((address, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900 capitalize">
                              {address.type} {address.isDefault && '(Default)'}
                            </p>
                            <p className="text-gray-600 mt-1">
                              {address.street}<br />
                              {address.city}, {address.state} {address.zipCode}<br />
                              {address.country}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    No shipping addresses added yet.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Actions */}
            <div className="card mb-6">
              <div className="card-header">
                <h3 className="text-lg font-semibold">Quick Actions</h3>
              </div>
              <div className="card-body space-y-3">
                <a
                  href="/orders"
                  className="block w-full btn btn-outline text-left"
                >
                  View Order History
                </a>
                <a
                  href="/cart"
                  className="block w-full btn btn-outline text-left"
                >
                  Shopping Cart
                </a>
                <a
                  href="/wishlist"
                  className="block w-full btn btn-outline text-left"
                >
                  Wishlist
                </a>
              </div>
            </div>

            {/* Account Stats */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold">Account Stats</h3>
              </div>
              <div className="card-body space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Orders</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Spent</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saved Addresses</span>
                  <span className="font-medium">{user.addresses?.length || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

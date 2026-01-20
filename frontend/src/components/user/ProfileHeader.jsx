import React, { useState } from 'react';
import { FiCamera, FiEdit2, FiUser, FiMail, FiPhone, FiMapPin, FiCalendar } from 'react-icons/fi';
import { toast } from 'react-toastify';

/**
 * ProfileHeader component - User profile header with avatar and basic info
 */
const ProfileHeader = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    bio: user?.bio || ''
  });

  const handleEdit = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      bio: user?.bio || ''
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onUpdate(formData);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Profile update error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Simulate avatar upload
      toast.success('Avatar uploaded successfully!');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Cover Background */}
      <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <button
          onClick={handleAvatarUpload}
          className="absolute bottom-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 p-2 rounded-full shadow-lg transition-all"
        >
          <FiCamera className="h-4 w-4" />
        </button>
      </div>

      {/* Profile Content */}
      <div className="px-6 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
          {/* Avatar */}
          <div className="flex-shrink-0 -mt-12 sm:-mt-16">
            <div className="relative">
              <div className="w-24 h-24 bg-gray-200 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <FiUser className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0 mt-4 sm:mt-0">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="Tell us about yourself..."
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {user?.name || 'User Name'}
                  </h1>
                  <button
                    onClick={handleEdit}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FiEdit2 className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <FiMail className="h-4 w-4 mr-2" />
                    {user?.email || 'email@example.com'}
                  </div>
                  
                  {user?.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <FiPhone className="h-4 w-4 mr-2" />
                      {user.phone}
                    </div>
                  )}
                  
                  {user?.address && (
                    <div className="flex items-center text-sm text-gray-600">
                      <FiMapPin className="h-4 w-4 mr-2" />
                      {user.address}
                    </div>
                  )}
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <FiCalendar className="h-4 w-4 mr-2" />
                    Member since {formatDate(user?.joinDate)}
                  </div>
                  
                  {user?.bio && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{user.bio}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;

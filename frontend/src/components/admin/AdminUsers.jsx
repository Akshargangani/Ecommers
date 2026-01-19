import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiEdit2, FiTrash2, FiUser, FiMail, FiCalendar, FiShoppingCart, FiDollarSign, FiShield, FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'react-toastify';

/**
 * AdminUsers component - User management interface for admin
 */
const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    status: 'active',
    phone: '',
    address: ''
  });

  const roles = ['user', 'admin', 'super_admin'];
  const statuses = ['active', 'inactive', 'suspended'];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUsers = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          role: 'user',
          status: 'active',
          joinDate: '2024-01-01',
          lastLogin: '2024-01-09',
          totalOrders: 12,
          totalSpent: 1299.88,
          phone: '+1 234-567-8900',
          address: '123 Main St, New York, NY 10001'
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'user',
          status: 'active',
          joinDate: '2024-01-02',
          lastLogin: '2024-01-08',
          totalOrders: 8,
          totalSpent: 899.92,
          phone: '+1 234-567-8901',
          address: '456 Oak Ave, Los Angeles, CA 90001'
        },
        {
          id: 3,
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin',
          status: 'active',
          joinDate: '2023-12-01',
          lastLogin: '2024-01-09',
          totalOrders: 0,
          totalSpent: 0,
          phone: '+1 234-567-8902',
          address: '789 Pine Rd, Chicago, IL 60007'
        },
        {
          id: 4,
          name: 'Bob Johnson',
          email: 'bob@example.com',
          role: 'user',
          status: 'inactive',
          joinDate: '2023-11-15',
          lastLogin: '2024-01-01',
          totalOrders: 5,
          totalSpent: 449.95,
          phone: '+1 234-567-8903',
          address: '321 Elm St, Houston, TX 77001'
        },
        {
          id: 5,
          name: 'Alice Brown',
          email: 'alice@example.com',
          role: 'user',
          status: 'suspended',
          joinDate: '2023-10-20',
          lastLogin: '2023-12-15',
          totalOrders: 3,
          totalSpent: 299.97,
          phone: '+1 234-567-8904',
          address: '654 Maple Dr, Phoenix, AZ 85001'
        }
      ];
      
      setUsers(mockUsers);
    } catch (error) {
      toast.error('Failed to fetch users');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: users.length + 1,
        ...formData,
        joinDate: new Date().toISOString().split('T')[0],
        lastLogin: null,
        totalOrders: 0,
        totalSpent: 0
      };
      
      setUsers([...users, newUser]);
      setShowUserModal(false);
      resetForm();
      toast.success('User added successfully');
    } catch (error) {
      toast.error('Failed to add user');
      console.error('Error adding user:', error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUsers = users.map(user =>
        user.id === selectedUser.id ? { ...user, ...formData } : user
      );
      
      setUsers(updatedUsers);
      setShowEditModal(false);
      resetForm();
      toast.success('User updated successfully');
    } catch (error) {
      toast.error('Failed to update user');
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setUsers(users.filter(user => user.id !== userId));
        toast.success('User deleted successfully');
      } catch (error) {
        toast.error('Failed to delete user');
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUsers = users.map(user =>
        user.id === userId ? { ...user, status: newStatus } : user
      );
      
      setUsers(updatedUsers);
      toast.success(`User status updated to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update user status');
      console.error('Error updating user status:', error);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUsers = users.map(user =>
        user.id === userId ? { ...user, role: newRole } : user
      );
      
      setUsers(updatedUsers);
      toast.success(`User role updated to ${newRole}`);
    } catch (error) {
      toast.error('Failed to update user role');
      console.error('Error updating user role:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      role: 'user',
      status: 'active',
      phone: '',
      address: ''
    });
    setSelectedUser(null);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      phone: user.phone,
      address: user.address
    });
    setShowEditModal(true);
  };

  const openViewModal = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role) => {
    switch (role) {
      case 'super_admin':
        return 'bg-purple-100 text-purple-800';
      case 'admin':
        return 'bg-indigo-100 text-indigo-800';
      case 'user':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUserStats = () => {
    return {
      total: users.length,
      active: users.filter(u => u.status === 'active').length,
      inactive: users.filter(u => u.status === 'inactive').length,
      suspended: users.filter(u => u.status === 'suspended').length,
      admins: users.filter(u => u.role === 'admin' || u.role === 'super_admin').length,
      totalRevenue: users.reduce((sum, u) => sum + u.totalSpent, 0)
    };
  };

  const stats = getUserStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        <button
          onClick={() => setShowUserModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <FiUser className="mr-2 h-4 w-4" />
          Add User
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <FiUser className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                  <dd className="text-lg font-semibold text-gray-900">{stats.total}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <FiShield className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Users</dt>
                  <dd className="text-lg font-semibold text-gray-900">{stats.active}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                <FiDollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                  <dd className="text-lg font-semibold text-gray-900">${stats.totalRevenue.toLocaleString()}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <FiFilter className="h-5 w-5 text-gray-400" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="all">All Roles</option>
              {roles.map(role => (
                <option key={role} value={role}>{role.replace('_', ' ').charAt(0).toUpperCase() + role.replace('_', ' ').slice(1)}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="all">All Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredUsers.map((user) => (
            <li key={user.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <FiUser className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                          <FiShield className="h-3 w-3 mr-1" />
                          {user.role.replace('_', ' ').charAt(0).toUpperCase() + user.role.replace('_', ' ').slice(1)}
                        </span>
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <div className="mt-1 flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <FiCalendar className="h-3 w-3 mr-1" />
                          Joined: {user.joinDate}
                        </span>
                        <span className="flex items-center">
                          <FiShoppingCart className="h-3 w-3 mr-1" />
                          {user.totalOrders} orders
                        </span>
                        <span className="flex items-center">
                          <FiDollarSign className="h-3 w-3 mr-1" />
                          ${user.totalSpent}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openViewModal(user)}
                      className="p-1 text-gray-400 hover:text-indigo-600"
                      title="View User Details"
                    >
                      <FiEye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => openEditModal(user)}
                      className="p-1 text-gray-400 hover:text-indigo-600"
                      title="Edit User"
                    >
                      <FiEdit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-1 text-gray-400 hover:text-red-600"
                      title="Delete User"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowUserModal(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">User Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Personal Information</h4>
                    <dl className="space-y-1 text-sm">
                      <div>
                        <dt className="text-gray-500">Name:</dt>
                        <dd className="font-medium">{selectedUser.name}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-500">Email:</dt>
                        <dd>{selectedUser.email}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-500">Phone:</dt>
                        <dd>{selectedUser.phone}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-500">Address:</dt>
                        <dd>{selectedUser.address}</dd>
                      </div>
                    </dl>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Account Information</h4>
                    <dl className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Role:</dt>
                        <dd className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(selectedUser.role)}`}>
                          {selectedUser.role.replace('_', ' ').charAt(0).toUpperCase() + selectedUser.role.replace('_', ' ').slice(1)}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Status:</dt>
                        <dd className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedUser.status)}`}>
                          {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Join Date:</dt>
                        <dd>{selectedUser.joinDate}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Last Login:</dt>
                        <dd>{selectedUser.lastLogin || 'Never'}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Order Statistics</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-gray-50 p-3 rounded">
                      <dt className="text-gray-500">Total Orders</dt>
                      <dd className="text-lg font-semibold">{selectedUser.totalOrders}</dd>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <dt className="text-gray-500">Total Spent</dt>
                      <dd className="text-lg font-semibold">${selectedUser.totalSpent}</dd>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => setShowUserModal(false)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit User Modal */}
      {(showUserModal && !selectedUser) || showEditModal ? (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => {
              setShowUserModal(false);
              setShowEditModal(false);
            }}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  {showEditModal ? 'Edit User' : 'Add New User'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Role</label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        {roles.map(role => (
                          <option key={role} value={role}>{role.replace('_', ' ').charAt(0).toUpperCase() + role.replace('_', ' ').slice(1)}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        {statuses.map(status => (
                          <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      rows={2}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={showEditModal ? handleUpdateUser : handleAddUser}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {showEditModal ? 'Update User' : 'Add User'}
                </button>
                <button
                  onClick={() => {
                    setShowUserModal(false);
                    setShowEditModal(false);
                  }}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AdminUsers;

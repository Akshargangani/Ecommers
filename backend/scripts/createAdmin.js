const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

/**
 * Create admin user for testing
 * This script creates an admin user with predefined credentials
 */
const createAdminUser = async () => {
  try {
    // Check if admin user already exists
    const adminExists = await User.findOne({ email: 'admin@shophub.com' });
    
    if (adminExists) {
      console.log('Admin user already exists');
      return;
    }

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@shophub.com',
      password: 'admin123',
      role: 'admin',
      phone: '+1234567890'
    });

    console.log('Admin user created successfully:');
    console.log(`Email: ${adminUser.email}`);
    console.log(`Password: admin123`);
    console.log(`Role: ${adminUser.role}`);
    
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

module.exports = createAdminUser;

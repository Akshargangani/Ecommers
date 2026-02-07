require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin exists
    const adminExists = await User.findOne({ email: 'admin@shophub.com' });
    
    if (adminExists) {
      console.log('Admin user already exists');
      console.log('Email:', adminExists.email);
      console.log('Role:', adminExists.role);
      await mongoose.disconnect();
      return;
    }

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@shophub.com',
      password: 'admin123',
      role: 'admin',
      phone: '+1234567890'
    });

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email:', admin.email);
    console.log('🔑 Password: admin123');
    console.log('👤 Role:', admin.role);
    
  } catch (error) {
    console.error('❌ Error creating admin:', error);
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();

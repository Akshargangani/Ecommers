const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');
require('dotenv').config();

// Sample data
const sampleUsers = [
  {
    name: 'Admin User',
    email: 'admin@ecommerce.com',
    password: 'admin123',
    role: 'admin',
    isActive: true
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user',
    isActive: true
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    role: 'user',
    isActive: true
  }
];

const sampleProducts = [
  {
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
    price: 299.99,
    discountedPrice: 249.99,
    category: 'electronics',
    subcategory: 'audio',
    brand: 'TechBrand',
    sku: 'WH-001',
    stock: 15,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
        alt: 'Wireless Headphones',
        isMain: true
      }
    ],
    features: [
      'Active Noise Cancellation',
      '40-hour battery life',
      'Bluetooth 5.0',
      'Premium sound quality'
    ],
    specifications: {
      'Connectivity': 'Bluetooth 5.0',
      'Battery': '40 hours',
      'Weight': '250g',
      'Color': 'Black'
    },
    tags: ['wireless', 'bluetooth', 'noise-cancelling'],
    isNew: true,
    isFeatured: true,
    isActive: true,
    rating: 4.5,
    reviews: []
  },
  {
    name: 'Smart Watch Pro',
    description: 'Advanced smartwatch with health tracking and fitness features.',
    price: 349.99,
    discountedPrice: 299.99,
    category: 'electronics',
    subcategory: 'wearables',
    brand: 'TechBrand',
    sku: 'SW-002',
    stock: 8,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1523275335684-5f3b0f2d7c5e?w=400&h=300&fit=crop',
        alt: 'Smart Watch',
        isMain: true
      }
    ],
    features: [
      'Heart rate monitoring',
      'GPS tracking',
      'Water resistant',
      '7-day battery life'
    ],
    specifications: {
      'Display': '1.4" AMOLED',
      'Battery': '7 days',
      'Water Resistance': 'IP68',
      'Compatibility': 'iOS & Android'
    },
    tags: ['smartwatch', 'fitness', 'health'],
    isNew: false,
    isFeatured: true,
    isActive: true,
    rating: 4.3,
    reviews: []
  },
  {
    name: 'Professional Running Shoes',
    description: 'Comfortable running shoes designed for performance and durability.',
    price: 129.99,
    discountedPrice: 99.99,
    category: 'other',
    subcategory: 'footwear',
    brand: 'SportTech',
    sku: 'RS-003',
    stock: 25,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
        alt: 'Running Shoes',
        isMain: true
      }
    ],
    features: [
      'Breathable mesh upper',
      'Cushioned midsole',
      'Durable outsole',
      'Lightweight design'
    ],
    specifications: {
      'Material': 'Mesh & Rubber',
      'Weight': '280g',
      'Available Sizes': '7-12',
      'Color': 'Blue/Black'
    },
    tags: ['running', 'athletic', 'comfortable'],
    isNew: true,
    isFeatured: false,
    isActive: true,
    rating: 4.7,
    reviews: []
  },
  {
    name: 'Ergonomic Laptop Stand',
    description: 'Adjustable laptop stand for better ergonomics and productivity.',
    price: 79.99,
    category: 'other',
    subcategory: 'accessories',
    brand: 'OfficePro',
    sku: 'LS-004',
    stock: 30,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
        alt: 'Laptop Stand',
        isMain: true
      }
    ],
    features: [
      'Adjustable height',
      'Sturdy construction',
      'Cable management',
      'Non-slip base'
    ],
    specifications: {
      'Material': 'Aluminum',
      'Height Range': '2-16 inches',
      'Weight Capacity': '20kg',
      'Compatibility': 'All laptops'
    },
    tags: ['ergonomic', 'adjustable', 'office'],
    isNew: false,
    isFeatured: false,
    isActive: true,
    rating: 4.6,
    reviews: []
  },
  {
    name: 'Wireless Gaming Mouse',
    description: 'High-precision gaming mouse with customizable RGB lighting.',
    price: 69.99,
    discountedPrice: 54.99,
    category: 'electronics',
    subcategory: 'gaming',
    brand: 'GameGear',
    sku: 'GM-005',
    stock: 18,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1597872200969-2b65d56fb5b0?w=400&h=300&fit=crop',
        alt: 'Gaming Mouse',
        isMain: true
      }
    ],
    features: [
      '16000 DPI sensor',
      'RGB lighting',
      'Programmable buttons',
      'Wireless charging'
    ],
    specifications: {
      'DPI': '16000',
      'Buttons': '6 programmable',
      'Battery': '40 hours',
      'Connection': '2.4GHz Wireless'
    },
    tags: ['gaming', 'wireless', 'rgb'],
    isNew: true,
    isFeatured: true,
    isActive: true,
    rating: 4.4,
    reviews: []
  }
];

const sampleCategories = [
  {
    name: 'Electronics',
    slug: 'electronics',
    description: 'Gadgets, devices, and tech accessories',
    icon: '💻',
    productCount: 156,
    isActive: true
  },
  {
    name: 'Sports',
    slug: 'sports',
    description: 'Equipment and gear for active lifestyle',
    icon: '⚽',
    productCount: 98,
    isActive: true
  },
  {
    name: 'Office',
    slug: 'office',
    description: 'Everything for your home and garden',
    icon: '🏠',
    productCount: 189,
    isActive: true
  }
];

// Connect to database and seed data
const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB successfully!');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});

    // Seed users
    console.log('Seeding users...');
    for (const userData of sampleUsers) {
      const user = new User(userData);
      await user.save();
      console.log(`Created user: ${user.email}`);
    }

    // Seed categories
    console.log('Seeding categories...');
    for (const categoryData of sampleCategories) {
      const category = new Category(categoryData);
      await category.save();
      console.log(`Created category: ${category.name}`);
    }

    // Seed products
    console.log('Seeding products...');
    for (const productData of sampleProducts) {
      const product = new Product(productData);
      await product.save();
      console.log(`Created product: ${product.name}`);
    }

    console.log('Database seeded successfully!');
    console.log('\n=== LOGIN CREDENTIALS ===');
    console.log('Admin Email: admin@ecommerce.com');
    console.log('Admin Password: admin123');
    console.log('\nUser Email: john@example.com');
    console.log('User Password: password123');
    console.log('\nUser Email: jane@example.com');
    console.log('User Password: password123');
    console.log('========================');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the seed function
seedDatabase();

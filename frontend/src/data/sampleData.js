// Sample product data for development
export const sampleProducts = [
  {
    _id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life and superior sound quality.',
    price: 199.99,
    discountedPrice: 149.99,
    category: 'electronics',
    subcategory: 'audio',
    brand: 'TechSound',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
        alt: 'Wireless headphones front view',
        isMain: true
      },
      {
        url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop',
        alt: 'Wireless headphones side view',
        isMain: false
      }
    ],
    inventory: {
      quantity: 15,
      lowStockThreshold: 5,
      trackQuantity: true
    },
    sku: 'WH-001',
    tags: ['wireless', 'bluetooth', 'noise-cancelling'],
    ratings: {
      average: 4.5,
      count: 128
    },
    isActive: true,
    isFeatured: true
  },
  {
    _id: '2',
    name: 'Smart Watch Pro 2024',
    description: 'Advanced fitness tracking smartwatch with heart rate monitor, GPS, and 7-day battery life.',
    price: 299.99,
    discountedPrice: null,
    category: 'electronics',
    subcategory: 'wearables',
    brand: 'TechFit',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
        alt: 'Smart watch display',
        isMain: true
      }
    ],
    inventory: {
      quantity: 8,
      lowStockThreshold: 5,
      trackQuantity: true
    },
    sku: 'SW-002',
    tags: ['smartwatch', 'fitness', 'gps'],
    ratings: {
      average: 4.2,
      count: 89
    },
    isActive: true,
    isFeatured: false
  },
  {
    _id: '3',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and sustainable organic cotton t-shirt, perfect for everyday wear.',
    price: 29.99,
    discountedPrice: 19.99,
    category: 'clothing',
    subcategory: 'shirts',
    brand: 'EcoWear',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1521572163464-5f3b0f2d7c5e?w=400&h=300&fit=crop',
        alt: 'Cotton t-shirt',
        isMain: true
      }
    ],
    inventory: {
      quantity: 50,
      lowStockThreshold: 10,
      trackQuantity: true
    },
    sku: 'CT-003',
    tags: ['organic', 'cotton', 'sustainable'],
    ratings: {
      average: 4.0,
      count: 45
    },
    isActive: true,
    isFeatured: false
  },
  {
    _id: '4',
    name: 'Professional Running Shoes',
    description: 'High-performance running shoes with advanced cushioning and breathable mesh upper.',
    price: 129.99,
    discountedPrice: 99.99,
    category: 'sports',
    subcategory: 'footwear',
    brand: 'SpeedRun',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
        alt: 'Running shoes',
        isMain: true
      }
    ],
    inventory: {
      quantity: 3,
      lowStockThreshold: 5,
      trackQuantity: true
    },
    sku: 'RS-004',
    tags: ['running', 'athletic', 'performance'],
    ratings: {
      average: 4.7,
      count: 203
    },
    isActive: true,
    isFeatured: true
  },
  {
    _id: '5',
    name: 'Laptop Backpack Premium',
    description: 'Durable laptop backpack with USB charging port and multiple compartments.',
    price: 79.99,
    discountedPrice: null,
    category: 'electronics',
    subcategory: 'accessories',
    brand: 'CarryPro',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
        alt: 'Laptop backpack',
        isMain: true
      }
    ],
    inventory: {
      quantity: 25,
      lowStockThreshold: 5,
      trackQuantity: true
    },
    sku: 'LB-005',
    tags: ['backpack', 'laptop', 'usb'],
    ratings: {
      average: 4.3,
      count: 67
    },
    isActive: true,
    isFeatured: false
  },
  {
    _id: '6',
    name: 'Yoga Mat Professional',
    description: 'Extra thick non-slip yoga mat with alignment markers and carrying strap.',
    price: 49.99,
    discountedPrice: 34.99,
    category: 'sports',
    subcategory: 'fitness',
    brand: 'ZenFit',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=300&fit=crop',
        alt: 'Yoga mat',
        isMain: true
      }
    ],
    inventory: {
      quantity: 0,
      lowStockThreshold: 5,
      trackQuantity: true
    },
    sku: 'YM-006',
    tags: ['yoga', 'fitness', 'non-slip'],
    ratings: {
      average: 4.6,
      count: 92
    },
    isActive: true,
    isFeatured: false
  }
];

export const categories = [
  { name: 'electronics', displayName: 'Electronics', icon: '📱' },
  { name: 'clothing', displayName: 'Clothing', icon: '👕' },
  { name: 'sports', displayName: 'Sports', icon: '⚽' },
  { name: 'books', displayName: 'Books', icon: '📚' },
  { name: 'home', displayName: 'Home', icon: '🏠' },
  { name: 'toys', displayName: 'Toys', icon: '🧸' },
  { name: 'beauty', displayName: 'Beauty', icon: '💄' },
  { name: 'other', displayName: 'Other', icon: '📦' }
];

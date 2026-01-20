import axios from 'axios';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      window.location.href = '/login';
    }
    
    // Handle 403 Forbidden - insufficient permissions
    if (error.response?.status === 403) {
      window.location.href = '/unauthorized';
    }
    
    // Handle 500 Server Error
    if (error.response?.status === 500) {
      console.error('Server Error:', error.response.data);
    }
    
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  // Register new user
  register: (userData) => api.post('/auth/register', userData),
  
  // Login user
  login: (credentials) => api.post('/auth/login', credentials),
  
  // Get user profile
  getProfile: () => api.get('/auth/profile'),
  
  // Update user profile
  updateProfile: (userData) => api.put('/auth/profile', userData),
};

// Products API calls
export const productsAPI = {
  // Get all products with filtering and pagination
  getProducts: (params) => api.get('/products', { params }),
  
  // Get single product by ID
  getProduct: (id) => api.get(`/products/${id}`),
  
  // Get featured products
  getFeaturedProducts: () => api.get('/products/featured'),
  
  // Create new product (Admin only)
  createProduct: (productData) => api.post('/products', productData),
  
  // Update product (Admin only)
  updateProduct: (id, productData) => api.put(`/products/${id}`, productData),
  
  // Delete product (Admin only)
  deleteProduct: (id) => api.delete(`/products/${id}`),
  
  // Create product review
  createReview: (id, reviewData) => api.post(`/products/${id}/reviews`, reviewData),
};

// Orders API calls
export const ordersAPI = {
  // Create new order
  createOrder: (orderData) => api.post('/orders', orderData),
  
  // Get current user's orders
  getMyOrders: (params) => api.get('/orders/myorders', { params }),
  
  // Get all orders (Admin only)
  getOrders: (params) => api.get('/orders', { params }),
  
  // Get single order by ID
  getOrder: (id) => api.get(`/orders/${id}`),
  
  // Update order status (Admin only)
  updateOrderStatus: (id, statusData) => api.put(`/orders/${id}/status`, statusData),
  
  // Update order to paid
  updateOrderToPaid: (id, paymentData) => api.put(`/orders/${id}/pay`, paymentData),
};

// Cart API calls
export const cartAPI = {
  // Get user cart
  getCart: () => api.get('/cart'),
  
  // Add item to cart
  addToCart: (productId, quantity) => api.post('/cart', { productId, quantity }),
  
  // Update cart item quantity
  updateCartItem: (itemId, quantity) => api.put(`/cart/${itemId}`, { quantity }),
  
  // Remove item from cart
  removeFromCart: (itemId) => api.delete(`/cart/${itemId}`),
  
  // Clear cart
  clearCart: () => api.delete('/cart'),
};

// Utility function for handling API errors
export const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const message = error.response.data?.message || 'Server error occurred';
    const errors = error.response.data?.errors || [];
    
    return {
      message,
      errors,
      status: error.response.status,
    };
  } else if (error.request) {
    // The request was made but no response was received
    return {
      message: 'Network error. Please check your connection.',
      status: 0,
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    return {
      message: error.message || 'An unexpected error occurred',
      status: 0,
    };
  }
};

export default api;

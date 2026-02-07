const Cart = require('../models/Cart');
const Product = require('../models/Product');
const mongoose = require('mongoose');

// Sample products data for development
const sampleProducts = [
  {
    _id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 149.99,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
        isMain: true
      }
    ],
    inventory: { quantity: 15 }
  },
  {
    _id: '2',
    name: 'Smart Watch Pro 2024',
    price: 299.99,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1523275335684-3f3b0f2d7c5e?w=400&h=300&fit=crop',
        isMain: true
      }
    ],
    inventory: { quantity: 8 }
  },
  {
    _id: '3',
    name: 'Organic Cotton T-Shirt',
    price: 19.99,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1521572163464-5f3b0f2d7c5e?w=400&h=300&fit=crop',
        isMain: true
      }
    ],
    inventory: { quantity: 50 }
  },
  {
    _id: '4',
    name: 'Professional Running Shoes',
    price: 99.99,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
        isMain: true
      }
    ],
    inventory: { quantity: 3 }
  },
  {
    _id: '5',
    name: 'Laptop Backpack Premium',
    price: 79.99,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
        isMain: true
      }
    ],
    inventory: { quantity: 25 }
  },
  {
    _id: '6',
    name: 'Yoga Mat Professional',
    price: 34.99,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=300&fit=crop',
        isMain: true
      }
    ],
    inventory: { quantity: 0 }
  }
];

/**
 * @desc    Get user cart
 * @route   GET /api/cart
 * @access  Private
 */
const getCart = async (req, res) => {
  try {
    // For development, return empty cart if user not authenticated
    if (!req.user || !req.user.id) {
      return res.status(200).json({
        success: true,
        data: {
          cartItems: [],
          totalPrice: 0,
          totalItems: 0
        }
      });
    }

    let cart = await Cart.findOne({ user: new mongoose.Types.ObjectId(req.user.id) });
    
    if (!cart) {
      cart = await Cart.create({
        user: new mongoose.Types.ObjectId(req.user.id),
        cartItems: [],
        totalPrice: 0
      });
    }

    // For development, populate sample product data for string IDs
    const populatedCart = {
      ...cart.toObject(),
      cartItems: cart.cartItems.map(item => {
        if (mongoose.Types.ObjectId.isValid(item.product.toString())) {
          return item;
        } else {
          // Use sample product data
          const sampleProduct = sampleProducts.find(p => p._id === item.product.toString());
          return {
            ...item.toObject(),
            product: sampleProduct || {
              _id: item.product,
              name: 'Sample Product',
              price: 29.99,
              images: [{ url: '/images/placeholder.jpg', isMain: true }]
            }
          };
        }
      })
    };

    res.status(200).json({
      success: true,
      data: populatedCart
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching cart'
    });
  }
};

/**
 * @desc    Add item to cart
 * @route   POST /api/cart
 * @access  Private
 */
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    // For development, if productId is not a valid ObjectId, use sample data
    let product;
    if (mongoose.Types.ObjectId.isValid(productId)) {
      product = await Product.findById(productId);
    } else {
      // For sample products with string IDs
      product = sampleProducts.find(p => p._id === productId);
    }
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check inventory
    if (product.inventory.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock'
      });
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: new mongoose.Types.ObjectId(req.user.id) });
    
    if (!cart) {
      cart = await Cart.create({
        user: new mongoose.Types.ObjectId(req.user.id),
        cartItems: []
      });
    }

    // Check if product already in cart
    const existingItemIndex = cart.cartItems.findIndex(
      item => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update quantity
      const newQuantity = cart.cartItems[existingItemIndex].quantity + quantity;
      
      if (product.inventory.quantity < newQuantity) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient stock'
        });
      }
      
      cart.cartItems[existingItemIndex].quantity = newQuantity;
    } else {
      // Add new item - for sample products, store as string
      if (mongoose.Types.ObjectId.isValid(productId)) {
        cart.cartItems.push({
          product: new mongoose.Types.ObjectId(productId),
          name: product.name,
          price: product.price,
          image: product.images?.find(img => img.isMain)?.url || product.images?.[0]?.url || '',
          quantity
        });
      } else {
        // For sample products, create a temporary cart item without saving to database
        return res.status(200).json({
          success: true,
          message: 'Item added to cart (sample mode)',
          data: {
            ...cart.toObject(),
            cartItems: [
              ...cart.cartItems,
              {
                product: productId,
                name: product.name,
                price: product.price,
                image: product.images?.find(img => img.isMain)?.url || product.images?.[0]?.url || '',
                quantity
              }
            ]
          }
        });
      }
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Item added to cart',
      data: cart
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Server error while adding to cart'
    });
  }
};

/**
 * @desc    Update cart item quantity
 * @route   PUT /api/cart/:itemId
 * @access  Private
 */
const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { itemId } = req.params;

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1'
      });
    }

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const cartItem = cart.cartItems.id(itemId);
    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    // Check inventory
    const product = await Product.findById(cartItem.product);
    if (product.inventory.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock'
      });
    }

    cartItem.quantity = quantity;
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart item updated',
      data: cart
    });
  } catch (error) {
    console.error('Update cart item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating cart item'
    });
  }
};

/**
 * @desc    Remove item from cart
 * @route   DELETE /api/cart/:itemId
 * @access  Private
 */
const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.cartItems = cart.cartItems.filter(item => item._id.toString() !== itemId);
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Item removed from cart',
      data: cart
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while removing from cart'
    });
  }
};

/**
 * @desc    Clear cart
 * @route   DELETE /api/cart
 * @access  Private
 */
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.cartItems = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart cleared',
      data: cart
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while clearing cart'
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};

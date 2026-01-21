const Order = require('../models/Order');
const Product = require('../models/Product');
const { validationResult } = require('express-validator');

/**
 * @desc    Create new order
 * @route   POST /api/orders
 * @access  Private
 */
const createOrder = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { orderItems, shippingAddress, paymentMethod } = req.body;

    // Validate order items
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No order items provided'
      });
    }

    // Get product details and validate inventory
    const processedOrderItems = [];
    let totalAmount = 0;

    for (const item of orderItems) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.product}`
        });
      }

      if (!product.isActive) {
        return res.status(400).json({
          success: false,
          message: `Product is not available: ${product.name}`
        });
      }

      // Check inventory
      if (product.inventory.trackQuantity && product.inventory.quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for product: ${product.name}. Available: ${product.inventory.quantity}, Requested: ${item.quantity}`
        });
      }

      // Add to processed order items
      processedOrderItems.push({
        product: product._id,
        name: product.name,
        quantity: item.quantity,
        price: product.discountedPrice || product.price,
        image: product.images.find(img => img.isMain)?.url || product.images[0]?.url
      });

      totalAmount += (product.discountedPrice || product.price) * item.quantity;

      // Update inventory
      if (product.inventory.trackQuantity) {
        product.inventory.quantity -= item.quantity;
        await product.save();
      }
    }

    // Create order
    const order = await Order.create({
      user: req.user.id,
      orderItems: processedOrderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice: totalAmount
    });

    // Populate user information for response
    const populatedOrder = await Order.findById(order._id)
      .populate('user', 'name email')
      .populate('orderItems.product', 'name sku');

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: populatedOrder
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating order'
    });
  }
};

/**
 * @desc    Get logged in user orders
 * @route   GET /api/orders/myorders
 * @access  Private
 */
const getMyOrders = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = { user: req.user.id };
    if (status) filter.status = status;

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const orders = await Order.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .populate('orderItems.product', 'name images');

    // Get total count
    const total = await Order.countDocuments(filter);

    // Calculate pagination info
    const pages = Math.ceil(total / limitNum);

    res.status(200).json({
      success: true,
      data: {
        orders,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages
        }
      }
    });
  } catch (error) {
    console.error('Get my orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching orders'
    });
  }
};

/**
 * @desc    Get all orders (Admin)
 * @route   GET /api/orders
 * @access  Private/Admin
 */
const getOrders = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      user: userId,
      startDate,
      endDate,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (userId) filter.user = userId;

    // Date range filter
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const orders = await Order.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .populate('user', 'name email')
      .populate('orderItems.product', 'name sku');

    // Get total count
    const total = await Order.countDocuments(filter);

    // Calculate pagination info
    const pages = Math.ceil(total / limitNum);

    res.status(200).json({
      success: true,
      data: {
        orders,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages
        }
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching orders'
    });
  }
};

/**
 * @desc    Get order by ID
 * @route   GET /api/orders/:id
 * @access  Private
 */
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('orderItems.product', 'name images sku');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns the order or is admin
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this order'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Get order by ID error:', error);
    
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while fetching order'
    });
  }
};

/**
 * @desc    Update order status
 * @route   PUT /api/orders/:id/status
 * @access  Private/Admin
 */
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order status'
      });
    }

    let order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Update order status
    order.status = status;

    // Set timestamps for specific status changes
    if (status === 'delivered') {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }

    // Handle order cancellation - restore inventory
    if (status === 'cancelled' && order.status !== 'cancelled') {
      for (const item of order.orderItems) {
        const product = await Product.findById(item.product);
        if (product && product.inventory.trackQuantity) {
          product.inventory.quantity += item.quantity;
          await product.save();
        }
      }
    }

    await order.save();

    // Populate user information for response
    const updatedOrder = await Order.findById(order._id)
      .populate('user', 'name email')
      .populate('orderItems.product', 'name sku');

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: updatedOrder
    });
  } catch (error) {
    console.error('Update order status error:', error);
    
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating order status'
    });
  }
};

/**
 * @desc    Update order to paid
 * @route   PUT /api/orders/:id/pay
 * @access  Private
 */
const updateOrderToPaid = async (req, res) => {
  try {
    const { paymentResult } = req.body;

    let order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns the order
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this order'
      });
    }

    // Update payment information
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = paymentResult;
    order.status = 'processing';

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order marked as paid',
      data: order
    });
  } catch (error) {
    console.error('Update order to paid error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating payment status'
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrders,
  getOrderById,
  updateOrderStatus,
  updateOrderToPaid
};

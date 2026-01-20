const express = require('express');
const { body } = require('express-validator');
const {
  createOrder,
  getMyOrders,
  getOrders,
  getOrderById,
  updateOrderStatus,
  updateOrderToPaid
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

/**
 * Validation middleware for order creation
 */
const orderValidation = [
  body('orderItems')
    .isArray({ min: 1 })
    .withMessage('At least one order item is required'),
  
  body('orderItems.*.product')
    .notEmpty()
    .withMessage('Product ID is required for each order item'),
  
  body('orderItems.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  
  body('shippingAddress.street')
    .notEmpty()
    .withMessage('Street address is required'),
  
  body('shippingAddress.city')
    .notEmpty()
    .withMessage('City is required'),
  
  body('shippingAddress.state')
    .notEmpty()
    .withMessage('State is required'),
  
  body('shippingAddress.zipCode')
    .notEmpty()
    .withMessage('Zip code is required'),
  
  body('shippingAddress.country')
    .notEmpty()
    .withMessage('Country is required'),
  
  body('paymentMethod')
    .isIn(['credit_card', 'debit_card', 'paypal', 'cash_on_delivery'])
    .withMessage('Invalid payment method')
];

/**
 * Validation middleware for order status update
 */
const statusValidation = [
  body('status')
    .isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
    .withMessage('Invalid order status')
];

/**
 * Validation middleware for payment update
 */
const paymentValidation = [
  body('paymentResult.id')
    .notEmpty()
    .withMessage('Payment ID is required'),
  
  body('paymentResult.status')
    .notEmpty()
    .withMessage('Payment status is required')
];

/**
 * @route   POST /api/orders
 * @desc    Create new order
 * @access  Private
 */
router.post('/', protect, orderValidation, createOrder);

/**
 * @route   GET /api/orders/myorders
 * @desc    Get logged in user orders
 * @access  Private
 */
router.get('/myorders', protect, getMyOrders);

/**
 * @route   GET /api/orders
 * @desc    Get all orders (Admin)
 * @access  Private/Admin
 */
router.get('/', protect, authorize('admin'), getOrders);

/**
 * @route   GET /api/orders/:id
 * @desc    Get order by ID
 * @access  Private
 */
router.get('/:id', protect, getOrderById);

/**
 * @route   PUT /api/orders/:id/status
 * @desc    Update order status (Admin)
 * @access  Private/Admin
 */
router.put('/:id/status', protect, authorize('admin'), statusValidation, updateOrderStatus);

/**
 * @route   PUT /api/orders/:id/pay
 * @desc    Update order to paid
 * @access  Private
 */
router.put('/:id/pay', protect, paymentValidation, updateOrderToPaid);

module.exports = router;

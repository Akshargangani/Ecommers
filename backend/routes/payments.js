const express = require('express');
const {
  createPaymentIntent,
  confirmPayment,
  processRefund
} = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

/**
 * @route   POST /api/payments/create-payment-intent
 * @desc    Create payment intent
 * @access  Private
 */
router.post('/create-payment-intent', protect, createPaymentIntent);

/**
 * @route   POST /api/payments/confirm-payment
 * @desc    Confirm payment
 * @access  Private
 */
router.post('/confirm-payment', protect, confirmPayment);

/**
 * @route   POST /api/payments/refund
 * @desc    Process refund
 * @access  Private (Admin)
 */
router.post('/refund', protect, processRefund);

module.exports = router;

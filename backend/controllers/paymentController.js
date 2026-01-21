const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy_key_for_development');

/**
 * @desc    Create payment intent
 * @route   POST /api/payments/create-payment-intent
 * @access  Private
 */
const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'usd' } = req.body;

    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount'
      });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      payment_method_types: ['card'],
      metadata: {
        userId: req.user.id,
      },
    });

    res.status(200).json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      }
    });
  } catch (error) {
    console.error('Create payment intent error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment intent'
    });
  }
};

/**
 * @desc    Confirm payment
 * @route   POST /api/payments/confirm-payment
 * @access  Private
 */
const confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId, orderId } = req.body;

    // Retrieve payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({
        success: false,
        message: 'Payment not successful'
      });
    }

    // Update order status
    const Order = require('../models/Order');
    const Payment = require('../models/Payment');

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Create payment record
    const payment = await Payment.create({
      order: orderId,
      user: req.user.id,
      amount: paymentIntent.amount / 100, // Convert from cents
      method: 'stripe',
      status: 'completed',
      transactionId: paymentIntentId,
      gatewayResponse: paymentIntent,
      processedAt: new Date()
    });

    // Update order payment status
    order.isPaid = true;
    order.paidAt = new Date();
    order.status = 'processing';
    order.paymentResult = {
      id: paymentIntentId,
      status: paymentIntent.status,
      update_time: new Date().toISOString(),
      email_address: req.user.email
    };

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Payment confirmed successfully',
      data: {
        payment,
        order
      }
    });
  } catch (error) {
    console.error('Confirm payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to confirm payment'
    });
  }
};

/**
 * @desc    Process refund
 * @route   POST /api/payments/refund
 * @access  Private (Admin)
 */
const processRefund = async (req, res) => {
  try {
    const { paymentIntentId, amount, reason } = req.body;

    // Create refund
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount ? Math.round(amount * 100) : undefined, // Convert to cents
      reason: reason || 'requested_by_customer',
      metadata: {
        refundedBy: req.user.id,
      },
    });

    // Update payment record
    const Payment = require('../models/Payment');
    const payment = await Payment.findOne({ transactionId: paymentIntentId });

    if (payment) {
      payment.status = 'refunded';
      payment.refundAmount = refund.amount / 100; // Convert from cents
      payment.refundReason = reason;
      payment.refundedAt = new Date();
      await payment.save();
    }

    res.status(200).json({
      success: true,
      message: 'Refund processed successfully',
      data: refund
    });
  } catch (error) {
    console.error('Process refund error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process refund'
    });
  }
};

module.exports = {
  createPaymentIntent,
  confirmPayment,
  processRefund
};

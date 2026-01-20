const mongoose = require('mongoose');

/**
 * Cart Schema for storing user cart information
 * Temporary storage for products before checkout
 */
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Cart must belong to a user'],
    unique: true
  },
  cartItems: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Cart item must have a product']
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative']
    },
    image: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
      default: 1
    }
  }],
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  }
}, {
  timestamps: true
});

// Calculate total price before saving
cartSchema.pre('save', function(next) {
  this.totalPrice = this.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  next();
});

module.exports = mongoose.model('Cart', cartSchema);

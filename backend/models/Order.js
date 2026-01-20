const mongoose = require('mongoose');

/**
 * Order Schema for storing order information
 * Includes order items, shipping, payment, and status tracking
 */
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Order must belong to a user']
  },
  orderItems: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Order item must have a product']
    },
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1']
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative']
    },
    image: {
      type: String,
      required: true
    }
  }],
  shippingAddress: {
    street: {
      type: String,
      required: [true, 'Please add a street address']
    },
    city: {
      type: String,
      required: [true, 'Please add a city']
    },
    state: {
      type: String,
      required: [true, 'Please add a state']
    },
    zipCode: {
      type: String,
      required: [true, 'Please add a zip code']
    },
    country: {
      type: String,
      required: [true, 'Please add a country'],
      default: 'United States'
    }
  },
  paymentMethod: {
    type: String,
    required: [true, 'Please select a payment method'],
    enum: ['credit_card', 'debit_card', 'paypal', 'cash_on_delivery']
  },
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  paidAt: {
    type: Date
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false
  },
  deliveredAt: {
    type: Date
  },
  trackingNumber: {
    type: String,
    unique: true,
    sparse: true // Allows multiple null values
  },
  notes: {
    type: String,
    maxlength: [500, 'Order notes cannot exceed 500 characters']
  }
}, {
  timestamps: true
});

// Calculate total price before saving
orderSchema.pre('save', function(next) {
  // Calculate items price
  this.itemsPrice = this.orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  
  // Calculate tax (assuming 8% tax rate)
  this.taxPrice = this.itemsPrice * 0.08;
  
  // Calculate shipping (free shipping for orders over $100)
  this.shippingPrice = this.itemsPrice > 100 ? 0 : 10;
  
  // Calculate total price
  this.totalPrice = this.itemsPrice + this.taxPrice + this.shippingPrice;
  
  next();
});

// Generate unique order number
orderSchema.pre('save', async function(next) {
  if (!this.isNew) {
    return next();
  }
  
  // Generate order number based on timestamp and random number
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  this.trackingNumber = `ORD-${timestamp}-${random}`;
  
  next();
});

module.exports = mongoose.model('Order', orderSchema);

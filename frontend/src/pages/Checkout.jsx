import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCreditCard, FiTruck, FiShield } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ordersAPI } from '../services/api';
import { toast } from 'react-toastify';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart, getCartTotal } = useCart();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  useEffect(() => {
    // Set default shipping address from user profile if available
    if (user?.addresses?.length > 0) {
      const defaultAddress = user.addresses.find(addr => addr.isDefault) || user.addresses[0];
      setShippingAddress({
        street: defaultAddress.street || '',
        city: defaultAddress.city || '',
        state: defaultAddress.state || '',
        zipCode: defaultAddress.zipCode || '',
        country: defaultAddress.country || 'United States',
      });
    }
  }, [user]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateShippingAddress = () => {
    return Object.values(shippingAddress).every(value => value.trim() !== '');
  };

  const handleNextStep = () => {
    if (step === 1 && !validateShippingAddress()) {
      toast.error('Please fill in all shipping address fields');
      return;
    }
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handlePlaceOrder = async () => {
    if (!validateShippingAddress()) {
      toast.error('Please complete shipping address');
      return;
    }

    setLoading(true);
    
    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          product: item.product,
          quantity: item.quantity,
        })),
        shippingAddress,
        paymentMethod,
      };

      const response = await ordersAPI.createOrder(orderData);
      setOrderDetails(response.data);
      setOrderPlaced(true);
      clearCart();
      toast.success('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="container-custom py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some items to your cart before checkout.</p>
          <Link to="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="container-custom py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiShield className="w-10 h-10 text-success-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
            <p className="text-gray-600 mb-2">
              Thank you for your order. We've received your order and will begin processing it right away.
            </p>
            <p className="text-sm text-gray-500">
              Order #{orderDetails.trackingNumber}
            </p>
          </div>

          <div className="card mb-8">
            <div className="card-body">
              <h3 className="font-semibold mb-4">Order Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Number:</span>
                  <span className="font-medium">{orderDetails.trackingNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-medium">${orderDetails.totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium capitalize">{orderDetails.paymentMethod.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping Address:</span>
                  <span className="font-medium text-right">
                    {orderDetails.shippingAddress.street}, {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.zipCode}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Link
              to="/orders"
              className="btn btn-primary w-full"
            >
              View My Orders
            </Link>
            <Link
              to="/products"
              className="btn btn-outline w-full"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-8">
        <Link to="/cart" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
          <FiArrowLeft className="w-4 h-4 mr-2" />
          Back to Cart
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div
                  className={`w-16 h-1 mx-2 ${
                    step > stepNumber ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-8 mt-2 text-sm">
          <span className={step >= 1 ? 'text-primary-600 font-medium' : 'text-gray-600'}>
            Shipping
          </span>
          <span className={step >= 2 ? 'text-primary-600 font-medium' : 'text-gray-600'}>
            Payment
          </span>
          <span className={step >= 3 ? 'text-primary-600 font-medium' : 'text-gray-600'}>
            Review
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Step 1: Shipping Address */}
          {step === 1 && (
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold flex items-center">
                  <FiTruck className="w-5 h-5 mr-2" />
                  Shipping Address
                </h3>
              </div>
              <div className="card-body space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={shippingAddress.street}
                    onChange={handleAddressChange}
                    className="input"
                    placeholder="123 Main St"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleAddressChange}
                      className="input"
                      placeholder="New York"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={shippingAddress.state}
                      onChange={handleAddressChange}
                      className="input"
                      placeholder="NY"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={shippingAddress.zipCode}
                      onChange={handleAddressChange}
                      className="input"
                      placeholder="10001"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={shippingAddress.country}
                      onChange={handleAddressChange}
                      className="input"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Payment Method */}
          {step === 2 && (
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold flex items-center">
                  <FiCreditCard className="w-5 h-5 mr-2" />
                  Payment Method
                </h3>
              </div>
              <div className="card-body space-y-4">
                {[
                  { value: 'credit_card', label: 'Credit Card' },
                  { value: 'debit_card', label: 'Debit Card' },
                  { value: 'paypal', label: 'PayPal' },
                  { value: 'cash_on_delivery', label: 'Cash on Delivery' },
                ].map((method) => (
                  <label key={method.value} className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.value}
                      checked={paymentMethod === method.value}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span className="font-medium">{method.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Review Order */}
          {step === 3 && (
            <div className="space-y-6">
              {/* Order Items */}
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold">Order Items</h3>
                </div>
                <div className="card-body">
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.product} className="flex items-center space-x-4">
                        <img
                          src={item.image || 'https://via.placeholder.com/60x60/f3f4f6/6b7280?text=No+Image'}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">Qty: {item.quantity} × ${item.price}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold">Shipping Address</h3>
                </div>
                <div className="card-body">
                  <p className="text-gray-900">
                    {shippingAddress.street}<br />
                    {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}<br />
                    {shippingAddress.country}
                  </p>
                </div>
              </div>

              {/* Payment Method */}
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold">Payment Method</h3>
                </div>
                <div className="card-body">
                  <p className="text-gray-900 capitalize">{paymentMethod.replace('_', ' ')}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                onClick={handlePreviousStep}
                className="btn btn-outline"
              >
                Previous
              </button>
            )}
            {step < 3 ? (
              <button
                onClick={handleNextStep}
                className="btn btn-primary ml-auto"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="btn btn-primary ml-auto"
              >
                {loading ? (
                  <span className="flex items-center">
                    <div className="spinner w-5 h-5 mr-2"></div>
                    Placing Order...
                  </span>
                ) : (
                  'Place Order'
                )}
              </button>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card sticky top-24">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Order Summary</h3>
            </div>
            <div className="card-body space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              {subtotal < 100 && (
                <div className="bg-warning-50 border border-warning-200 text-warning-800 px-3 py-2 rounded-md text-sm">
                  Add ${(100 - subtotal).toFixed(2)} more for FREE shipping!
                </div>
              )}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-xl font-bold text-primary-600">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

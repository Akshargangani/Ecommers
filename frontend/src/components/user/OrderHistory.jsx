import React, { useState, useEffect } from 'react';
import { FiPackage, FiTruck, FiCheck, FiClock, FiEye, FiFilter, FiCalendar, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

/**
 * OrderHistory component - Display user's order history
 */
const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockOrders = [
        {
          id: 'ORD-001',
          date: '2024-01-09',
          status: 'delivered',
          total: 299.99,
          items: [
            { name: 'Wireless Headphones', quantity: 1, price: 299.99 }
          ],
          trackingNumber: 'TRK123456789',
          shippingAddress: '123 Main St, New York, NY 10001'
        },
        {
          id: 'ORD-002',
          date: '2024-01-05',
          status: 'shipped',
          total: 149.99,
          items: [
            { name: 'Smart Watch', quantity: 1, price: 149.99 }
          ],
          trackingNumber: 'TRK987654321',
          shippingAddress: '456 Oak Ave, Los Angeles, CA 90001'
        },
        {
          id: 'ORD-003',
          date: '2024-01-02',
          status: 'processing',
          total: 189.98,
          items: [
            { name: 'Running Shoes', quantity: 2, price: 89.99 }
          ],
          trackingNumber: null,
          shippingAddress: '789 Pine Rd, Chicago, IL 60007'
        },
        {
          id: 'ORD-004',
          date: '2023-12-28',
          status: 'pending',
          total: 249.97,
          items: [
            { name: 'Laptop Stand', quantity: 3, price: 49.99 }
          ],
          trackingNumber: null,
          shippingAddress: '321 Elm St, Houston, TX 77001'
        },
        {
          id: 'ORD-005',
          date: '2023-12-15',
          status: 'cancelled',
          total: 99.99,
          items: [
            { name: 'Book Set', quantity: 1, price: 99.99 }
          ],
          trackingNumber: null,
          shippingAddress: '654 Maple Dr, Phoenix, AZ 85001'
        }
      ];
      
      setOrders(mockOrders);
    } catch (error) {
      toast.error('Failed to fetch orders');
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <FiCheck className="h-4 w-4" />;
      case 'shipped':
        return <FiTruck className="h-4 w-4" />;
      case 'processing':
        return <FiClock className="h-4 w-4" />;
      case 'pending':
        return <FiClock className="h-4 w-4" />;
      case 'cancelled':
        return <FiX className="h-4 w-4" />;
      default:
        return <FiPackage className="h-4 w-4" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleTrackOrder = (trackingNumber) => {
    if (trackingNumber) {
      window.open(`https://www.fedex.com/fedextrack/?trknbr=${trackingNumber}`, '_blank');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Order History</h2>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <FiFilter className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <FiPackage className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600">
            {filter === 'all' 
              ? "You haven't placed any orders yet." 
              : `No ${filter} orders found.`
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {order.id}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {formatDate(order.date)}
                  </p>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span className="ml-1">
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </span>
              </div>

              {/* Order Items */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Items</h4>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                          <FiPackage className="h-4 w-4 text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-gray-600">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Total Amount</h4>
                  <p className="text-lg font-bold text-gray-900">
                    ${order.total.toFixed(2)}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Shipping Address</h4>
                  <p className="text-gray-600">{order.shippingAddress}</p>
                </div>
              </div>

              {/* Tracking Number */}
              {order.trackingNumber && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-blue-900">Tracking Number</h4>
                      <p className="text-blue-700 font-mono">{order.trackingNumber}</p>
                    </div>
                    <button
                      onClick={() => handleTrackOrder(order.trackingNumber)}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Track Package
                    </button>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="mt-4 flex space-x-3">
                <button
                  onClick={() => handleViewOrder(order)}
                  className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm"
                >
                  <FiEye className="h-4 w-4 mr-2" />
                  View Details
                </button>
                {order.status === 'delivered' && (
                  <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm">
                    Reorder
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;

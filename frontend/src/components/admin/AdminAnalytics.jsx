import React, { useState, useEffect } from 'react';
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiShoppingCart, FiUsers, FiPackage, FiCalendar, FiDownload, FiBarChart2, FiPieChart, FiActivity } from 'react-icons/fi';
import { toast } from 'react-toastify';

/**
 * AdminAnalytics component - Analytics dashboard for admin
 */
const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    revenue: { current: 45678.90, previous: 42345.67, growth: 7.9 },
    orders: { current: 1247, previous: 1156, growth: 7.9 },
    users: { current: 892, previous: 834, growth: 7.0 },
    products: { current: 156, previous: 142, growth: 9.9 }
  });
  const [salesData, setSalesData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockSalesData = [
        { date: '2024-01-03', revenue: 1234.56, orders: 23 },
        { date: '2024-01-04', revenue: 2345.67, orders: 34 },
        { date: '2024-01-05', revenue: 3456.78, orders: 45 },
        { date: '2024-01-06', revenue: 4567.89, orders: 56 },
        { date: '2024-01-07', revenue: 5678.90, orders: 67 },
        { date: '2024-01-08', revenue: 6789.01, orders: 78 },
        { date: '2024-01-09', revenue: 7890.12, orders: 89 }
      ];
      
      const mockTopProducts = [
        { name: 'Wireless Headphones', sales: 234, revenue: 70200, growth: 12.5 },
        { name: 'Smart Watch', sales: 189, revenue: 37800, growth: 8.3 },
        { name: 'Laptop Stand', sales: 156, revenue: 7800, growth: -2.1 },
        { name: 'Running Shoes', sales: 145, revenue: 13050, growth: 15.7 },
        { name: 'USB Cable', sales: 134, revenue: 6700, growth: 5.2 }
      ];
      
      const mockCategoryData = [
        { name: 'Electronics', value: 45.2, color: 'bg-blue-500' },
        { name: 'Clothing', value: 23.8, color: 'bg-green-500' },
        { name: 'Sports', value: 15.6, color: 'bg-yellow-500' },
        { name: 'Books', value: 8.9, color: 'bg-purple-500' },
        { name: 'Home', value: 6.5, color: 'bg-red-500' }
      ];
      
      setSalesData(mockSalesData);
      setTopProducts(mockTopProducts);
      setCategoryData(mockCategoryData);
    } catch (error) {
      toast.error('Failed to fetch analytics data');
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportReport = () => {
    toast.success('Analytics report exported successfully');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
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
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Track your store performance and gain insights
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button
            onClick={handleExportReport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FiDownload className="mr-2 h-4 w-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <FiDollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {formatCurrency(analytics.revenue.current)}
                    </div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      analytics.revenue.growth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {analytics.revenue.growth >= 0 ? (
                        <FiTrendingUp className="self-center flex-shrink-0 h-4 w-4 mr-1" />
                      ) : (
                        <FiTrendingDown className="self-center flex-shrink-0 h-4 w-4 mr-1" />
                      )}
                      {Math.abs(analytics.revenue.growth)}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <FiShoppingCart className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {formatNumber(analytics.orders.current)}
                    </div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      analytics.orders.growth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {analytics.orders.growth >= 0 ? (
                        <FiTrendingUp className="self-center flex-shrink-0 h-4 w-4 mr-1" />
                      ) : (
                        <FiTrendingDown className="self-center flex-shrink-0 h-4 w-4 mr-1" />
                      )}
                      {Math.abs(analytics.orders.growth)}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                <FiUsers className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {formatNumber(analytics.users.current)}
                    </div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      analytics.users.growth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {analytics.users.growth >= 0 ? (
                        <FiTrendingUp className="self-center flex-shrink-0 h-4 w-4 mr-1" />
                      ) : (
                        <FiTrendingDown className="self-center flex-shrink-0 h-4 w-4 mr-1" />
                      )}
                      {Math.abs(analytics.users.growth)}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <FiPackage className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Products</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {formatNumber(analytics.products.current)}
                    </div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      analytics.products.growth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {analytics.products.growth >= 0 ? (
                        <FiTrendingUp className="self-center flex-shrink-0 h-4 w-4 mr-1" />
                      ) : (
                        <FiTrendingDown className="self-center flex-shrink-0 h-4 w-4 mr-1" />
                      )}
                      {Math.abs(analytics.products.growth)}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Sales Overview
              </h3>
              <FiBarChart2 className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {salesData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-sm text-gray-500">{item.date}</div>
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(item.revenue)}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-sm text-gray-500">{item.orders} orders</div>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full" 
                        style={{ width: `${(item.revenue / Math.max(...salesData.map(d => d.revenue))) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Category Distribution
              </h3>
              <FiPieChart className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                    <div className="text-sm font-medium text-gray-900">{category.name}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-sm text-gray-500">{category.value}%</div>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${category.color} h-2 rounded-full`} 
                        style={{ width: `${category.value}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Top Performing Products
            </h3>
            <FiActivity className="h-5 w-5 text-gray-400" />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topProducts.map((product, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatNumber(product.sales)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(product.revenue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.growth >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.growth >= 0 ? (
                          <FiTrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <FiTrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(product.growth)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Insights */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Quick Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center">
                <FiCalendar className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Best Day</p>
                  <p className="text-lg font-semibold text-blue-600">January 9</p>
                  <p className="text-xs text-blue-700">Highest sales this week</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center">
                <FiUsers className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-green-900">Customer Retention</p>
                  <p className="text-lg font-semibold text-green-600">78.5%</p>
                  <p className="text-xs text-green-700">Above industry average</p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center">
                <FiShoppingCart className="h-8 w-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-purple-900">Avg Order Value</p>
                  <p className="text-lg font-semibold text-purple-600">$89.45</p>
                  <p className="text-xs text-purple-700">+12% from last month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;

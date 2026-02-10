import React, { useState, useEffect } from 'react';
import { FiFileText, FiDownload, FiFilter, FiCalendar } from 'react-icons/fi';

/**
 * AdminReports component - Generate and view various reports
 */
const AdminReports = () => {
  const [reports, setReports] = useState({
    salesReport: [],
    inventoryReport: [],
    userReport: [],
    financialReport: {
      totalRevenue: 0,
      totalOrders: 0,
      averageOrderValue: 0,
      profitMargin: 0
    }
  });

  const [selectedReport, setSelectedReport] = useState('sales');
  const [dateRange, setDateRange] = useState({
    start: '2024-02-01',
    end: '2024-02-10'
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReports();
  }, [selectedReport, dateRange]);

  const fetchReports = async () => {
    setLoading(true);
    
    // Simulate API calls with sample data
    setTimeout(() => {
      if (selectedReport === 'sales') {
        setReports(prev => ({
          ...prev,
          salesReport: [
            { date: '2024-02-10', orders: 45, revenue: 2340.50, products: 123 },
            { date: '2024-02-09', orders: 38, revenue: 1890.75, products: 98 },
            { date: '2024-02-08', orders: 52, revenue: 3456.25, products: 156 },
            { date: '2024-02-07', orders: 41, revenue: 2789.90, products: 134 }
          ]
        }));
      } else if (selectedReport === 'inventory') {
        setReports(prev => ({
          ...prev,
          inventoryReport: [
            { name: 'Wireless Gaming Mouse', stock: 245, sold: 145, lowStock: false },
            { name: 'Mechanical Keyboard', stock: 89, sold: 98, lowStock: true },
            { name: 'USB-C Hub', stock: 156, sold: 87, lowStock: false },
            { name: 'Laptop Stand', stock: 67, sold: 76, lowStock: true }
          ]
        }));
      } else if (selectedReport === 'users') {
        setReports(prev => ({
          ...prev,
          userReport: [
            { name: 'John Doe', email: 'john@example.com', orders: 12, totalSpent: 1456.78, joinDate: '2024-01-15' },
            { name: 'Jane Smith', email: 'jane@example.com', orders: 8, totalSpent: 987.45, joinDate: '2024-01-20' },
            { name: 'Bob Johnson', email: 'bob@example.com', orders: 15, totalSpent: 2234.90, joinDate: '2024-01-10' }
          ]
        }));
      } else if (selectedReport === 'financial') {
        setReports(prev => ({
          ...prev,
          financialReport: {
            totalRevenue: 45678.90,
            totalOrders: 342,
            averageOrderValue: 133.56,
            profitMargin: 28.5
          }
        }));
      }
      setLoading(false);
    }, 800);
  };

  const exportReport = (format) => {
    // Simulate report export
    const data = selectedReport === 'sales' ? reports.salesReport :
                 selectedReport === 'inventory' ? reports.inventoryReport :
                 selectedReport === 'users' ? reports.userReport :
                 reports.financialReport;
    
    console.log(`Exporting ${selectedReport} report as ${format}:`, data);
    
    // Create downloadable file
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedReport}_report_${dateRange.start}_${dateRange.end}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => exportReport('csv')}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <FiDownload className="h-4 w-4 mr-2" />
            Export CSV
          </button>
          <button
            onClick={() => exportReport('pdf')}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <FiFileText className="h-4 w-4 mr-2" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {['sales', 'inventory', 'users', 'financial'].map((report) => (
            <button
              key={report}
              onClick={() => setSelectedReport(report)}
              className={`p-4 rounded-lg border-2 transition-colors ${
                selectedReport === report
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              <h3 className="text-lg font-semibold capitalize">{report}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {report === 'sales' && 'Sales performance and trends'}
                {report === 'inventory' && 'Stock levels and movements'}
                {report === 'users' && 'Customer activity and analytics'}
                {report === 'financial' && 'Revenue and profit analysis'}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Date Range Selector */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Date Range</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="bg-white shadow rounded-lg">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <>
            {/* Sales Report */}
            {selectedReport === 'sales' && (
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Report</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Products</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {reports.salesReport.map((sale, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.orders}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${sale.revenue.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.products}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Inventory Report */}
            {selectedReport === 'inventory' && (
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory Report</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sold</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {reports.inventoryReport.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.stock}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.sold}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              item.lowStock
                                ? 'bg-red-100 text-red-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {item.lowStock ? 'Low Stock' : 'In Stock'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Users Report */}
            {selectedReport === 'users' && (
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">User Activity Report</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Spent</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {reports.userReport.map((user, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.orders}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${user.totalSpent.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.joinDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Financial Report */}
            {selectedReport === 'financial' && (
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500">Total Revenue</h4>
                    <p className="text-2xl font-semibold text-gray-900">${reports.financialReport.totalRevenue.toFixed(2)}</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500">Total Orders</h4>
                    <p className="text-2xl font-semibold text-gray-900">{reports.financialReport.totalOrders}</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500">Average Order Value</h4>
                    <p className="text-2xl font-semibold text-gray-900">${reports.financialReport.averageOrderValue.toFixed(2)}</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500">Profit Margin</h4>
                    <p className="text-2xl font-semibold text-gray-900">{reports.financialReport.profitMargin}%</p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminReports;

import React, { useState } from 'react';
import { FiFilter, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';

/**
 * ProductFilters component - Advanced product filtering
 */
const ProductFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: false,
    rating: false,
    brand: false
  });

  const categories = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Sports & Outdoors',
    'Toys & Games',
    'Health & Beauty',
    'Automotive'
  ];

  const brands = [
    'Apple',
    'Samsung',
    'Sony',
    'Nike',
    'Adidas',
    'Microsoft',
    'Dell',
    'HP',
    'Canon',
    'LG'
  ];

  const priceRanges = [
    { label: 'Under $25', min: 0, max: 25 },
    { label: '$25 - $50', min: 25, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: '$200 - $500', min: 200, max: 500 },
    { label: 'Over $500', min: 500, max: '' }
  ];

  const ratings = [
    { label: '4+ Stars', value: 4 },
    { label: '3+ Stars', value: 3 },
    { label: '2+ Stars', value: 2 },
    { label: '1+ Stars', value: 1 }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (category) => {
    onFilterChange('category', filters.category === category ? '' : category);
  };

  const handlePriceRangeChange = (range) => {
    onFilterChange('minPrice', range.min);
    onFilterChange('maxPrice', range.max);
  };

  const handleRatingChange = (rating) => {
    onFilterChange('rating', filters.rating === rating ? '' : rating);
  };

  const handleBrandChange = (brand) => {
    onFilterChange('brand', filters.brand === brand ? '' : brand);
  };

  const handleSortChange = (field) => {
    onFilterChange('sortBy', field);
    // Toggle sort order if same field
    if (filters.sortBy === field) {
      onFilterChange('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      onFilterChange('sortOrder', 'desc');
    }
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.category) count++;
    if (filters.minPrice || filters.maxPrice) count++;
    if (filters.rating) count++;
    if (filters.brand) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <FiFilter className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-1 rounded-full">
              {activeFilterCount} active
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {activeFilterCount > 0 && (
            <button
              onClick={onClearFilters}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Clear All
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            {isExpanded ? <FiX className="h-5 w-5" /> : <FiFilter className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Filter Content */}
      {isExpanded && (
        <div className="p-4 space-y-6">
          {/* Category Filter */}
          <div>
            <button
              onClick={() => toggleSection('category')}
              className="w-full flex items-center justify-between text-left font-medium text-gray-900 mb-3 hover:text-gray-700"
            >
              <span>Category</span>
              {expandedSections.category ? (
                <FiChevronUp className="h-4 w-4" />
              ) : (
                <FiChevronDown className="h-4 w-4" />
              )}
            </button>
            {expandedSections.category && (
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={filters.category === category}
                      onChange={() => handleCategoryChange(category)}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Range Filter */}
          <div>
            <button
              onClick={() => toggleSection('price')}
              className="w-full flex items-center justify-between text-left font-medium text-gray-900 mb-3 hover:text-gray-700"
            >
              <span>Price Range</span>
              {expandedSections.price ? (
                <FiChevronUp className="h-4 w-4" />
              ) : (
                <FiChevronDown className="h-4 w-4" />
              )}
            </button>
            {expandedSections.price && (
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <label key={range.label} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={filters.minPrice === range.min && filters.maxPrice === range.max}
                      onChange={() => handlePriceRangeChange(range)}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">{range.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Rating Filter */}
          <div>
            <button
              onClick={() => toggleSection('rating')}
              className="w-full flex items-center justify-between text-left font-medium text-gray-900 mb-3 hover:text-gray-700"
            >
              <span>Customer Rating</span>
              {expandedSections.rating ? (
                <FiChevronUp className="h-4 w-4" />
              ) : (
                <FiChevronDown className="h-4 w-4" />
              )}
            </button>
            {expandedSections.rating && (
              <div className="space-y-2">
                {ratings.map((rating) => (
                  <label key={rating.value} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.rating === rating.value}
                      onChange={() => handleRatingChange(rating.value)}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-gray-700">{rating.label}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-xs ${
                            i < rating.value ? 'text-yellow-400' : 'text-gray-300'
                          }`}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Brand Filter */}
          <div>
            <button
              onClick={() => toggleSection('brand')}
              className="w-full flex items-center justify-between text-left font-medium text-gray-900 mb-3 hover:text-gray-700"
            >
              <span>Brand</span>
              {expandedSections.brand ? (
                <FiChevronUp className="h-4 w-4" />
              ) : (
                <FiChevronDown className="h-4 w-4" />
              )}
            </button>
            {expandedSections.brand && (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={filters.brand === brand}
                      onChange={() => handleBrandChange(brand)}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Sort Options */}
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Sort By</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { field: 'createdAt', label: 'Newest' },
                { field: 'price', label: 'Price' },
                { field: 'rating', label: 'Rating' },
                { field: 'name', label: 'Name' },
                { field: 'sales', label: 'Popularity' }
              ].map((option) => (
                <button
                  key={option.field}
                  onClick={() => handleSortChange(option.field)}
                  className={`px-3 py-2 text-sm border rounded-md transition-colors ${
                    filters.sortBy === option.field
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {option.label}
                  {filters.sortBy === option.field && (
                    <span className="ml-1 text-xs">
                      {filters.sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiGrid, FiList, FiChevronRight, FiPackage } from 'react-icons/fi';
import ProductGrid from '../components/products/ProductGrid';
import { toast } from 'react-toastify';

/**
 * Categories page - Browse products by category
 */
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchCategoryProducts(selectedCategory.id);
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockCategories = [
        {
          id: 1,
          name: 'Electronics',
          description: 'Gadgets, devices, and tech accessories',
          icon: '💻',
          productCount: 156,
          subcategories: ['Phones', 'Laptops', 'Audio', 'Cameras', 'Accessories']
        },
        {
          id: 2,
          name: 'Clothing',
          description: 'Fashion for men, women, and kids',
          icon: '👕',
          productCount: 234,
          subcategories: ['Men', 'Women', 'Kids', 'Shoes', 'Accessories']
        },
        {
          id: 3,
          name: 'Home & Garden',
          description: 'Everything for your home and garden',
          icon: '🏠',
          productCount: 189,
          subcategories: ['Furniture', 'Decor', 'Kitchen', 'Garden', 'Tools']
        },
        {
          id: 4,
          name: 'Sports & Outdoors',
          description: 'Equipment and gear for active lifestyle',
          icon: '⚽',
          productCount: 98,
          subcategories: ['Fitness', 'Outdoor', 'Team Sports', 'Water Sports']
        },
        {
          id: 5,
          name: 'Books & Media',
          description: 'Books, movies, music, and games',
          icon: '📚',
          productCount: 267,
          subcategories: ['Fiction', 'Non-Fiction', 'Textbooks', 'Movies', 'Music']
        },
        {
          id: 6,
          name: 'Toys & Games',
          description: 'Fun for kids and adults',
          icon: '🎮',
          productCount: 145,
          subcategories: ['Educational', 'Action Figures', 'Board Games', 'Video Games']
        },
        {
          id: 7,
          name: 'Health & Beauty',
          description: 'Personal care and wellness products',
          icon: '💄',
          productCount: 178,
          subcategories: ['Skincare', 'Makeup', 'Hair Care', 'Supplements']
        },
        {
          id: 8,
          name: 'Automotive',
          description: 'Parts, accessories, and tools',
          icon: '🚗',
          productCount: 67,
          subcategories: ['Parts', 'Accessories', 'Tools', 'Cleaning']
        }
      ];
      
      setCategories(mockCategories);
    } catch (error) {
      toast.error('Failed to load categories');
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryProducts = async (categoryId) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock products for this category
      const mockProducts = Array.from({ length: 8 }, (_, i) => ({
        id: `cat-${categoryId}-prod-${i + 1}`,
        name: `${selectedCategory.name} Product ${i + 1}`,
        price: Math.floor(Math.random() * 200) + 20,
        originalPrice: Math.floor(Math.random() * 250) + 50,
        rating: (Math.random() * 2 + 3).toFixed(1),
        reviews: Math.floor(Math.random() * 500) + 10,
        category: selectedCategory.name,
        image: null,
        stock: Math.floor(Math.random() * 20) + 1
      }));
      
      setProducts(mockProducts);
    } catch (error) {
      toast.error('Failed to load products');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    if (selectedCategory?.id === category.id) {
      setSelectedCategory(null);
      setProducts([]);
    } else {
      setSelectedCategory(category);
    }
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setProducts([]);
  };

  if (loading && categories.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">
                {selectedCategory ? selectedCategory.name : 'Categories'}
              </h1>
              {selectedCategory && (
                <button
                  onClick={handleBackToCategories}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  ← Back to Categories
                </button>
              )}
            </div>
            
            {selectedCategory && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <FiGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <FiList className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedCategory ? (
          // Categories Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-left hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{category.icon}</div>
                  <FiChevronRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {category.productCount} products
                  </span>
                  <span className="text-xs text-indigo-600 font-medium">
                    Browse →
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          // Category Products
          <div>
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-4xl">{selectedCategory.icon}</div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedCategory.name}
                  </h2>
                  <p className="text-gray-600">
                    {selectedCategory.description}
                  </p>
                </div>
              </div>
              
              {/* Subcategories */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategory.subcategories.map((subcategory) => (
                  <button
                    key={subcategory}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200"
                  >
                    {subcategory}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <ProductGrid
              products={products}
              loading={loading}
              layout={viewMode}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;

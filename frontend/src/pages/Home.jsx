import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiTruck, FiShield, FiRefreshCw, FiArrowRight, FiStar } from 'react-icons/fi';
import { productsAPI } from '../services/api';
import { sampleProducts } from '../data/sampleData';
import ProductCard from '../components/products/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    const fetchHomeData = async () => {
      if (!mounted) return;
      
      try {
        // Fetch featured products
        const featuredResponse = await productsAPI.getFeaturedProducts();
        if (mounted) {
          const featured = featuredResponse.data.length > 0 
            ? featuredResponse.data.slice(0, 8)
            : sampleProducts.filter(p => p.isFeatured).slice(0, 8);
          setFeaturedProducts(featured);
        }

        // Fetch new products
        const newResponse = await productsAPI.getProducts({
          limit: 8,
          sortBy: 'createdAt',
          sortOrder: 'desc'
        });
        if (mounted) {
          const newProducts = newResponse.data.products?.length > 0
            ? newResponse.data.products
            : sampleProducts.slice(0, 8);
          setNewProducts(newProducts);
        }
      } catch (error) {
        // Silently handle errors - use sample data
        if (mounted) {
          setFeaturedProducts(sampleProducts.filter(p => p.isFeatured).slice(0, 8));
          setNewProducts(sampleProducts.slice(0, 8));
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    // Only load once, no timeout
    if (mounted) {
      fetchHomeData();
    }

    return () => {
      mounted = false;
    };
  }, []);

  const features = [
    {
      icon: FiTruck,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $100',
    },
    {
      icon: FiShield,
      title: 'Secure Payment',
      description: '100% secure payment process',
    },
    {
      icon: FiRefreshCw,
      title: 'Easy Returns',
      description: '30-day return policy',
    },
    {
      icon: FiShoppingBag,
      title: 'Best Quality',
      description: 'Premium quality products',
    },
  ];

  const categories = [
    {
      name: 'Electronics',
      image: 'https://via.placeholder.com/300x200/3b82f6/ffffff?text=Electronics',
      path: '/products?category=electronics',
    },
    {
      name: 'Clothing',
      image: 'https://via.placeholder.com/300x200/10b981/ffffff?text=Clothing',
      path: '/products?category=clothing',
    },
    {
      name: 'Books',
      image: 'https://via.placeholder.com/300x200/f59e0b/ffffff?text=Books',
      path: '/products?category=books',
    },
    {
      name: 'Home & Living',
      image: 'https://via.placeholder.com/300x200/ef4444/ffffff?text=Home',
      path: '/products?category=home',
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Discover Amazing Products
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 animate-slide-up">
              Shop the latest trends with unbeatable prices and quality you can trust.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold inline-flex items-center justify-center"
              >
                Shop Now
                <FiArrowRight className="ml-2" />
              </Link>
              <Link
                to="/products?featured=true"
                className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 text-lg font-semibold"
              >
                Featured Products
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-primary-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-primary-400 rounded-full opacity-20 animate-pulse"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center group cursor-pointer"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-primary-600 group-hover:text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-gray-600 text-lg">Browse our wide range of products</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.path}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-white text-xl font-semibold">{category.name}</h3>
                    <p className="text-white/80 text-sm">Shop Now →</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
              <p className="text-gray-600 text-lg">Handpicked products just for you</p>
            </div>
            <Link
              to="/products?featured=true"
              className="btn btn-outline inline-flex items-center"
            >
              View All
              <FiArrowRight className="ml-2" />
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No featured products available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">New Arrivals</h2>
              <p className="text-gray-600 text-lg">Check out our latest products</p>
            </div>
            <Link
              to="/products?sort=createdAt&order=desc"
              className="btn btn-outline inline-flex items-center"
            >
              View All
              <FiArrowRight className="ml-2" />
            </Link>
          </div>

          {newProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No new products available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay in the Loop
            </h2>
            <p className="text-primary-100 text-lg mb-8">
              Subscribe to our newsletter for exclusive offers and new product updates
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                className="btn bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 font-semibold"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Trusted by Thousands</h2>
            <div className="flex justify-center items-center space-x-8">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="w-5 h-5 fill-current text-yellow-400" />
                ))}
                <span className="ml-2 text-gray-600">4.8/5 Rating</span>
              </div>
              <div className="text-gray-400">|</div>
              <div className="text-gray-600">10,000+ Happy Customers</div>
              <div className="text-gray-400">|</div>
              <div className="text-gray-600">24/7 Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiStar, FiTruck, FiShield, FiRefreshCw, FiMinus, FiPlus, FiShare2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import AddToCartButton from './AddToCartButton';

/**
 * ProductDetail component - Detailed product view
 */
const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Mock product data - in real app, this would come from API
  const mockProduct = {
    id: id,
    name: 'Premium Wireless Headphones',
    description: 'Experience premium sound quality with our flagship wireless headphones. Featuring advanced noise cancellation, 30-hour battery life, and superior comfort for all-day wear.',
    price: 299.99,
    originalPrice: 399.99,
    images: [
      '/assets/images/headphones.jpg',
      '/assets/images/headphones.jpg',
      '/assets/images/headphones.jpg'
    ],
    category: 'Electronics',
    brand: 'AudioTech',
    rating: 4.5,
    reviews: 234,
    stock: 15,
    sku: 'WH-1000',
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Bluetooth 5.0',
      'Premium comfort padding',
      'Foldable design'
    ],
    specifications: {
      'Driver Size': '40mm',
      'Frequency Response': '20Hz - 20kHz',
      'Impedance': '32 Ohms',
      'Battery Life': '30 hours',
      'Charging Time': '2 hours',
      'Weight': '250g'
    },
    sizes: ['One Size'],
    colors: ['Black', 'Silver', 'Blue'],
    shipping: {
      free: true,
      delivery: '2-3 business days'
    },
    warranty: '2 years'
  };

  React.useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProduct(mockProduct);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(prev => Math.min(prev + 1, product.stock));
    } else {
      setQuantity(prev => Math.max(prev - 1, 1));
    }
  };

  const handleAddToWishlist = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add to wishlist');
      return;
    }
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const renderImageGallery = () => (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={product.images[selectedImage]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.originalPrice > product.price && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}
      </div>

      {/* Thumbnail Images */}
      <div className="flex space-x-2">
        {product.images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
              selectedImage === index ? 'border-indigo-500' : 'border-gray-200'
            }`}
          >
            <img
              src={image}
              alt={`${product.name} ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );

  const renderProductInfo = () => (
    <div className="space-y-6">
      {/* Title and Rating */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {product.name}
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center space-x-3">
        <span className="text-3xl font-bold text-gray-900">
          {formatPrice(product.price)}
        </span>
        {product.originalPrice > product.price && (
          <span className="text-lg text-gray-500 line-through">
            {formatPrice(product.originalPrice)}
          </span>
        )}
      </div>

      {/* SKU and Stock */}
      <div className="flex items-center space-x-6 text-sm">
        <span className="text-gray-600">
          SKU: {product.sku}
        </span>
        <span className={`font-medium ${
          product.stock > 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
        </span>
      </div>

      {/* Size and Color Selection */}
      <div className="space-y-4">
        {product.sizes.length > 1 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Size
            </label>
            <div className="flex space-x-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                    selectedSize === size
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.colors.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <div className="flex space-x-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                    selectedColor === color
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quantity and Add to Cart */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleQuantityChange('decrease')}
              disabled={quantity <= 1}
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiMinus className="h-4 w-4" />
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Math.min(parseInt(e.target.value) || 1, product.stock)))}
              className="w-20 text-center border border-gray-300 rounded-md px-3 py-2"
              min="1"
              max={product.stock}
            />
            <button
              onClick={() => handleQuantityChange('increase')}
              disabled={quantity >= product.stock}
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiPlus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex space-x-3">
          <AddToCartButton
            product={product}
            quantity={quantity}
            className="flex-1"
            size="lg"
          />
          <button
            onClick={handleAddToWishlist}
            className="p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            title="Add to wishlist"
          >
            <FiHeart className={`h-5 w-5 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            title="Share product"
          >
            <FiShare2 className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderFeatures = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Key Features
        </h3>
        <ul className="space-y-2">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Specifications
        </h3>
        <dl className="space-y-3">
          {Object.entries(product.specifications).map(([key, value]) => (
            <div key={key} className="flex justify-between py-2 border-b border-gray-100">
              <dt className="text-sm font-medium text-gray-600">{key}</dt>
              <dd className="text-sm text-gray-900">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );

  const renderTrustBadges = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
        <FiTruck className="h-6 w-6 text-green-600" />
        <div>
          <h4 className="text-sm font-medium text-green-900">Free Shipping</h4>
          <p className="text-xs text-green-700">On orders over $50</p>
        </div>
      </div>
      <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
        <FiShield className="h-6 w-6 text-blue-600" />
        <div>
          <h4 className="text-sm font-medium text-blue-900">{product.warranty} Warranty</h4>
          <p className="text-xs text-blue-700">Manufacturer warranty</p>
        </div>
      </div>
      <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
        <FiRefreshCw className="h-6 w-6 text-purple-600" />
        <div>
          <h4 className="text-sm font-medium text-purple-900">Easy Returns</h4>
          <p className="text-xs text-purple-700">30-day return policy</p>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Product not found
          </h2>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link to="/products" className="text-gray-500 hover:text-gray-700">
              Products
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div>
            {renderImageGallery()}
          </div>

          {/* Right Column - Product Info */}
          <div>
            {renderProductInfo()}
          </div>
        </div>

        {/* Bottom Section - Features and Trust Badges */}
        <div className="mt-12 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              {renderFeatures()}
            </div>
            <div>
              {/* Product Description */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {renderTrustBadges()}
      </div>
    </div>
  );
};

export default ProductDetail;

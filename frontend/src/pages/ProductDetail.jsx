import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiStar, FiTruck, FiShield, FiRefreshCw, FiMinus, FiPlus } from 'react-icons/fi';
import { productsAPI } from '../services/api';
import { sampleProducts } from '../data/sampleData';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productsAPI.getProduct(id);
        setProduct(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching product:', error);
        // Try to find product in sample data
        const sampleProduct = sampleProducts.find(p => p._id === id);
        if (sampleProduct) {
          setProduct(sampleProduct);
          setError(null);
        } else {
          setError('Product not found');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.info('Please login to add items to cart');
      return;
    }

    if (product.inventory.quantity === 0) {
      toast.error('This product is out of stock');
      return;
    }

    if (quantity > product.inventory.quantity) {
      toast.error(`Only ${product.inventory.quantity} items available`);
      return;
    }

    setIsAddingToCart(true);
    
    try {
      const result = await addToCart(product._id, quantity);
      if (result.success) {
        toast.success(`${quantity} ${product.name} added to cart!`);
      } else {
        toast.error(result.error || 'Failed to add item to cart');
      }
    } catch (error) {
      toast.error('An error occurred while adding to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.inventory?.quantity || 1)) {
      setQuantity(newQuantity);
    }
  };

  const handleImageSelect = (index) => {
    setSelectedImage(index);
  };

  const isInCartLocal = false; // Simplified - you can implement cart checking logic later

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container-custom py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Link to="/products" className="btn btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const discountPercentage = product.discountedPrice 
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
    : 0;

  return (
    <div className="container-custom py-8">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm">
        <ol className="flex items-center space-x-2">
          <li><Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link></li>
          <li className="text-gray-400">/</li>
          <li><Link to="/products" className="text-gray-500 hover:text-gray-700">Products</Link></li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-900 capitalize">{product.category}</li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-900 truncate">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.images?.[selectedImage]?.url || 'https://via.placeholder.com/600x600/f3f4f6/6b7280?text=No+Image'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          {product.images && product.images.length > 1 && (
            <div className="flex space-x-4 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleImageSelect(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-primary-600' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          {/* Product Title and Category */}
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.ratings?.average || 0)
                      ? 'fill-current text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.ratings?.average || 0} ({product.ratings?.count || 0} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold text-primary-600">
                ${product.discountedPrice || product.price}
              </span>
              {product.discountedPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ${product.price}
                  </span>
                  <span className="bg-error-100 text-error-800 px-2 py-1 rounded-md text-sm font-semibold">
                    -{discountPercentage}%
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              product.inventory?.quantity > 0 ? 'bg-success-500' : 'bg-error-500'
            }`}></div>
            <span className={`text-sm font-medium ${
              product.inventory?.quantity > 0 ? 'text-success-600' : 'text-error-600'
            }`}>
              {product.inventory?.quantity > 0 
                ? `In Stock (${product.inventory.quantity} available)`
                : 'Out of Stock'
              }
            </span>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiMinus className="w-4 h-4" />
                </button>
                <span className="w-16 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.inventory?.quantity}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart || product.inventory?.quantity === 0}
                className={`btn ${
                  isInCartLocal
                    ? 'bg-success-600 hover:bg-success-700 text-white'
                    : 'btn-primary'
                } flex-1 py-3 text-base font-semibold ${
                  product.inventory?.quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isAddingToCart ? (
                  <span className="flex items-center justify-center">
                    <div className="spinner w-5 h-5 mr-2"></div>
                    Adding...
                  </span>
                ) : isInCartLocal ? (
                  'In Cart'
                ) : product.inventory?.quantity === 0 ? (
                  'Out of Stock'
                ) : (
                  <>
                    <FiShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </>
                )}
              </button>

              <button
                className="btn btn-outline p-3"
                title="Add to Wishlist"
              >
                <FiHeart className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Product Features */}
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4">Product Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <FiTruck className="w-5 h-5 text-primary-600" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <FiShield className="w-5 h-5 text-primary-600" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <FiRefreshCw className="w-5 h-5 text-primary-600" />
                <span>30-Day Returns</span>
              </div>
            </div>
          </div>

          {/* Product Details */}
          {product.specifications && (
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {Object.entries(product.specifications).map(([key, value]) => (
                  value && (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600 capitalize">{key}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* SKU */}
          <div className="border-t pt-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">SKU:</span>
              <span className="font-medium">{product.sku}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

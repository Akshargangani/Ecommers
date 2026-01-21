const Product = require('../models/Product');
const { validationResult } = require('express-validator');

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Private/Admin
 */
const createProduct = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const productData = {
      ...req.body,
      user: req.user.id // Track which admin created the product
    };

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    console.error('Create product error:', error);
    
    // Handle duplicate SKU error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Product with this SKU already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating product'
    });
  }
};

/**
 * @desc    Get all products with pagination, filtering, and search
 * @route   GET /api/products
 * @access  Public
 */
const getProducts = async (req, res) => {
  try {
    // Extract query parameters
    const {
      page = 1,
      limit = 10,
      category,
      subcategory,
      brand,
      minPrice,
      maxPrice,
      rating,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      featured,
      active
    } = req.query;

    // Build filter object
    const filter = {};

    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (brand) filter.brand = brand;
    if (rating) filter['ratings.average'] = { $gte: parseFloat(rating) };
    if (featured !== undefined) filter.isFeatured = featured === 'true';
    if (active !== undefined) filter.isActive = active === 'true';

    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    // Search functionality
    if (search) {
      filter.$text = { $search: search };
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Execute query with pagination
    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .populate('reviews.user', 'name');

    // Get total count for pagination info
    const total = await Product.countDocuments(filter);

    // Calculate pagination info
    const pages = Math.ceil(total / limitNum);
    const hasNextPage = pageNum < pages;
    const hasPrevPage = pageNum > 1;

    res.status(200).json({
      success: true,
      data: {
        products,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages,
          hasNextPage,
          hasPrevPage
        }
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching products'
    });
  }
};

/**
 * @desc    Get single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('reviews.user', 'name');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Get product by ID error:', error);
    
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while fetching product'
    });
  }
};

/**
 * @desc    Update a product
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
const updateProduct = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Update product
    product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Return the modified document
        runValidators: true // Run model validators on update
      }
    );

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    console.error('Update product error:', error);
    
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
    }

    // Handle duplicate SKU error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Product with this SKU already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating product'
    });
  }
};

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while deleting product'
    });
  }
};

/**
 * @desc    Create product review
 * @route   POST /api/products/:id/reviews
 * @access  Private
 */
const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if user already reviewed this product
    const alreadyReviewed = product.reviews.find(
      review => review.user.toString() === req.user.id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: 'Product already reviewed'
      });
    }

    // Add review
    const review = {
      user: req.user.id,
      rating: parseInt(rating),
      comment
    };

    product.reviews.push(review);
    await product.save();

    res.status(201).json({
      success: true,
      message: 'Review added successfully'
    });
  } catch (error) {
    console.error('Create product review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding review'
    });
  }
};

/**
 * @desc    Get featured products
 * @route   GET /api/products/featured
 * @access  Public
 */
const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ 
      isFeatured: true, 
      isActive: true 
    })
    .sort({ createdAt: -1 })
    .limit(8);

    res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Get featured products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching featured products'
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProductReview,
  getFeaturedProducts
};

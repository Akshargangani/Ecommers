import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { cartAPI } from '../services/api';

// Initial state
const initialState = {
  cartItems: [],
  isLoading: false,
  error: null,
  totalItems: 0,
  totalPrice: 0,
};

// Action types
const CART_ACTIONS = {
  ADD_TO_CART_START: 'ADD_TO_CART_START',
  ADD_TO_CART_SUCCESS: 'ADD_TO_CART_SUCCESS',
  ADD_TO_CART_FAILURE: 'ADD_TO_CART_FAILURE',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_CART_QUANTITY: 'UPDATE_CART_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART',
  CALCULATE_TOTALS: 'CALCULATE_TOTALS',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_TO_CART_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case CART_ACTIONS.ADD_TO_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cartItems: action.payload,
        error: null,
      };

    case CART_ACTIONS.ADD_TO_CART_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case CART_ACTIONS.REMOVE_FROM_CART:
      const updatedCartAfterRemoval = state.cartItems.filter(
        item => item.product !== action.payload
      );
      return {
        ...state,
        cartItems: updatedCartAfterRemoval,
      };

    case CART_ACTIONS.UPDATE_CART_QUANTITY:
      const updatedCartAfterQuantity = state.cartItems.map(item =>
        item.product === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        ...state,
        cartItems: updatedCartAfterQuantity,
      };

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
        totalItems: 0,
        totalPrice: 0,
      };

    case CART_ACTIONS.LOAD_CART:
      return {
        ...state,
        cartItems: action.payload,
      };

    case CART_ACTIONS.CALCULATE_TOTALS:
      const totalItems = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      const totalPrice = state.cartItems.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
      );
      return {
        ...state,
        totalItems,
        totalPrice,
      };

    case CART_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Create context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on component mount and sync with backend
  useEffect(() => {
    let mounted = true;
    
    const loadCart = async () => {
      if (!mounted) return;
      
      // First try localStorage, then backend
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart && mounted) {
          const cartData = JSON.parse(savedCart);
          dispatch({
            type: CART_ACTIONS.LOAD_CART,
            payload: cartData,
          });
        }
      } catch (localError) {
        console.error('Error loading cart from localStorage:', localError);
      }

      // Only try backend if user is authenticated
      const token = localStorage.getItem('token');
      if (token && mounted) {
        try {
          const response = await cartAPI.getCart();
          if (response.success && mounted) {
            dispatch({
              type: CART_ACTIONS.LOAD_CART,
              payload: response.data.cartItems || response.data,
            });
          }
        } catch (error) {
          // Silently handle backend errors - no console logs
          // Cart is already loaded from localStorage above
        }
      }
    };

    // Only load once, no timeout
    if (mounted) {
      loadCart();
    }

    return () => {
      mounted = false;
    };
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (state.cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    } else {
      localStorage.removeItem('cart');
    }
    
    // Calculate totals whenever cart items change
    dispatch({ type: CART_ACTIONS.CALCULATE_TOTALS });
  }, [state.cartItems]);

  // Add item to cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      dispatch({ type: CART_ACTIONS.ADD_TO_CART_START });

      console.log('Adding to cart:', { productId, quantity });
      
      // Call backend API
      const response = await cartAPI.addToCart(productId, quantity);
      
      console.log('Cart API response:', response);
      
      if (response.success) {
        // Load updated cart from backend
        const cartResponse = await cartAPI.getCart();
        console.log('Cart load response:', cartResponse);
        
        dispatch({
          type: CART_ACTIONS.ADD_TO_CART_SUCCESS,
          payload: cartResponse.data.cartItems || cartResponse.data,
        });

        return { success: true };
      } else {
        throw new Error(response.message || 'Failed to add item to cart');
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      dispatch({
        type: CART_ACTIONS.ADD_TO_CART_FAILURE,
        payload: error.message || 'Failed to add item to cart',
      });
      return { success: false, error: error.message || 'Failed to add item to cart' };
    }
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_FROM_CART,
      payload: productId,
    });
  };

  // Update item quantity in cart
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    dispatch({
      type: CART_ACTIONS.UPDATE_CART_QUANTITY,
      payload: { productId, quantity },
    });
  };

  // Clear entire cart
  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  // Get cart item count
  const getCartItemCount = () => {
    return state.totalItems;
  };

  // Get cart total price
  const getCartTotal = () => {
    return state.totalPrice;
  };

  // Check if product is in cart
  const isInCart = (productId) => {
    return state.cartItems.some(item => item.product === productId);
  };

  // Get item quantity in cart
  const getItemQuantity = (productId) => {
    const item = state.cartItems.find(item => item.product === productId);
    return item ? item.quantity : 0;
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_ERROR });
  };

  // Get cart totals for summary
  const getCartTotals = () => {
    const subtotal = state.cartItems.reduce(
      (total, item) => total + (item.price * item.quantity),
      0
    );
    
    const shipping = subtotal >= 50 ? 0 : 5.99;
    const tax = subtotal * 0.08; // 8% tax rate
    const discount = 0; // Can be calculated based on promo codes
    const total = subtotal + shipping + tax - discount;
    
    return {
      subtotal,
      shipping,
      tax,
      discount,
      total
    };
  };

  // Get formatted cart items for components
  const getCartItems = () => {
    return state.cartItems.map(item => ({
      id: item.product || item.id,
      name: item.name || `Product ${item.product || item.id}`,
      price: item.price || 0,
      quantity: item.quantity || 1,
      image: item.image || null,
      category: item.category || 'Product',
      stock: item.stock || 10
    }));
  };

  // Value object to be provided to consumers
  const value = {
    ...state,
    items: getCartItems(),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemCount,
    getCartTotal,
    getCartTotals,
    isInCart,
    getItemQuantity,
    clearError,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;

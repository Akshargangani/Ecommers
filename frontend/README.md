# Ecommerce Frontend

A modern, responsive e-commerce frontend application built with React and Tailwind CSS.

## 🚀 Features

### Product Discovery
- **Advanced Search**: Real-time search with suggestions and auto-complete
- **Smart Filtering**: Filter by category, price, rating, brand, and more
- **Product Categories**: Browse products organized by categories
- **Product Details**: Detailed product views with specifications and reviews
- **Wishlist**: Save favorite products for later

### Shopping Experience
- **Shopping Cart**: Full cart management with quantity controls
- **Multi-step Checkout**: Secure checkout process with validation
- **Order Management**: Track orders and view order history
- **User Profiles**: Comprehensive user account management

### Admin Features
- **Admin Dashboard**: Complete admin management system
- **Product Management**: Add, edit, and manage products
- **Order Management**: Process and track orders
- **User Management**: Manage customer accounts
- **Analytics**: Sales and performance analytics

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Icons**: React Icons
- **Notifications**: React Toastify
- **Build Tool**: Create React App

## 📦 Installation

1. Clone the repository
2. Navigate to the frontend directory
3. Install dependencies:
   ```bash
   npm install
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm start
```
The application will be available at `http://localhost:3000`

### Production Build
```bash
npm run build
```
This creates an optimized production build in the `build` folder.

## 📁 Project Structure

```
src/
├── components/
│   ├── admin/          # Admin components
│   │   ├── AdminAnalytics.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminLayout.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── AdminOrders.jsx
│   │   ├── AdminProducts.jsx
│   │   ├── AdminSettings.jsx
│   │   └── AdminUsers.jsx
│   ├── auth/           # Authentication components
│   ├── cart/           # Shopping cart components
│   │   ├── Cart.jsx
│   │   ├── CartItem.jsx
│   │   └── CartSummary.jsx
│   ├── checkout/       # Checkout flow components
│   │   ├── Checkout.jsx
│   │   ├── CheckoutForm.jsx
│   │   └── OrderSummary.jsx
│   ├── common/         # Shared components
│   │   ├── ErrorMessage.jsx
│   │   ├── EmptyState.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── AdminRoute.jsx
│   ├── products/       # Product-related components
│   │   ├── AddToCartButton.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── ProductFilters.jsx
│   │   ├── ProductGrid.jsx
│   │   └── SearchBar.jsx
│   └── user/           # User profile components
│       ├── OrderHistory.jsx
│       ├── ProfileHeader.jsx
│       └── UserProfile.jsx
├── context/            # React Context providers
│   ├── AuthContext.js
│   └── CartContext.js
├── pages/              # Page components
│   ├── About.jsx
│   ├── Cart.jsx
│   ├── Categories.jsx
│   ├── Checkout.jsx
│   ├── Contact.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── NotFound.jsx
│   ├── OrderDetail.jsx
│   ├── Orders.jsx
│   ├── ProductDetail.jsx
│   ├── Products.jsx
│   ├── Profile.jsx
│   ├── Register.jsx
│   ├── Unauthorized.jsx
│   └── Wishlist.jsx
├── assets/             # Static assets
│   └── images/
│       ├── headphones.jpg
│       ├── logo.png
│       ├── shoes.jpg
│       ├── stand.jpg
│       └── watch.jpg
├── App.js              # Main App component
└── index.js            # Entry point
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENVIRONMENT=development
```

### Tailwind CSS Configuration
The project uses Tailwind CSS with custom configuration in `tailwind.config.js`.

## 🎯 Key Features

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interface

### State Management
- React Context for global state (Auth, Cart)
- Local storage for cart persistence
- Component-level state for UI interactions

### Error Handling
- Comprehensive error boundaries
- User-friendly error messages
- Retry mechanisms where applicable

### Performance
- Code splitting with React.lazy
- Optimized images and assets
- Efficient re-renders with React.memo

## 🔐 Authentication

The application includes:
- User registration and login
- Protected routes
- Admin role-based access
- Session management with local storage

## 🛒 Shopping Cart Features

- Add/remove items
- Quantity controls
- Price calculations
- Local storage persistence
- Cart item count badge in header

## 📦 Checkout Process

1. **Shipping Information**
2. **Payment Details**
3. **Order Review**
4. **Order Confirmation**

## 👤 User Profile

- Edit profile information
- View order history
- Manage wishlist
- Account settings

## 🎨 UI/UX Features

- Loading states and skeletons
- Empty states with helpful messages
- Toast notifications for user feedback
- Smooth transitions and animations
- Consistent design system

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Static File Serving
The build folder contains static files that can be served by any web server.

### Environment-Specific Builds
- Development: `npm start`
- Production: `npm run build`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository.

---

**Note**: This frontend is designed to work with a backend API. Currently, it uses mock data for demonstration purposes. To connect to a real backend, update the API endpoints in the context providers.

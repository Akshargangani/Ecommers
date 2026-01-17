# E-commerce MERN Stack project

A full-stack e-commerce website built with MERN stack (MongoDB, Express.js, React, Node.js) featuring user authentication, admin dashboard, and complete product/order management.

## Project Overview

This is a complete e-commerce solution with both frontend and backend components:

- **Frontend**: React 18 with Tailwind CSS, modern UI/UX
- **Backend**: Node.js, Express.js, MongoDB
- **Features**: Complete shopping experience from product discovery to checkout
- **Admin**: Comprehensive admin dashboard with analytics

## Live Demo

Frontend: [Deployed Frontend URL]  
Backend: [Deployed Backend API URL]

## Features

### User Features
- **Authentication**: User registration, login, and profile management
- **Product Discovery**: Browse products by category, search, and advanced filtering
- **Shopping Cart**: Add/remove items, quantity controls, persistent cart
- **Checkout**: Multi-step secure checkout process with validation
- **Order Management**: Order history, tracking, and detailed order views
- **Wishlist**: Save favorite products for later purchase
- **User Profile**: Complete profile management with settings

### Admin Features
- **Admin Dashboard**: Comprehensive analytics and management interface
- **Product Management**: Full CRUD operations for products
- **Order Management**: Process, track, and manage orders
- **User Management**: Manage customer accounts and permissions
- **Analytics**: Sales reports, user analytics, and performance metrics
- **Settings**: Configure store settings and preferences

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks and context
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Context** - State management
- **React Icons** - Icon library
- **React Toastify** - Notification system
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **multer** - File uploads

## Project Structure

```
Ecommers/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── context/         # React Context providers
│   │   ├── pages/           # Page components
│   │   ├── assets/          # Images and static files
│   │   └── App.js           # Main App component
│   ├── package.json
│   └── README.md            # Frontend documentation
├── backend/                 # Node.js backend application
│   ├── controllers/          # Route controllers
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── config/              # Configuration files
│   └── server.js            # Server entry point
├── README.md                # This file
└── .gitignore
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Akshargangani/Ecommers.git
   cd Ecommers
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Set up environment variables**
   ```bash
   # Backend
   cd backend
   cp .env.example .env
   # Edit .env with your configuration
   
   # Frontend
   cd ../frontend
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Start the applications**
   
   **Start Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   
   **Start Frontend:**
   ```bash
   cd frontend
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Documentation

- [Frontend Documentation](./frontend/README.md)
- [Deployment Guide](./frontend/DEPLOYMENT.md)
- [API Documentation](./backend/API.md) (coming soon)

## Configuration

### Environment Variables

**Backend (.env):**
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
```

**Frontend (.env):**
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENVIRONMENT=development
```

## Key Features in Detail

### Shopping Experience
- **Product Catalog**: Organized by categories with search and filtering
- **Product Details**: Comprehensive product information with images and reviews
- **Shopping Cart**: Real-time cart updates with local storage persistence
- **Checkout Process**: Secure multi-step checkout with form validation
- **Order Tracking**: Complete order history with status updates

### User Management
- **Authentication**: Secure JWT-based authentication
- **Profile Management**: Edit user information and preferences
- **Order History**: View and track all past orders
- **Wishlist**: Save and manage favorite products

### Admin Dashboard
- **Analytics Dashboard**: Sales, orders, and user analytics
- **Product Management**: Add, edit, delete products with images
- **Order Management**: Process and track customer orders
- **User Management**: Manage customer accounts and permissions
- **Settings**: Configure store-wide settings

## UI/UX Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Loading States**: Professional loading indicators and skeleton screens
- **Error Handling**: Comprehensive error states and user feedback
- **Toast Notifications**: Non-intrusive success/error messages
- **Form Validation**: Client-side and server-side validation
- **Accessibility**: ARIA labels and keyboard navigation support

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Input Validation**: Comprehensive input sanitization
- **CORS Configuration**: Proper cross-origin resource sharing
- **Rate Limiting**: API rate limiting (backend)
- **Security Headers**: Proper security headers configuration

## Performance

- **Code Splitting**: Automatic code splitting with React.lazy
- **Image Optimization**: Optimized images and lazy loading
- **Caching**: Browser caching and API response caching
- **Minification**: Minified CSS and JavaScript in production
- **Compression**: Gzip compression for faster loading

## Deployment

### Frontend Deployment
See [Frontend Deployment Guide](./frontend/DEPLOYMENT.md) for detailed instructions.

### Backend Deployment
1. **Prepare production environment**
2. **Set up MongoDB database**
3. **Configure environment variables**
4. **Deploy to hosting platform** (Heroku, AWS, DigitalOcean, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Open an issue in the repository
- Check the documentation
- Review the FAQ section (coming soon)

## Roadmap

- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] Real-time inventory management
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Advanced search with Elasticsearch
- [ ] Email notifications
- [ ] Social login integration

---

**Built with ❤️ using the MERN stack**

## Technology Stack

### Frontend
- React 18
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- React Icons for UI icons
- React Toastify for notifications

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing
- cors for cross-origin requests
- dotenv for environment variables

## Project Structure

```
ecommerce-mern/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── admin.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   └── users.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── auth/
│   │   │   ├── products/
│   │   │   ├── cart/
│   │   │   └── admin/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── utils/
│   │   └── App.js
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## Installation

### Backend Setup
1. Navigate to backend directory
2. Install dependencies: `npm install`
3. Create `.env` file with environment variables
4. Start the server: `npm run dev`

### Frontend Setup
1. Navigate to frontend directory
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## Environment Variables

Create a `.env` file in the backend directory:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - User login
- GET /api/auth/profile - Get user profile

### Products
- GET /api/products - Get all products
- GET /api/products/:id - Get single product
- POST /api/products - Create product (Admin only)
- PUT /api/products/:id - Update product (Admin only)
- DELETE /api/products/:id - Delete product (Admin only)

### Orders
- POST /api/orders - Create new order
- GET /api/orders/myorders - Get user orders
- GET /api/orders - Get all orders (Admin only)
- PUT /api/orders/:id/deliver - Mark order as delivered (Admin only)

## Usage

1. Register as a new user or login
2. Browse products and add items to cart
3. Proceed to checkout and place order
4. Admin users can manage products and orders through the admin dashboard

## Contributing

This project follows clean code principles and best practices for MERN stack development.
# Ecommers

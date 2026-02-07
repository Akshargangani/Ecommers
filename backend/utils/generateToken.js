const jwt = require('jsonwebtoken');

/**
 * Generate JWT token for user authentication
 * @param {string} id - User ID
 * @returns {string} JWT token
 */
const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
  return jwt.sign({ id }, secret, {
    expiresIn: '30d', // Token expires in 30 days
  });
};

module.exports = generateToken;

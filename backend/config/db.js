const mongoose = require('mongoose');

/**
 * Database connection configuration
 * Connects to MongoDB using the connection string from environment variables
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;

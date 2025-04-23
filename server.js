const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from the .env file

const app = express();
const PORT = 5000;

// Import routes
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const stripeRoutes = require('./routes/stripeRoutes');
const pushNotificationRoutes = require('./routes/pushNotificationRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/your_database_name')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((error) => console.log('❌ MongoDB connection error:', error));

// Use routes
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);
app.use('/stripe', stripeRoutes);
app.use('/push', pushNotificationRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

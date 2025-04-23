// routes.js
const express = require('express');
const router = express.Router();
const Product = require('./models/Product');
const Order = require('./models/Order');

// Define your routes
router.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.post('/place-order', async (req, res) => {
  const order = new Order({ items: req.body.cart });
  await order.save();
  res.status(200).json({ message: 'Order placed successfully', order });
});

module.exports = router;

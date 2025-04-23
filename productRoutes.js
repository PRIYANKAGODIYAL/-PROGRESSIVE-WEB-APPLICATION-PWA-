const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch from DB
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load products' });
  }
});

module.exports = router;

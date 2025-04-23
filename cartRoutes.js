const express = require('express');
const router = express.Router();

// In-memory cart (not persistent)
let cart = [];

// Add product to cart
router.post('/', async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    if (product) {
      cart.push(product); // Add product to in-memory cart
      res.status(200).json({ message: 'Item added to cart', cart });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error adding to cart' });
  }
});

// View cart
router.get('/', (req, res) => {
  res.json(cart);
});

// Remove from cart
router.post('/remove', (req, res) => {
  const { productId } = req.body;
  cart = cart.filter(item => item._id.toString() !== productId);
  res.json({ message: 'Item removed from cart', cart });
});

module.exports = router;

const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// Place order (save to DB)
router.post('/place-order', async (req, res) => {
  try {
    const order = new Order({ items: req.body.cart });
    await order.save();
    cart = [];
    res.status(200).json({ message: 'Order placed successfully', order });
  } catch (err) {
    res.status(500).json({ error: 'Failed to place order' });
  }
});

module.exports = router;

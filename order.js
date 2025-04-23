// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  cart: Array,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);

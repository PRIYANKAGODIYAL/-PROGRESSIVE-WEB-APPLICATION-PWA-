const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
});

// Create a model from the schema
const Product = mongoose.model('Product', productSchema);

// Export the Product model
module.exports = Product;

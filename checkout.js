// js/checkout.js

// Load cart from localStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItemsDiv = document.getElementById('cartItems');
const orderStatusDiv = document.getElementById('orderStatus');

// Display items in cart
if (cart.length === 0) {
  cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
} else {
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    cartItemsDiv.innerHTML += `
      <div style="margin-bottom: 10px;">
        <strong>${item.name}</strong> - ₹${item.price} × ${item.quantity}
      </div>
    `;
  });

  cartItemsDiv.innerHTML += `<hr><p><strong>Total:</strong> ₹${total.toFixed(2)}</p>`;
}

// Handle Place Order button click
document.getElementById('placeOrderBtn').addEventListener('click', () => {
  if (cart.length === 0) {
    orderStatusDiv.innerHTML = "<p style='color: red;'>Cart is empty!</p>";
    return;
  }

  // Simulate order placement
  document.getElementById('placeOrderBtn').disabled = true;
  orderStatusDiv.innerHTML = "<p>Processing your order...</p>";

  setTimeout(() => {
    localStorage.removeItem('cart');
    orderStatusDiv.innerHTML = "<p style='color: green;'>🎉 Order placed successfully!</p>";
    cartItemsDiv.innerHTML = "";
  }, 2000);
});

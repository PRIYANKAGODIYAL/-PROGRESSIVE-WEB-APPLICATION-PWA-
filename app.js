const BASE_URL = 'http://localhost:5000'; // Backend API

// Load products from backend
async function loadProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  const products = await res.json();

  const productList = document.getElementById("productList");
  productList.innerHTML = products.map(p => `
    <div class="card">
      <img src="${BASE_URL}/images/${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart('${p._id}')">Add to Cart</button>
    </div>
  `).join("");
}

// Add product to backend cart
async function addToCart(productId) {
  const res = await fetch(`${BASE_URL}/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId })
  });

  const data = await res.json();
  alert(data.message || "Added to cart!");
}

// Load products on page load
window.onload = loadProducts;

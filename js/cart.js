const CART_KEY = "myapp-cart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(productId, qty = 1) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty });
  }
  saveCart(cart);
}

function removeFromCart(productId) {
  saveCart(getCart().filter((item) => item.id !== productId));
}

function setQty(productId, qty) {
  const cart = getCart();
  const item = cart.find((i) => i.id === productId);
  if (!item) return;
  if (qty <= 0) {
    removeFromCart(productId);
    return;
  }
  item.qty = qty;
  saveCart(cart);
}

function cartItemCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function formatPrice(amount) {
  return "$" + amount.toFixed(2);
}

function updateCartBadge() {
  const count = cartItemCount();
  document.querySelectorAll(".cart-count").forEach((el) => {
    el.textContent = count;
    el.style.display = count > 0 ? "inline-flex" : "none";
  });
}

document.addEventListener("DOMContentLoaded", updateCartBadge);

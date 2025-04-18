function addToCart(dishName) {
  cart = JSON.parse(localStorage.getItem("cart"));
  const dish = dishes.find((d) => d.name === dishName);

  if (dish) {
    const existingItem = cart.find((item) => item.name === dishName);

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      cart.push({ ...dish, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  updateCart();
}

function getCartTemplate() {
  return `
    <div class="cart-container">
      <h2 class="cart-title">Warenkorb</h2>
      <div class="cart-items">
        ${cart.map((item, index) => `
          <div class="cart-item">
            <div>
              <img class="cart-item-image" src="${item.image}" alt="${item.name}">
            </div>
            <p>${item.name}</p>
            <div class="amount-container">
            <input type="number" value="${item.quantity}" name="item-quantity" data-index="${index}" min="1">
            <p>Preis: ${item.price.toFixed(2)} €</p>
            </div>
            <div>
              <button class="remove-from-cart" onclick="removeFromCart('${item.name}')">
                <img src="./assets/img/icons/close.svg" alt="Entfernen">
              </button>
            </div>
          </div>
        `).join("")}
      </div>
      <div class="cart-total">
        <strong>Total: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)} €</strong>
      </div>
    </div>
  `;
}

function toggleCart() {
  const cartIcon = document.querySelector("#burger-menu-icon");
  cartIcon.classList.toggle("active");
  const container = document.getElementById("cart");
  container.classList.toggle("hidden");
  updateCart();
}

function updateCart() {
  const cartContainer = document.getElementById("cart");
  cartContainer.innerHTML = getCartTemplate();
  updateItemQuantity();
}

function removeFromCart(dishName) {
  cart = JSON.parse(localStorage.getItem("cart"));
  cart = cart.filter((item) => item.name !== dishName);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function updateItemQuantity() {
  cart = JSON.parse(localStorage.getItem("cart")); 
  const itemQuantities = document.querySelectorAll('input[name="item-quantity"]');

  itemQuantities.forEach((input, index) => {
    input.addEventListener("change", (event) => {
      const newQuantity = parseInt(event.target.value, 10);
      if (newQuantity > 0) {
        cart[index].quantity = newQuantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
      } else {
        alert("Die Menge muss mindestens 1 betragen.");
        event.target.value = cart[index].quantity;
      }
    });
  });
}

function getCartItemCount() {
  cart = JSON.parse(localStorage.getItem("cart"));
  return cart.reduce((acc, item) => acc + item.quantity, 0);
}


/* function updateCartIcon() {
  const cartIconNumber = document.querySelector(".cart-icon span");
  const itemCount = getCartItemCount();
  cartIconNumber.innerHTML = itemCount > 0 ? itemCount : "";
  
} 

updateCartIcon(); */

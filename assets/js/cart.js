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

function getCartItemsTemplate() {
  return cart.map((item, index) => `
    <tr class="cart-item">
      <td>
        <img class="cart-item-image" src="${item.image}" alt="${item.name}">
      </td>
      <td>${item.name}</td>
      <td>
        <div class="quantity-control">
          <button class="quantity-btn minus-btn" onclick="decreaseQuantity(${index})">-</button>
          <input type="number" value="${item.quantity}" name="item-quantity" data-index="${index}" min="1">
          <button class="quantity-btn plus-btn" onclick="increaseQuantity(${index})">+</button>
        </div>
        <p class="cart-item-price">Preis: ${(item.price * item.quantity).toFixed(2)} €</p>
      </td>
      <td>
        <svg class="bin-icon" id="bin-icon-${index}" width="200" height="300" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" onclick="removeFromCart('${item.name}')">
          <g id="muelleimer-gruppe">
            <rect id="tonne" x="45" y="85" width="110" height="150" fill="#ccc" stroke="#999" stroke-width="3" />
            <g id="deckel-gruppe">
              <rect id="deckel" x="30" y="65" width="140" height="30" rx="15" ry="15" fill="#ddd" stroke="#999" stroke-width="3" />
              <path id="handle" d="M70 65 Q100 25 130 65" fill="none" stroke="#999" stroke-width="3" />
            </g>
          </g>
        </svg>
      </td>
    </tr>
  `).join("");
}

function getCartTemplate() {
  return `
    <div class="cart-container">
      <h2 class="cart-title">Warenkorb</h2>
      <table class="cart-table">
        <tbody>
          ${getCartItemsTemplate()}
        </tbody>
      </table>
      <div class="cart-total">
        <strong>Total: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)} €</strong>
      </div>
      <button class="cart-checkout-btn">Zur Kasse</button>
    </div>
  `;
}

function toggleCart() {
  const cartIcon = document.querySelector("#burger-menu-icon");
  const mainContent = document.querySelector("#main-content");
  mainContent.classList.toggle("cart-open-width");
  cartIcon.classList.toggle("active");
  const container = document.getElementById("cart");
  container.classList.toggle("hidden");
  updateCart();
}

function updateCart() {
  const cartContainer = document.getElementById("cart");
  cartContainer.innerHTML = getCartTemplate();
  updateItemQuantity();
  updateItemPrice();
}

function updateItemQuantity() {
  const itemQuantities = document.querySelectorAll('input[name="item-quantity"]');

  itemQuantities.forEach((input) => {
    input.addEventListener("change", (event) => {
      const index = parseInt(event.target.dataset.index, 10); 
      const newQuantity = parseInt(event.target.value, 10);

      if (newQuantity > 0) {
        cart[index].quantity = newQuantity; 
        localStorage.setItem("cart", JSON.stringify(cart)); 
        updateCart(); 
      } else {
        removeFromCart(cart[index].name);
      }
    });
  });
}

function removeFromCart(dishName) {
  cart = JSON.parse(localStorage.getItem("cart"));
  cart = cart.filter((item) => item.name !== dishName);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function getCartItemCount() {
  cart = JSON.parse(localStorage.getItem("cart"));
  return cart.reduce((acc, item) => acc + item.quantity, 0);
}

function increaseQuantity(index) {
  cart[index].quantity += 1; 
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
  } else {
    removeFromCart(cart[index].name);
  }
}

function updateItemPrice() {
  const itemPrices = document.querySelectorAll(".cart-item-price");
  itemPrices.forEach((itemPrice, index) => {
    const price = cart[index].price * cart[index].quantity;
    itemPrice.innerHTML = `Preis: ${price.toFixed(2)} €`;
  });
}
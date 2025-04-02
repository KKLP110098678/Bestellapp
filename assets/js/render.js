function getDishTemplate(dish) {
  return `
    <div class="dish">
      <h2>${dish.name}</h2>
      <p>${dish.description}</p>
      <p>Price: $${dish.price}</p>
    </div>
    <div class="dish-actions">
        <div class="rating-container">
            <label for="rating">Rating:</label>
            <select id="rating" name="rating" onchange="updateRating('${dish.name}', this.value)">
                <option value="1"><img src="./assets/icons/star.svg"></option>
                <option value="2"><img src="./assets/icons/star.svg"></option>
                <option value="3"><img src="./assets/icons/star.svg"></option>
                <option value="4"><img src="./assets/icons/star.svg"></option>
                <option value="5"><img src="./assets/icons/star.svg"></option>
            </select>
        </div>
        <button class="add-to-cart" onclick="addToCart('${dish.name}')">Add to Cart</button>
    </div>
  `;
}

function renderDishes(dishes) {
  const dishContainer = document.getElementById("dish-container");
  dishContainer.innerHTML = dishes.map(getDishTemplate).join("");
}
function getDishTemplate(dish) {
  return `
  <div class="dish-container">
    <div class="dish">
      <img class="dish-image" src="${dish.image}" alt="${dish.name}">
      <div class="dish-info">
        <h2>${dish.name}</h2>
        <p>${dish.description}</p>
      </div>
    </div> 
    <div class="dish-actions">
      ${getRatingContainerTemplate(dish.id, 5)}
      <div class="dish-price-container">
        <span>Price: $${dish.price}</span>
        <button class="add-to-cart" onclick="addToCart('${dish.name}')">
          <img src="./assets/img/icons/add.svg">
        </button>
      </div>
    </div>
  </div>
  `;
}

function getRatingContainerTemplate(dishId, MaxRating) {
  return `
    <div id="rating-container-${dishId}" class="rating-container" onclick="storeProductRating('${dishId}')">
      ${Array.from({ length: MaxRating }, (_, i) => `
        <input type="radio" name="rating-${dishId}" id="rating${i + 1}-${dishId}" value="${i + 1}">
        <label for="rating${i + 1}-${dishId}">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon class="star-shape" points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </label>
      `).join("")}
    </div>
    `;
}


function renderDishes() {
  const dishContainer = document.querySelector("#dish-container");
  dishContainer.innerHTML = dishes.map(getDishTemplate).join("");
}

renderDishes();
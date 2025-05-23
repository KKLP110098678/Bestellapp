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

function groupDishesByCategory(dishes) {
  return dishes.reduce((categories, dish) => {
    const category = dish.category;
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(dish);
    return categories;
  }, {});
}

function renderDishes() {
  const dishContainer = document.querySelector("#dish-container");
  const groupedDishes = groupDishesByCategory(dishes);

  dishContainer.innerHTML = Object.entries(groupedDishes)
    .map(([category, dishes]) => `
      <div class="category-section" id="${category}">
        <h2 class="category-title">${category}</h2>
        <div class="category-dishes">
          ${dishes.map(getDishTemplate).join("")}
        </div>
      </div>
    `)
    .join("");
}

function getRestaurantCategories() {
  return [...new Set(dishes.map((dish) => dish.category))];
}

function renderCategories() {
  const categoriesContainer = document.querySelector("#categories");
  const categories = getRestaurantCategories();

  categoriesContainer.innerHTML = categories
    .map((category) => `
      <a href="#${category}" class="category-link">${category}</a>
    `)
    .join("");
}

renderCategories();
renderDishes();
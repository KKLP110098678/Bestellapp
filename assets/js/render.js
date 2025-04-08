function getDishTemplate(dish) {
  return `
  <div class="dish-container">
  <div class="dish">
      <img class="dish-image" src="${dish.image}" alt="${dish.name}">
      <h2>${dish.name}</h2>
      <p>${dish.description}</p>
      <p>Price: $${dish.price}</p>
    </div>
    <div class="dish-actions">
        <div class="rating-container">
          <input type="radio" name="rating-${dish.id}" id="rating1-${dish.id}">
          <label for="rating1-${dish.id}">
            <img class="rating-star" src="./assets/img/icons/star.svg" alt="Star">
          </label>
          <input type="radio" name="rating-${dish.id}" id="rating2-${dish.id}">
          <label for="rating2-${dish.id}">
            <img class="rating-star" src="./assets/img/icons/star.svg" alt="Star">
          </label>
          <input type="radio" name="rating-${dish.id}" id="rating3-${dish.id}">
          <label for="rating3-${dish.id}">
            <img class="rating-star" src="./assets/img/icons/star.svg" alt="Star">
          </label>
          <input type="radio" name="rating-${dish.id}" id="rating4-${dish.id}">
          <label for="rating4-${dish.id}">
            <img class="rating-star" src="./assets/img/icons/star.svg" alt="Star">
          </label>
          <input type="radio" name="rating-${dish.id}" id="rating5-${dish.id}">
          <label for="rating5-${dish.id}">
            <img class="rating-star" src="./assets/img/icons/star.svg" alt="Star">
          </label>
        </div>
        <button class="add-to-cart" onclick="addToCart('${dish.name}')"><img src="./assets/img/icons/add.svg"></button>
    </div>
  </div>
  `;
}

function renderDishes() {
  const dishContainer = document.querySelector("#dish-container");
  dishContainer.innerHTML = dishes.map(getDishTemplate).join("");
}

renderDishes();
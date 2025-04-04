function getDishTemplate(dish) {
  return `
  <div class="dish-container">

    <div class="dish">
      <h2>${dish.name}</h2>
      <p>${dish.description}</p>
      <p>Price: $${dish.price}</p>
    </div>
    <div class="dish-actions">
        <div class="rating-container">
          <div><img class="rating-star" src="./assets/img/icons/star.svg"></div>
          <div><img class="rating-star" src="./assets/img/icons/star.svg"></div>
          <div><img class="rating-star" src="./assets/img/icons/star.svg"></div>
          <div><img class="rating-star" src="./assets/img/icons/star.svg"></div>
          <div><img class="rating-star" src="./assets/img/icons/star.svg"></div>
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
if (localStorage.getItem("cart") === null) {
    localStorage.setItem("cart", JSON.stringify([]));
}

let cart = JSON.parse(localStorage.getItem("cart"));

if (localStorage.getItem("product-rating") === null) {
    localStorage.setItem("product-rating", JSON.stringify([]));
}

let productRating = JSON.parse(localStorage.getItem("product-rating"));
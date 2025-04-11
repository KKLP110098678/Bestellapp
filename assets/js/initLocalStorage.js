if (localStorage.getItem("cart") === null) {
    localStorage.setItem("cart", JSON.stringify([]));
}

let cart = JSON.parse(localStorage.getItem("cart"));

if (localStorage.getItem("product-rating") === null) {
    localStorage.setItem("product-rating", JSON.stringify([]));
}

let productRating = JSON.parse(localStorage.getItem("product-rating"));

function refreshProductRating() {
    productRating = JSON.parse(localStorage.getItem("product-rating"));
}

function setSavedRating() {
    productRating.forEach(function (rating) {
        const starsContainer = document.querySelector(`#rating-container-${rating.productId}`);
        if (starsContainer) {
            const checkedRadio = starsContainer.querySelector(`input[name="rating-${rating.productId}"][id="rating${rating.rating}-${rating.productId}"]`);
            if (checkedRadio) {
                checkedRadio.checked = true;
            }
        }
    });
}



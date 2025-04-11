function storeProductRating(productId) {
    const rating = getCheckedRating(productId);
    const ratingExists = checkRatingExists(productId);

    if (ratingExists) {
        updateRating(productId, rating);
    } else {
        addNewRating(productId, rating);
    }

    setProductRating();
}

function checkRatingExists(productId) {
   refreshProductRating();
   return productRating.some(rating => rating.productId === productId);

}

function addNewRating(productId, rating) {
    productRating.push({ productId, rating });
}

function updateRating(productId, rating) {
    productRating = productRating.map(ratingObj => {
        if (ratingObj.productId === productId) {
            return { ...ratingObj, rating };
        }
        return ratingObj;
    });
}

function getCheckedRating(productId) {
    const checkedRadio = document.querySelector(`input[name="rating-${productId}"]:checked`);
    return checkedRadio ? parseInt(checkedRadio.value, 10) : null;
  }

function setProductRating() {
    localStorage.setItem("product-rating", JSON.stringify(productRating));
}


setSavedRating();
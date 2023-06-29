import products from "./product.js";
import {addToCart, clearCart} from "./cart.js";

const createProductCard = (element) => {
    const productContainer = document.getElementById("productContainer");
    const card = createCard(element);

    // finally appending the whole card to product container
    productContainer.appendChild(card);
}

const createCard = (element = {id: 0, name: "Not Available", image: "na.jpg", price: 0}) => {
    const card = document.createElement("div");
    card.classList.add("card", "shadow", "mb-3");
    card.style.width = "200px"
    //image
    const image = document.createElement("img");
    image.src = `./images/${element.image}`;
    image.classList.add("card-img-top");
    image.style.width = "200px";
    image.style.height = "200px"
    // card body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const productTitle = document.createElement("h4");
    productTitle.classList.add("card-title");
    productTitle.innerHTML = element.name;
    productTitle.style.fontSize = "1rem";
    productTitle.style.fontWeight = "700";

    const priceText = document.createElement("p");
    priceText.innerHTML = `Price: $ ${element.price}`
    priceText.classList.add("card-text");

    const btn = document.createElement("button");
    btn.classList.add("btn", "btn-outline-success")
    btn.innerHTML = "ADD TO CART";
    //TODO: add event listener
    btn.addEventListener("click", () => {
        addToCart(element.id);
    });
    // text end
    const textEnd = document.createElement("div");
    textEnd.classList.add("text-end");
    textEnd.appendChild(btn);

    cardBody.appendChild(productTitle);
    cardBody.appendChild(priceText);
    cardBody.appendChild(textEnd);

    card.appendChild(image);
    card.appendChild(cardBody);
    return card;
}


products.forEach(el => {
    createProductCard(el);
})
const clearCartBtn = document.getElementById("clearCart");
clearCartBtn.addEventListener("click", clearCart);
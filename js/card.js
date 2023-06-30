import {addToCart} from "./cart.js";

const createCard = (element = {id: 0, name: "Not Available", image: "na.jpg", price: 0, discount: 0}) => {
    const card = document.createElement("div");
    card.classList.add("card", "shadow", "mb-3");
    card.style.width = "200px"
    //image
    const image = document.createElement("img");
    image.src = `./images/${element.image}`;
    image.classList.add("card-img-top");
    image.style.width = "200px";
    image.style.height = "150px"
    // card body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const productTitle = document.createElement("h4");
    productTitle.classList.add("card-title");
    productTitle.innerHTML = element.name;
    productTitle.style.fontSize = "1rem";
    productTitle.style.fontWeight = "700";

    const priceText = document.createElement("p");
    priceText.innerHTML = `Price: $ ${element.price}`;
    priceText.classList.add("card-text", "mb-0");

    const discountText = document.createElement("p");
    discountText.classList.add("card-text");
    if (element.discount > 0) {
        discountText.innerHTML = `Discount : ${element.discount}%`;
    } else {
        discountText.innerHTML = "Discount: N/A ";
    }


    const btn = document.createElement("button");
    btn.classList.add("btn", "btn-outline-success", "w-100")
    btn.innerHTML = "ADD TO CART";
    //TODO: add event listener
    btn.addEventListener("click", () => {
        addToCart(element.id);
    });
    // text end
    const textEnd = document.createElement("div");
    textEnd.classList.add("text-end");
    textEnd.appendChild(btn);
    //card body
    cardBody.appendChild(productTitle);
    cardBody.appendChild(priceText);
    cardBody.appendChild(discountText);
    cardBody.appendChild(textEnd);
    //card
    card.appendChild(image);
    card.appendChild(cardBody);
    return card;
}

export const createProductCard = (element) => {
    const productContainer = document.getElementById("productContainer");
    const card = createCard(element);
    // finally appending the whole card to product container
    productContainer.appendChild(card);
}
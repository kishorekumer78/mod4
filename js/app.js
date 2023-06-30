import products from "./product.js";
import {clearCart} from "./cart.js";
import {createProductCard} from "./card.js";


products.forEach(el => {
    createProductCard(el);
})
const clearCartBtn = document.getElementById("clearCart");
clearCartBtn.addEventListener("click", clearCart);
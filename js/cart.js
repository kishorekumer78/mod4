"use strict";
import products from "./product.js";

let cart = [];


export const addToCart = (id = 0) => {
    let product = products.find((p) => p.id === id);
    if (product) {
        let cartProduct = cart.find((x) => x.id === product.id)
        if (cartProduct) {
            // product already present. add the quantity & change total price
            let index = cart.findIndex((item) => item.id === cartProduct.id);
            if (index > -1) {
                cart[index].qty = cart[index].qty + 1;
                cart[index].totalPrice = parseFloat((cart[index].qty * cart[index].price).toFixed(2));
                // refresh the table
                refreshTable();
                calculateGrossTotal()
            }
        } else {
            //add the product to cart
            let qty = 1;
            let totalPrice = parseFloat((qty * product.price).toFixed(2));
            cart.push({...product, qty, totalPrice});
            //append the row at last
            let row = createRow({...product, qty, totalPrice});
            document.getElementById("tbody").appendChild(row);
            // calculate sum of totalPrice
            calculateGrossTotal();

        }
    } else {
        alert("product not found");
    }
}

const createRow = (product) => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const qtyCell = document.createElement("td");
    const qtyTxt = document.createElement("span");
    qtyTxt.innerHTML = product.qty;
    // const addBtn = document.createElement("button")
    const priceCell = document.createElement("td");
    const totalPriCell = document.createElement("td");
    const actionCell = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("btn", "btn-sm", "btn-danger")
    removeBtn.innerHTML = "x";
    removeBtn.addEventListener("click", () => {
        removeProductFromCart(product.id);
    })
    actionCell.appendChild(removeBtn);
    nameCell.innerHTML = product.name;
    qtyCell.appendChild(createAddButton(product.id));
    qtyCell.appendChild(qtyTxt);
    qtyCell.appendChild(createReduceButton(product.id));
    priceCell.innerHTML = product.price;
    totalPriCell.innerHTML = product.totalPrice;
    row.appendChild(nameCell);
    row.appendChild(qtyCell);
    row.appendChild(priceCell);
    row.appendChild(totalPriCell);
    row.appendChild(actionCell);
    return row;
}

const removeProductFromCart = (id) => {
    let index = cart.findIndex((prod) => prod.id === id);
    cart.splice(index, 1);
    refreshTable();
    calculateGrossTotal();

}
const addQty = (id) => {
    let index = cart.findIndex((prod) => prod.id === id);
    if (index > -1) {
        cart[index].qty += 1;
        cart[index].totalPrice = parseFloat((cart[index].price * cart[index].qty).toFixed(2));
    }
    refreshTable();
    calculateGrossTotal();
}

const reduceQty = (id) => {
    let index = cart.findIndex((prod) => prod.id === id);
    if (index > -1) {
        cart[index].qty -= 1;
        if (cart[index].qty < 1) {
            // remove the product from array
            cart.splice(index, 1);
        } else {
            cart[index].totalPrice = parseFloat((cart[index].price * cart[index].qty).toFixed(2));
        }
    }
    refreshTable();
    calculateGrossTotal();
}
const calculateGrossTotal = () => {
    let grossTotal = 0;
    cart.forEach((item) => {
        grossTotal = grossTotal + item.totalPrice;
    });
    grossTotal = parseFloat(grossTotal.toFixed(2));
    let totalDiscount = calculateTotalDiscount();
    if (grossTotal === 0) {
        document.getElementById("grossTotal").innerHTML = "";
        document.getElementById("discount").innerHTML = "";
        document.getElementById("payable").innerHTML = "";
    } else {
        document.getElementById("grossTotal").innerHTML = `Gross Total : ${grossTotal}`;
        document.getElementById("discount").innerHTML = `Total Discount : ${totalDiscount}`;
        document.getElementById("payable").innerHTML = `Total Payable : ${parseFloat((grossTotal - totalDiscount).toFixed(2))}`; //TODO: use Math.round() to get to nearest integer
        document.getElementById("payable").classList.add("text-decoration-underline")

    }
}

const refreshTable = () => {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = "";
    cart.forEach((item) => {
        let row = createRow(item);
        tbody.appendChild(row);
    });
    calculateGrossTotal();
}
const createAddButton = (id) => {
    const btn = document.createElement("button");
    btn.innerHTML = `  +  `;
    btn.classList.add("btn", "btn-outline-primary", "btn-sm", "rounded");
    btn.style.marginRight = "10px";
    btn.addEventListener("click", () => addQty(id));
    return btn;
}

const createReduceButton = (id) => {
    const btn = document.createElement("button");
    btn.innerHTML = `  -  `;
    btn.classList.add("btn", "btn-outline-danger", "btn-sm", "rounded");
    btn.style.marginLeft = "10px";
    btn.addEventListener("click", () => reduceQty(id));
    return btn;
}
export const clearCart = () => {
    document.getElementById("tbody").innerHTML = "";
    document.getElementById("grossTotal").innerHTML = "";
    document.getElementById("discount").innerHTML = "";
    document.getElementById("payable").innerHTML = "";
    cart = [];
}

const calculateTotalDiscount = () => {
    let discount = 0;
    cart.forEach((el) => {
        if (el.discount > 0) {
            let individualDiscount = (el.discount / 100) * el.totalPrice;
            discount += individualDiscount;
        }
    })
    return parseFloat(discount.toFixed(2));
}


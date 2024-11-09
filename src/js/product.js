import { getLocalStorage } from "./utils.mjs";
import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  //If there's no local storage property array will be enforced to utilize push function later
  let cart = getLocalStorage("so-cart") || [];

  cart.push(product);

  setLocalStorage("so-cart",cart);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

import { showModal } from "../modal/modal.js";
import formatPrice from "../utils/formatPrice.js";
import { initCartItemEventListener, renderCartItem } from "./cartItem.js";

const cartQuantityLabel = document.querySelector(".cart-quantity");
const cartEptyContainer = document.querySelector(".cart-empty-container");
const cartList = document.querySelector(".cart-list");
const cartTotalPriceLabel = document.getElementById("cart-total-price");
const cartMessage = document.querySelector(".cart-message");
const cartConfirmBtn = document.getElementById("cart-confirm-btn");

cartConfirmBtn.addEventListener("click", showModal);

function showEmptyCartMessage() {
  cartEptyContainer.classList.remove("hidden");
  cartList.classList.add("hidden");
  cartTotalPriceLabel.classList.add("hidden");
  cartMessage.classList.add("hidden");
  cartConfirmBtn.classList.add("hidden");
}

function showCartInfo() {
  cartEptyContainer.classList.add("hidden");
  cartList.classList.remove("hidden");
  cartTotalPriceLabel.classList.remove("hidden");
  cartMessage.classList.remove("hidden");
  cartConfirmBtn.classList.remove("hidden");
}

function updateCartCount(data) {
  const countSpan = cartQuantityLabel.querySelector("span");

  const totalCount = data
    .map((obj) => obj.count)
    .reduce((acc, v) => acc + v, 0);

  countSpan.textContent = totalCount;
}

function updateTotalPrice(data) {
  const totalPriceSpan = cartTotalPriceLabel.querySelector("span");
  const totalPrice = data
    .map((obj) => obj.price * obj.count)
    .reduce((acc, v) => acc + v, 0);

  totalPriceSpan.textContent = formatPrice(totalPrice);
}

export function renderCartList(listData) {
  const cartData = listData.filter((obj) => obj.count > 0);

  cartList.innerHTML = "";
  updateCartCount(cartData);

  if (cartData.length === 0) {
    showEmptyCartMessage();
    return;
  }

  const html = cartData.map((cartItem) => renderCartItem(cartItem)).join("");
  cartList.insertAdjacentHTML("afterbegin", html);
  cartData.forEach((obj) => initCartItemEventListener(obj));
  showCartInfo();
  updateTotalPrice(cartData);
}

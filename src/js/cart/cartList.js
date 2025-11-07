import { showModal } from "../modal/modal.js";
import formatPrice from "../utils/formatPrice.js";
import getSelectedOrders from "../utils/getSelectedOrders.js";
import getTotalPrice from "../utils/getTotalPrice.js";
import {
  initCartItemEventListener,
  renderCartItem,
  updateCartItemUI,
} from "./cartItem.js";

const cartQuantityLabel = document.querySelector(".cart-quantity");
const countSpan = cartQuantityLabel.querySelector("span");

const cartEptyContainer = document.querySelector(".cart-empty-container");

const cartContentContainer = document.querySelector(".cart-content-container");
const cartList = document.querySelector(".cart-list");

const cartTotalPriceLabel = document.getElementById("cart-total-price");
const totalPriceSpan = cartTotalPriceLabel.querySelector("span");

const cartConfirmBtn = document.getElementById("cart-confirm-btn");

cartConfirmBtn.addEventListener("click", showModal);

function showEmptyCartMessage() {
  cartEptyContainer.classList.remove("hidden");
  cartContentContainer.classList.add("hidden");
}

function showCartInfo() {
  cartEptyContainer.classList.add("hidden");
  cartContentContainer.classList.remove("hidden");
}

function updateCartInfos(data) {
  // total count
  const totalCount = data
    .map((obj) => obj.count)
    .reduce((acc, v) => acc + v, 0);

  countSpan.textContent = totalCount;

  // total price
  const totalPrice = getTotalPrice(data);

  totalPriceSpan.textContent = formatPrice(totalPrice);
}

function updateCartList(listData) {
  listData.forEach((listItem) => {
    const itemElement = cartList.querySelector(`#cart-item-${listItem.id}`);

    if (listItem.count < 1) {
      if (itemElement !== null) {
        itemElement.remove();
      }

      return;
    }

    if (itemElement === null) {
      cartList.insertAdjacentHTML("afterbegin", renderCartItem(listItem));
      initCartItemEventListener(listItem);
    }

    updateCartItemUI(listItem);
  });
}

export function updateCartUI(listData) {
  const cartData = getSelectedOrders(listData);

  updateCartInfos(cartData);
  // console.log(cartData);
  updateCartList(listData);

  if (cartData.length === 0) {
    showEmptyCartMessage();
    // return;
  } else {
    showCartInfo();
  }
}

export function initRenderCart(listData) {
  const cartData = getSelectedOrders(listData);

  if (cartData.length === 0) {
    showEmptyCartMessage();
    return;
  }

  const html = cartData.map((cartItem) => renderCartItem(cartItem)).join("");
  cartList.insertAdjacentHTML("afterbegin", html);
  cartData.forEach((obj) => initCartItemEventListener(obj));

  showCartInfo();

  updateCartInfos(cartData);
}

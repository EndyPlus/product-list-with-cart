import formatPrice from "../utils/formatPrice.js";
import formatImgLink from "../utils/formatImgLink.js";
import getSelectedOrders from "../utils/getSelectedOrders.js";
import getTotalPrice from "../utils/getTotalPrice.js";
// import { resetState } from "../store.js";
import { hideModal } from "./modal.js";

const confirmOrderList = document.querySelector(".confirm-order-list");
const orderTotalPrice = document.getElementById("order-total-price");
const newOrderBtn = document.getElementById("new-order-btn");

newOrderBtn.addEventListener("click", () => {
  // resetState();
  hideModal();
});

function updateTotalPrice(data) {
  const totalPrice = getTotalPrice(data);

  orderTotalPrice.textContent = formatPrice(totalPrice);
}

function renderConfirmOrderItem(data) {
  const { id, count, image, name, price } = data;

  const newImgLink = formatImgLink(image.thumbnail);

  return `
        <li class="confirm-order-list-item" id="${id}-order-item">
              <img
                src="${newImgLink}"
                alt="${name} thumbnail"
              />
              <div class="order-item-info">
                <h4>${name}</h4>
                <div class="order-item-stats">
                  <span class="order-item-quantity">${count}x</span>
                  <span class="order-item-single">@ ${formatPrice(price)}</span>
                </div>
              </div>
              <span class="order-item-total">${formatPrice(
                price * count
              )}</span>
        </li>
    `;
}

export function initRenderConfirmOrderList(listData) {
  const ordersData = getSelectedOrders(listData);

  confirmOrderList.innerHTML = "";

  const html = ordersData.map((obj) => renderConfirmOrderItem(obj)).join("");
  confirmOrderList.insertAdjacentHTML("afterbegin", html);

  updateTotalPrice(ordersData);
}

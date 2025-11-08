import { resetState } from "../store.js";
import formatPrice from "../utils/formatPrice.js";
import getSelectedOrders from "../utils/getSelectedOrders.js";
import getTotalPrice from "../utils/getTotalPrice.js";
import {
  renderConfirmOrderItem,
  updateConfirmOrderItemUI,
} from "./confirmOrderItem.js";
import { hideModal } from "./modal.js";

const confirmOrderList = document.querySelector(".confirm-order-list");
const orderTotalPrice = document.getElementById("order-total-price");
const newOrderBtn = document.getElementById("new-order-btn");

newOrderBtn.addEventListener("click", () => {
  resetState();
  hideModal();
});

function updateTotalPrice(data) {
  const totalPrice = getTotalPrice(data);

  orderTotalPrice.textContent = formatPrice(totalPrice);
}

export function updateConfirmOrderListUI(listData) {
  updateTotalPrice(listData);

  listData.forEach((listItem) => {
    const listItemElement = confirmOrderList.querySelector(
      `#order-item-${listItem.id}`
    );

    if (listItem.count < 1) {
      if (listItemElement !== null) {
        listItemElement.remove();
      }
      return;
    }

    if (listItemElement === null) {
      confirmOrderList.insertAdjacentHTML(
        "afterbegin",
        renderConfirmOrderItem(listItem)
      );
    }

    updateConfirmOrderItemUI(listItem);
  });
}

export function initRenderConfirmOrderList(listData) {
  const ordersData = getSelectedOrders(listData);

  const html = ordersData.map((obj) => renderConfirmOrderItem(obj)).join("");
  confirmOrderList.insertAdjacentHTML("afterbegin", html);

  updateTotalPrice(ordersData);
}

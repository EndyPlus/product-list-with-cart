import formatImgLink from "../utils/formatImgLink.js";
import formatPrice from "../utils/formatPrice.js";

export function updateConfirmOrderItemUI(data) {
  const { id, count, price } = data;

  const orderItem = document.getElementById(`order-item-${id}`);
  const orderItemQuantity = orderItem.querySelector(".order-item-quantity");
  const orderItemTotal = orderItem.querySelector(".order-item-total");

  orderItemQuantity.textContent = count;
  orderItemTotal.textContent = formatPrice(price * count);
}

export function renderConfirmOrderItem(data) {
  const { id, count, image, name, price } = data;

  const newImgLink = formatImgLink(image.thumbnail);

  return `
        <li class="confirm-order-list-item" id="order-item-${id}">
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

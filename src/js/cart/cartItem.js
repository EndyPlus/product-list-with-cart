import { updateStoreItem } from "../store.js";
import formatPrice from "../utils/formatPrice.js";
import getIcon from "../utils/getIcon.js";

export function updateCartItemUI(data) {
  const { id, price, count } = data;
  const listItem = document.getElementById(`cart-item-${id}`);
  const itemQuantity = listItem.querySelector(".order-item-quantity");
  const itemTotalCost = listItem.querySelector(".order-item-total");

  itemQuantity.textContent = count;
  itemTotalCost.textContent = formatPrice(price * count);
}

export function initCartItemEventListener(data) {
  const removeBtn = document.getElementById(`cart-item-${data.id}-remove-btn`);

  removeBtn.addEventListener("click", () => {
    data.count = 0;
    updateStoreItem(data);
  });
}

export function renderCartItem(data) {
  const { id, count, name, price } = data;

  return `
        <li class="cart-order-item" id="cart-item-${id}">
            <div class="order-item-info">
            <h4>${name}</h4>
            <div class="order-item-stats">
                <span class="order-item-quantity">${count}x</span
                ><span class="order-item-single">@ ${formatPrice(price)}</span
                ><span class="order-item-total">${formatPrice(
                  price * count
                )}</span>
            </div>
            </div>
            <button class="order-item-cta" id="cart-item-${id}-remove-btn">
            ${getIcon("remove")}
            </button>
        </li>
    `;
}

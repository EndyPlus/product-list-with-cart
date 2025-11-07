import { updateStoreItem } from "../store.js";
import formatPrice from "../utils/formatPrice.js";
import getImage from "../utils/getImage.js";

function getListItemElements(id) {
  const listItem = document.getElementById(`item-${id}`);
  const addToCartBtn = listItem.querySelector(`#item-${id}-btn`);
  const activeBtnsContainer = listItem.querySelector(
    `#item-${id}-btns-container`
  );
  const decrementQuantityBtn = activeBtnsContainer.querySelector(
    `#item-${id}-decrement-btn`
  );
  const incrementQuantityBtn = activeBtnsContainer.querySelector(
    `#item-${id}-increment-btn`
  );
  const countLabel = activeBtnsContainer.querySelector(`#item-${id}-count`);

  return {
    listItem,
    addToCartBtn,
    activeBtnsContainer,
    decrementQuantityBtn,
    incrementQuantityBtn,
    countLabel,
  };
}

export function updateItemUI(data) {
  const { id, count } = data;

  const { addToCartBtn, activeBtnsContainer, countLabel } =
    getListItemElements(id);

  if (count > 0) {
    addToCartBtn.classList.add("hidden");
    activeBtnsContainer.classList.remove("hidden");
  } else {
    addToCartBtn.classList.remove("hidden");
    activeBtnsContainer.classList.add("hidden");
  }

  countLabel.textContent = count;
}

function controlQuantity(data, operation) {
  operation === "add" ? (data.count += 1) : (data.count -= 1);

  updateStoreItem(data);
}

export function initItemListeners(data) {
  const { id } = data;

  const { addToCartBtn, decrementQuantityBtn, incrementQuantityBtn } =
    getListItemElements(id);

  addToCartBtn.addEventListener("click", () => {
    data.count = 1;
    updateStoreItem(data);
  });

  [decrementQuantityBtn, incrementQuantityBtn].forEach((el) => {
    let operation;
    if (el.id.includes("increment")) {
      operation = "add";
    }

    if (el.id.includes("decrement")) {
      operation = "distract";
    }

    el.addEventListener("click", () => {
      controlQuantity(data, operation);
    });
  });
}

export function initRenderItem(data) {
  const { id, count, image, name, category, price } = data;

  const isActiveQuantityBtns = count > 0;

  const newImgLink = getImage(image);

  const newPrice = formatPrice(price);

  return `
           <li class="section-list-item" id="item-${id}">
              <div class="list-item-image-container">
                <img
                  src="${newImgLink}"
                  alt="${name} image"
                  class="list-item-image"
                />

                <button class="list-item-cta-passive ${
                  isActiveQuantityBtns ? "hidden" : ""
                }" id="item-${id}-btn">
                  <img
                    src="./src/assets/icons/icon-add-to-cart.svg"
                    alt="add to cart icon"
                  />
                  <p>Add to Cart</p>
                </button>
                <div class="list-item-cta-active ${
                  isActiveQuantityBtns ? "" : "hidden"
                }" id="item-${id}-btns-container">
                  <button id="item-${id}-decrement-btn">
                    <img
                      src="./src/assets/icons/icon-decrement-quantity.svg"
                      alt="icon decrement quantity"
                    />
                  </button>
                  <p id='item-${id}-count'>${count}</p>
                  <button id="item-${id}-increment-btn">
                    <img
                      src="./src/assets/icons/icon-increment-quantity.svg"
                      alt="icon increment quantity"
                    />
                  </button>
                </div> 
              </div>
              <div class="list-item-description-container">
                <span class="list-item-tag">${category}</span>
                <h4 class="list-item-title">${name}</h4>
                <span class="list-item-price">${newPrice}</span>
              </div>
            </li>
    `;
}

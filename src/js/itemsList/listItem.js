import { updateStoreItem } from "../store.js";
import formatPrice from "../utils/formatPrice.js";
import getImage from "../utils/getImage.js";

export function updateItem(data) {
  const listItem = document.getElementById(`item-${data.id}`);
  listItem.innerHTML = renderItem(data);
  initItemListeners(data);
}

function controlQuantity(data, operation) {
  operation === "add" ? (data.count += 1) : (data.count -= 1);

  updateStoreItem(data.id, data);
}

export function initItemListeners(data) {
  const { id } = data;

  const listItem = document.getElementById(`item-${id}`);
  const addToCartBtn = listItem.querySelector(`#item-${id}-btn`);
  const activeBtnsContainer = listItem.querySelector(
    `#item-${id}-btns-container`
  );
  const countControlContainer = listItem.querySelector(
    `#item-${id}-btns-container`
  );

  const decrementQuantityBtn = countControlContainer.querySelector(
    `#item-${id}-decrement-btn`
  );
  const incrementQuantityBtn = countControlContainer.querySelector(
    `#item-${id}-increment-btn`
  );

  addToCartBtn.addEventListener("click", () => {
    addToCartBtn.classList.add("hidden");
    activeBtnsContainer.classList.remove("hidden");
    data.count = 1;
    updateStoreItem(id, data);
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

export function renderItem(data) {
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

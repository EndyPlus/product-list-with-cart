const body = document.querySelector("body");
const modal = document.querySelector(".modal");
const modalBackdrop = document.querySelector(".modal-backdrop");
const confirmOrderContainer = document.querySelector(
  ".confirm-order-container"
);

export function showModal() {
  modal.classList.remove("hidden");
  body.classList.add("no-scroll");
  confirmOrderContainer.focus();
}

export function hideModal() {
  modal.classList.add("hidden");
  body.classList.remove("no-scroll");
}

modalBackdrop.addEventListener("click", hideModal);

modalBackdrop.addEventListener("keypress", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    modalBackdrop.click();
  }
});

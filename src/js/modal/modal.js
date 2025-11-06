const body = document.querySelector("body");
const modal = document.querySelector(".modal");
const modalBackdrop = document.querySelector(".modal-backdrop");

export function showModal() {
  modal.classList.remove("hidden");
  body.classList.add("no-scroll");
}

export function hideModal() {
  modal.classList.add("hidden");
  body.classList.remove("no-scroll");
}

modalBackdrop.addEventListener("click", hideModal);

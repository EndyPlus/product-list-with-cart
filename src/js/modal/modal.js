const modal = document.querySelector(".modal");
const modalBackdrop = document.querySelector(".modal-backdrop");

export function showModal() {
  modal.classList.remove("hidden");
}

export function hideModal() {
  modal.classList.add("hidden");
}

modalBackdrop.addEventListener("click", hideModal);

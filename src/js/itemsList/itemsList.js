import { initItemListeners, renderItem } from "./listItem.js";

const itemsList = document.getElementById("items-list");

// async
export function renderList(listData) {
  const html = listData.map((obj) => renderItem(obj)).join("");

  itemsList.innerHTML = "";
  itemsList.insertAdjacentHTML("afterbegin", html);
  listData.forEach((obj) => initItemListeners(obj));
}

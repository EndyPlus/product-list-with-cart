import { initItemListeners, initRenderItem } from "./listItem.js";

const itemsList = document.getElementById("items-list");

export function initRenderList(listData) {
  const html = listData.map((obj) => initRenderItem(obj)).join("");

  itemsList.insertAdjacentHTML("afterbegin", html);
  listData.forEach((obj) => initItemListeners(obj));
}

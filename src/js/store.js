import { renderList } from "./itemsList/itemsList.js";
import { updateItem } from "./itemsList/listItem.js";

export const store = {
  listData: [],
};

export async function initItemsList() {
  try {
    const res = await fetch("./src/data.json");

    if (!res.ok) return;

    const data = await res.json();

    store.listData = data.map((obj, i) => ({ ...obj, id: i, count: 0 }));

    renderList(store.listData);
  } catch (err) {
    console.log(err);
  }
}

export function updateStoreItem(id, newData) {
  let currObj = store.listData.find((obj) => obj.id === id);

  if (!currObj) {
    console.log("NO SUCH OBJECT ITEM");
    throw new Error("NO SUCH OBJECT ITEM");
  }
  Object.assign(currObj, newData);

  updateItem(currObj);
}

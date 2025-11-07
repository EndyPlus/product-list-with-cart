import { initRenderCart, updateCartUI } from "./cart/cartList.js";
import { initRenderList } from "./itemsList/itemsList.js";
import { initRenderConfirmOrderList } from "./modal/confirmOrder.js";
import { getLocalData, setLocalData } from "./utils/localStorage.js";
import { updateItemUI } from "./itemsList/listItem.js";

export const store = {
  listData: [],
};

export async function initDataItemsList() {
  try {
    const res = await fetch("./src/data.json");

    if (!res.ok) return;

    const data = await res.json();

    const localStorageData = getLocalData();
    // const localStorageData = null;

    if (localStorageData !== null) {
      store.listData = localStorageData;
    } else {
      store.listData = data.map((obj, i) => ({ ...obj, id: i, count: 0 }));
      setLocalData(store.listData);
    }

    initRenderList(store.listData);
    initRenderCart(store.listData);
    initRenderConfirmOrderList(store.listData);
    setLocalData(store.listData);
  } catch (err) {
    console.log(err);
  }
}

export function updateStoreItem(newData) {
  const { id } = newData;

  let currObj = store.listData.find((obj) => obj.id === id);

  if (!currObj) {
    console.log("NO SUCH OBJECT ITEM");
    throw new Error("NO SUCH OBJECT ITEM");
  }

  Object.assign(currObj, newData);

  updateItemUI(currObj);

  updateStoreCartList(store.listData);

  setLocalData(store.listData);
}

export function updateStoreCartList(newListData) {
  updateCartUI(newListData);
}

import { initDataItemsList } from "./store.js";

async function initApp() {
  await initDataItemsList();
}

initApp();

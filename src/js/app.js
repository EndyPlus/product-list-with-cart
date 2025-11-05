import { initItemsList } from "./store.js";

async function initApp() {
  await initItemsList();
}

initApp();

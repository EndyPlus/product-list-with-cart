export function setLocalData(data) {
  localStorage.setItem("listData", JSON.stringify(data));
}

export function getLocalData() {
  return JSON.parse(localStorage.getItem("listData"));
}

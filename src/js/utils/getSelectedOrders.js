export default function getSelectedOrders(data) {
  return data.filter((obj) => obj.count > 0);
}

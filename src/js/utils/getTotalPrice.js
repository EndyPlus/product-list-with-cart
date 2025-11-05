export default function getTotalPrice(data) {
  return data
    .map((obj) => obj.price * obj.count)
    .reduce((acc, v) => acc + v, 0);
}

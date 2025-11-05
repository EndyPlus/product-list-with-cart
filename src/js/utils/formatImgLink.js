export default function formatImgLink(str) {
  return `./src${str.slice(1, str.length)}`;
}

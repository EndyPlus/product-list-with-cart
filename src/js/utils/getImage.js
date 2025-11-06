import formatImgLink from "./formatImgLink.js";

export default function getImage(imgsObj) {
  let screenImg = imgsObj.desktop;

  if (window.innerWidth <= 768) {
    screenImg = imgsObj.tablet;
  }
  if (window.innerWidth <= 480) {
    screenImg = imgsObj.mobile;
  }

  return formatImgLink(screenImg);
}

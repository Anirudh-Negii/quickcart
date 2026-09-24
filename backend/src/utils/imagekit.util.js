import ImageKit from "@imagekit/nodejs";
import config from "../config/config.js";

const imagekit = new ImageKit({
  IMAGEKIT_PRIVATE_KEY: config.IMAGEKIT_PRIVATE_KEY,
  IMAGEKIT_PUBLIC_KEY: config.IMAGEKIT_PUBLIC_KEY,
  IMAGEKIT_URL_ENDPOINT: config.IMAGEKIT_URL_ENDPOINT,
});

export default imagekit;

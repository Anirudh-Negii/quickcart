import imagekit from "../utils/imagekit.util.js";
import config from "../config/config.js";

export function getImageKitAuth(req, res) {
  const { token, expire, signature } =
    imagekit.helper.getAuthenticationParameters();

  return res.status(200).json({
    token,
    expire,
    signature,
    publicKey: config.IMAGEKIT_PUBLIC_KEY,
  });
}

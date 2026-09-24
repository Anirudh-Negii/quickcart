import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
  storage, // tell me which storage to use here memory or disk
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
// @imagekit/nodejs
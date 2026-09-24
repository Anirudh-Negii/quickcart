import { Router } from "express";
import { getImageKitAuth } from "../controller/imagekit.controller.js";

const router = Router();

router.get("/auth", getImageKitAuth);

export default router;

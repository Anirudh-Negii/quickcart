import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { createProductValidator } from "../validators/product.validator.js";
import { createProduct } from "../controller/product.controller.js";

const router = Router();

router.post("/", authenticate, createProductValidator, createProduct);

export default router;

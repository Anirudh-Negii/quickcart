import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { createProductValidator } from "../validators/product.validator.js";
import { createProduct, getProducts } from "../controller/product.controller.js";

const router = Router();

// @POST /api/products
router.post("/", authenticate, createProductValidator, createProduct);

// @GET /api/products
router.get("/", getProducts);

export default router;

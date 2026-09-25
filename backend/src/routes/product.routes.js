import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { createProductValidator, productIdValidator } from "../validators/product.validator.js";
import { createProduct, getProducts, getProductById } from "../controller/product.controller.js";

const router = Router();

// @POST /api/products
router.post("/", authenticate, createProductValidator, createProduct);

// @GET /api/products
router.get("/", getProducts);

// @GET /api/products/:id
router.get("/:id", productIdValidator, getProductById);

export default router;

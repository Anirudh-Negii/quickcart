import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { createProductValidator, productIdValidator, updateProductValidator } from "../validators/product.validator.js";
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from "../controller/product.controller.js";

const router = Router();

// @POST /api/products
router.post("/", authenticate, createProductValidator, createProduct);

// @GET /api/products
router.get("/", getProducts);

// @GET /api/products/:id
router.get("/:id", productIdValidator, getProductById);

// @PUT /api/products/:id
router.put("/:id", authenticate, productIdValidator, updateProductValidator, updateProduct);

// @DELETE /api/products/:id
router.delete( "/:id", authenticate, productIdValidator, deleteProduct);

export default router;

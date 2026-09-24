import { Router } from "express";
import { registerValidator, loginValidator } from "../validators/auth.validator.js";
import { register, login, refresh } from "../controller/auth.controller.js";

const router = Router();

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);

router.post("/refresh-token", refresh);

export default router;

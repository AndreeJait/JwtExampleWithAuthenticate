import { Router } from "express";
import { login, register, test } from "../controllers/authController.js";
import jwtMiddleware from "../middlewares/jwtMiddleware.js";

const router = Router();

// Auth router

router.post("/login", login);
router.post("/register", register);
router.get("/test", jwtMiddleware, test);

export default router;

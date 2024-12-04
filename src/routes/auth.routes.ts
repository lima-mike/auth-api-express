import express from "express";
import { getProfile, login, register } from "../controllers/auth.controller";
import { asyncHandler } from "../utils/async-handler.util";
import { validate } from "../middlewares/validate.middleware";
import authenticate from "../middlewares/auth.middleware";
import { registerSchema } from "../schemas/register.schema";
import { loginSchema } from "../schemas/login.schema";

const router = express.Router();

router.post("/register", validate(registerSchema), asyncHandler(register));
router.post("/login", validate(loginSchema), asyncHandler(login));
router.get("/me", authenticate, asyncHandler(getProfile));

export default router;

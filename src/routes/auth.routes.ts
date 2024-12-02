import express from "express";
import { z } from "zod";
import { login, register } from "../controllers/auth.controller";
import { asyncHandler } from "../utils/async-handler.util";
import { validate } from "../middlewares/validate.middleware";

const router = express.Router();

const registerSchema = z.object({
  email: z.string({ message: "Email is required" }).email("Invalid email"),
  password: z
    .string({ message: "Password is required" })
    .min(8, "Password must be at least 8 characters"),
});

const loginSchema = z.object({
  email: z.string({ message: "Email is required" }).email("Invalid email"),
  password: z.string({ message: "Password is required" }),
});

router.post("/register", validate(registerSchema), asyncHandler(register));
router.post("/login", validate(loginSchema), asyncHandler(login));

export default router;

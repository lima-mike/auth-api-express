import express from "express";
import { login, register } from "../controllers/auth.controller";
import { asyncHandler } from "../utils/async-handler.util";

const router = express.Router();

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));

export default router;

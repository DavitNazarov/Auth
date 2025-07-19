import express from "express";
import {
  login,
  logout,
  signup,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  authLimiter,
  resetPasswordLimiter,
} from "../middleware/rateLimiters.js"; // ✅ NEW: import limiters

const router = express.Router();

// ✅ Protected Route
router.get("/check-auth", verifyToken, checkAuth);

// ✅ Apply rate limiter to sensitive endpoints
router.post("/signup", authLimiter, signup);
router.post("/login", authLimiter, login);
router.post("/logout", logout); // Optional to protect

router.post("/verify-email", authLimiter, verifyEmail);
router.post("/forgot-password", authLimiter, forgotPassword);

// ✅ Special limiter for reset password
router.post("/reset-password/:token", resetPasswordLimiter, resetPassword);

export default router;

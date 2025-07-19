import express from "express";
import rateLimit from "express-rate-limit"; // ✅ NEW import

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

const router = express.Router();

//  Define rate limiter only for reset password route
const resetPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per 15 mins
  message: "Too many reset attempts. Please try again in 15 minutes.",
  standardHeaders: true, // send RateLimit-* headers
  legacyHeaders: false, // disable X-RateLimit-* headers
});

// Apply middleware to the reset password route
router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);

// Only this route is protected with limiter
router.post("/reset-password/:token", resetPasswordLimiter, resetPassword);

export default router;

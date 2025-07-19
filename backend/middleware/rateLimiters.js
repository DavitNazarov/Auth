import rateLimit from "express-rate-limit";

// General auth limiter for signup, login, forgot-password, etc.
export const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10, // limit each IP to 10 requests per 10 minutes
  message: "Too many attempts. Please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Specific limiter for password reset (more strict)
export const resetPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 password reset attempts
  message: "Too many password reset requests. Please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});
